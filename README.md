# Harbiz Trainer Web

A reusable website template for personal trainers. Each trainer can configure their brand, content, services, and contact links without rebuilding the site. Visitors can explore the offer and continue to the trainer’s booking and payment platform.

## Features

- Landing page with trainer profile, services, plans, and testimonials
- Configurable trainer content and theme
- Sanity CMS for trainer profiles, plans, services, testimonials, transformations, and blog posts
- Contact and lead-capture flows, including WhatsApp links
- BMI and TDEE calculators
- Demo route with fictional sample content
- Static builds for GitHub Pages and Hostinger, plus a standard Next.js deployment path

## Technology

- Next.js 14 App Router and TypeScript
- Tailwind CSS and Framer Motion
- Sanity CMS
- React Hook Form and Resend for contact workflows

## Run locally

Requirements: Node.js 18+ and npm.

```bash
git clone https://github.com/josedaminato/chacocoach.git
cd chacocoach
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Configure a Sanity project and any contact-service settings in `.env.local` before enabling those integrations. The example file leaves secret values blank.

For a quick trainer setup, run `npm run setup` or edit `lib/config.ts`. To work with Sanity Studio, run `npm run studio`.

## Build and deployment

- Standard Next.js build: `npm run build`
- GitHub Pages static build: `npm run build:gh`
- Publish the static output to GitHub Pages: `npm run deploy`
- Prepare a Hostinger static build: `npm run prepare:hostinger`

The repository includes a live sample site at [josedaminato.github.io/chacocoach](https://josedaminato.github.io/chacocoach/). The `/demo` route uses fictional trainer content to demonstrate the template.
