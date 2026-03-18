import { ImageResponse } from "next/og";
import { trainerConfig } from "@/lib/getConfig";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: trainerConfig.theme.secondary,
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: trainerConfig.theme.primary,
            textAlign: "center",
            fontFamily: "system-ui",
            letterSpacing: "-0.02em",
          }}
        >
          {trainerConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.9)",
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          {trainerConfig.tagline}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
