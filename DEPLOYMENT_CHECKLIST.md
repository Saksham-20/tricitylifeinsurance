# 🚀 Deployment Checklist

## Pre-Deployment

### Local Testing
- [ ] Run `npm install` successfully
- [ ] Create `.env` file with database credentials
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npx prisma generate`
- [ ] Start dev server: `npm run dev`
- [ ] Test home page loads: http://localhost:3000
- [ ] Test all pages accessible
- [ ] Submit test form at `/apply`
- [ ] Verify WhatsApp redirect works
- [ ] Check database: `npx prisma studio`
- [ ] Confirm lead was created
- [ ] Test mobile view (F12 → device toolbar)
- [ ] Test navigation menu
- [ ] Test floating WhatsApp button

### Code Quality
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All images load correctly
- [ ] Form validation works

## Production Database Setup

### Option A: Neon (Free Tier)
1. [ ] Create account at https://neon.tech
2. [ ] Create new project
3. [ ] Copy connection string
4. [ ] Save as production DATABASE_URL

### Option B: Vercel Postgres
1. [ ] Create Vercel account
2. [ ] Add Postgres storage
3. [ ] Copy connection string
4. [ ] Save as production DATABASE_URL

### Option C: Supabase
1. [ ] Create account at https://supabase.com
2. [ ] Create project
3. [ ] Get connection string from settings
4. [ ] Save as production DATABASE_URL

## Deployment to Vercel

### Step 1: Prepare Repository
```bash
cd lic-recruitment

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial LIC recruitment platform"

# Create GitHub repo and push
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy
- [ ] Visit https://vercel.com
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Vercel auto-detects Next.js settings

### Step 3: Environment Variables
Add in Vercel dashboard → Settings → Environment Variables:

```
DATABASE_URL
Value: postgresql://...your-connection-string...
```

```
NEXT_PUBLIC_WHATSAPP_NUMBER
Value: +919876543210
```

```
NEXT_PUBLIC_GA_ID (optional)
Value: G-XXXXXXXXXX
```

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Visit deployment URL

### Step 5: Run Migrations
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
```

### Step 6: Test Production
- [ ] Visit production URL
- [ ] Test all pages
- [ ] Submit test form
- [ ] Verify WhatsApp redirect
- [ ] Check production database

## Post-Deployment

### Monitoring
- [ ] Check Vercel analytics
- [ ] Monitor error logs
- [ ] Test form submissions
- [ ] Check database growth

### Optional Enhancements
- [ ] Add custom domain
- [ ] Setup Google Analytics
- [ ] Configure CDN
- [ ] Add SSL certificate (automatic on Vercel)
- [ ] Setup email notifications

### Backup Plan
- [ ] Export database regularly
- [ ] Keep git repository updated
- [ ] Document any custom changes

## WhatsApp Number Configuration

**Update these files with actual number:**
1. `.env` → `NEXT_PUBLIC_WHATSAPP_NUMBER`
2. `app/contact/page.tsx` → Phone display
3. Test WhatsApp links work

## Custom Domain (Optional)

### Add Domain to Vercel
1. [ ] Vercel dashboard → Project → Settings → Domains
2. [ ] Add your domain
3. [ ] Update DNS records as instructed
4. [ ] Wait for DNS propagation (up to 48 hours)
5. [ ] SSL auto-configured

## SEO Setup (Optional)

### Google Search Console
1. [ ] Add property
2. [ ] Verify ownership
3. [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`

### Google Analytics
1. [ ] Create GA4 property
2. [ ] Get Measurement ID
3. [ ] Add to environment variables
4. [ ] Test tracking

## Troubleshooting

### Build Fails
```bash
# Check logs in Vercel dashboard
# Common issues:
# - Environment variables missing
# - TypeScript errors
# - Dependency issues
```

### Database Connection Fails
```bash
# Verify DATABASE_URL is correct
# Check database is accessible
# Test with: npx prisma db pull
```

### Form Submission Fails
```bash
# Check API logs in Vercel
# Verify Prisma is initialized
# Check database connection
```

## Support Contacts

- Vercel Support: https://vercel.com/support
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

## Success Criteria

- [x] Application builds successfully
- [ ] Production URL accessible
- [ ] All pages load correctly
- [ ] Form submits to database
- [ ] WhatsApp redirect works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active

---

**Once all checkboxes are complete, your platform is LIVE! 🎉**
