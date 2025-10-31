# Cafe
Building a Cafe Website using [Next.js](https://github.com/vercel/next.js)

## Project Structure for Reference
```
cafe-next/
├─ .env.local
├─ next.config.js
├─ package.json
├─ tsconfig.json
├─ public/
│  └─ menu/
│     └─ bread/
│        ├─ Bread_BreadOil.png
│        ├─ Bread_Calzones.png
│        └─ Bread_CinnamonRoll.png
├─ prisma/                    # optional if using Prisma with MongoDB
│  └─ schema.prisma
├─ lib/
│  ├─ db/
│  │  └─ mongodb.ts           # MongoClient singleton for native driver
│  ├─ mongo/                  # optional Mongoose models or helpers
│  │  └─ MenuItem.model.ts
│  └─ data.ts                 # sample data and migration helpers
├─ models/                    # optional if using Mongoose instead of native driver
│  └─ MenuItem.ts
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                # home or landing page
│  ├─ menu/
│  │  ├─ page.tsx             # server component that fetches menu items and passes to client
│  │  ├─ loading.tsx          # optional loading UI
│  │  └─ client/
│  │     └─ MenuClient.tsx    # 'use client' component for interactivity
│  └─ api/
│     └─ menu/
│        ├─ route.ts          # GET and POST handler for /api/menu using App Router route handlers
│        └─ [id]/
│           └─ route.ts       # GET PUT DELETE for single item
├─ components/
│  ├─ Menu/
│  │  ├─ MenuSection.tsx
│  │  └─ MenuCard.tsx
│  └─ UI/
│     ├─ Button.tsx
│     └─ Modal.tsx
├─ styles/
│  └─ Menu.module.css
├─ scripts/
│  └─ seed.ts                 # seed script to migrate lib/data.ts into MongoDB
└─ types/
   └─ index.d.ts              # shared TypeScript interfaces like MenuItem
```