# LIC Recruitment Portal

A production-ready, mobile-first recruitment platform for LIC agents and Bima Sakhi, built with Next.js 14, PostgreSQL, and Tailwind CSS.

## ✨ Features

- 🎨 **Pixel-Perfect UI** - Converted from Stitch export while maintaining exact design
- 📱 **Mobile-First** - Fully responsive design optimized for mobile devices
- 🔐 **Full Backend** - PostgreSQL database with Prisma ORM
- 📝 **Lead Generation** - Complete form-to-database-to-WhatsApp funnel
- 💬 **WhatsApp Integration** - Automatic redirect after form submission
- 🚀 **Production Ready** - Type-safe, validated, with proper error handling
- ⚡ **Fast Performance** - Optimized for Core Web Vitals

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Validation**: Zod
- **Icons**: Material Symbols
- **Fonts**: Plus Jakarta Sans, Manrope

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

### Step 1: Clone & Install Dependencies

```bash
cd lic-recruitment
npm install
```

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# PostgreSQL Connection String
DATABASE_URL="postgresql://username:password@localhost:5432/lic_recruitment?schema=public"

# WhatsApp Number (with country code)
NEXT_PUBLIC_WHATSAPP_NUMBER="+919876543210"

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Step 3: Set Up Database

Run Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
lic-recruitment/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # POST endpoint for form submission
│   ├── about/
│   ├── training/
│   ├── bima-sakhi/
│   ├── apply/
│   │   └── page.tsx               # Application form page
│   ├── contact/
│   ├── layout.tsx                 # Root layout with Header, Nav, WhatsApp button
│   ├── page.tsx                   # Home page
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Top navigation with mobile menu
│   │   ├── BottomNav.tsx          # Bottom navigation bar
│   │   └── WhatsAppButton.tsx     # Floating WhatsApp button
├── lib/
│   └── prisma.ts                  # Prisma client instance
├── prisma/
│   └── schema.prisma              # Database schema
├── .env                            # Environment variables (not in git)
├── .env.example                   # Example environment file
└── tailwind.config.ts             # Tailwind configuration with custom colors
```

## 🗄️ Database Schema

```prisma
model Lead {
  id            String   @id @default(uuid())
  name          String
  phone         String
  city          String
  qualification String
  interest      String
  created_at    DateTime @default(now())

  @@map("leads")
}
```

## 🔌 API Endpoints

### POST /api/leads

Submit a new lead application.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "city": "Chandigarh",
  "qualification": "Graduate",
  "interest": "agent" // or "bima-sakhi"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "leadId": "uuid"
}
```

**Validation:**
- Name: Minimum 2 characters
- Phone: Exactly 10 digits
- All fields required

## 🎨 Design System

### Color Palette
- **Primary**: `#0253cd` (LIC Blue)
- **Secondary**: `#fdd400` (Golden Yellow)
- **Tertiary**: `#415b8b` (Slate Blue)
- **Background**: `#f5f6f7`

### Typography
- **Headlines**: Plus Jakarta Sans (Bold, Extrabold, Black)
- **Body**: Manrope (Regular, Medium, Semibold, Bold)

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, benefits, testimonials |
| `/about` | About team and mission |
| `/training` | Training program details |
| `/bima-sakhi` | Women empowerment program |
| `/apply` | Application form (main conversion page) |
| `/contact` | Contact information |

## 🚀 Deployment

### Database Setup (Production)

1. **Use a managed PostgreSQL service**:
   - [Neon](https://neon.tech) (Free tier available)
   - [Supabase](https://supabase.com) (Free tier available)
   - [Railway](https://railway.app)
   - [Vercel Postgres](https://vercel.com/storage/postgres)

2. **Update DATABASE_URL** in production environment variables

3. **Run migrations**:
   ```bash
   npx prisma migrate deploy
   ```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `DATABASE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GA_ID` (optional)

### Alternative Deployment Options

- **Netlify**: `npm run build` → Deploy `out/` folder
- **Railway**: Connect GitHub repo → Auto-deploy
- **AWS/DigitalOcean**: Use Docker or Node.js server

## 🧪 Testing

### Test Form Submission Locally

1. Start dev server: `npm run dev`
2. Navigate to `/apply`
3. Fill form and submit
4. Check PostgreSQL database:
   ```bash
   npx prisma studio
   ```
5. Verify WhatsApp redirect works

### Test Database Connection

```bash
node -e "require('./lib/prisma').prisma.lead.findMany().then(console.log)"
```

## 🔒 Security Checklist

- ✅ Environment variables not committed
- ✅ Input validation with Zod
- ✅ SQL injection protection via Prisma
- ✅ Type-safe API routes
- ✅ CORS configured
- ✅ Error messages don't expose internals

## 📊 Analytics (Optional)

Add Google Analytics by setting `NEXT_PUBLIC_GA_ID` in `.env`:

```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Test connection
npx prisma db pull
```

If fails, verify:
1. PostgreSQL is running
2. DATABASE_URL is correct
3. Database exists
4. Network allows connection

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

## 📝 License

This project is proprietary and confidential.

## 👤 Contact

For support or inquiries:
- **Subhash Panjla** - Chief Life Insurance Advisor
- **Location**: Chandigarh, India

---

**Built with ❤️ using Next.js and PostgreSQL**
