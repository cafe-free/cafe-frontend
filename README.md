# Cafe
Building a Cafe Website using [Next.js](https://github.com/vercel/next.js)

## Project Structure for Reference
```
cafe-next/
├─ .env.local
├─ next.config.js
├─ package.json
├─ prisma/                    # optional if using Prisma with MongoDB
│  └─ schema.prisma
├─ lib/
│  ├─ db/
│  │  ├─ mongodb.ts          # Mongo client connection helper (singleton)
│  │  └─ prismaClient.ts     # optional: Prisma client wrapper if using Prisma
│  └─ data.ts                # local sample data / migration helpers
├─ models/                   # optional Mongoose models (if using Mongoose)
│  └─ MenuItem.ts
├─ pages/                    # or `app/` if using App Router (below shows pages router)
│  ├─ api/
│  │  ├─ menu/
│  │  │  ├─ index.ts         # GET list, POST create
│  │  │  └─ [id].ts          # GET, PUT, DELETE single item
│  │  └─ auth/               # optional auth endpoints (login, callback)
│  ├─ _app.tsx
│  ├─ index.tsx
│  └─ menu/
│     ├─ index.tsx           # server page that fetches data and renders MenuClient
│     └─ client/             
│        └─ MenuClient.tsx   # your current client component (use fetch/SWR)
├─ app/                      # optional: if you prefer App Router; include route handlers
│  └─ (if using app router)...
├─ components/
│  ├─ Menu/
│  │  ├─ MenuClient.tsx
│  │  ├─ MenuSection.tsx
│  │  └─ MenuCard.tsx
│  └─ UI/                    # shared UI primitives (Button, Modal, etc.)
├─ helpers/
│  └─ seed.ts                # script to seed MongoDB from lib/data.ts
├─ scripts/
│  └─ migrate-to-mongo.js    # optional migration script converting local data to DB
├─ public/
│  └─ menu/                  # static images referenced by img paths
│     └─ bread/
│        ├─ Bread_BreadOil.png
│        ├─ Bread_Calzones.png
│        └─ Bread_CinnamonRoll.png
├─ styles/
│  └─ Menu.module.css
└─ types/
   └─ index.d.ts             # shared TypeScript interfaces (MenuItem)
```