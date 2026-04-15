# 🚀 Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)  
- npm package manager

## ⚡ 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/lic_recruitment?schema=public"
NEXT_PUBLIC_WHATSAPP_NUMBER="+918872364673"
```

### 3. Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## ✅ Testing

1. Navigate to `/apply`
2. Fill form with test data
3. Submit and verify WhatsApp redirect
4. Check database: `npx prisma studio`

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Import on Vercel.com
3. Add environment variables
4. Deploy!

For detailed instructions, see `README.md`
