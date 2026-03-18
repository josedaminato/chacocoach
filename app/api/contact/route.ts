import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { trainerConfig } from "@/lib/getConfig";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2, "Nombre inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensaje muy corto"),
  fitnessGoal: z.string().optional(),
});

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(request)) {
      return NextResponse.json(
        { error: "Demasiados envíos. Intentá más tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const { name, email, phone, message, fitnessGoal } = parseResult.data;

    const toEmail = process.env.CONTACT_EMAIL || trainerConfig.email;
    const resend = getResend();

    if (!resend) {
      return NextResponse.json(
        { error: "Servicio de email no configurado" },
        { status: 503 }
      );
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const { data, error } = await resend.emails.send({
      from: fromEmail.includes("<") ? fromEmail : `Web <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Contacto desde web: ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
        ${fitnessGoal ? `<p><strong>Objetivo fitness:</strong> ${fitnessGoal}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("[Contact API] Resend error:", error.message);
      return NextResponse.json(
        { error: "Error al enviar el mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error al enviar" },
      { status: 500 }
    );
  }
}
