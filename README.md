# Final Room Checklist – Luxury Mobile Web App

A **30–45 second**, paperless final room inspection tool built for 5-star hotel housekeeping supervisors.  
Zero backend · 100% offline · Installable as a native app · Feels like Rosewood/Capella in-house software.

Live Demo → https://supervisor-checklist.vercel.app
(Open on iPhone → Share → “Add to Home Screen” → becomes a real app icon)

## Features

- 3 sections: Bathroom • Bedroom • Mini Bar  
- One-tap progressive checklist with auto-return  
- Persistent “Additional Notes” field on welcome screen  
- Fully offline (works without internet)  
- PWA – installable on iOS & Android  
- No login, no server, zero cost

## Tech Stack

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- Next.js 16 (App Router + React Server Components)  
- TypeScript  
- Tailwind CSS v4 (custom luxury theme)  
- Zustand + persist (state + LocalStorage)  
- ShadCN/UI + Radix primitives  
- Deployed on Vercel (static export)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
