# Quick Start Guide - The Wedding

> *It's not going to be a wedding, it's going to be **The Wedding***

Fast reference for getting The Wedding platform running.

## 📥 Installation (5 minutes)

```bash
# 1. Install Node.js 18+ if needed
# https://nodejs.org/

# 2. Install PNPM
npm install -g pnpm

# 3. Clone repo
git clone <repo-url>
cd the-wedding

# 4. Install dependencies
pnpm install

# 5. Setup environment
cp .env.example .env.local

# Edit .env.local with your credentials:
# - Supabase URL and keys
# - Stripe keys
# - Mercado Pago keys
# - Google/Apple OAuth credentials
```

## 🗄️ Database Setup (2 minutes)

```bash
# Push schema to Supabase
pnpm db:push

# Verify it worked
pnpm db:studio
# Opens http://localhost:5555 - should see all tables
```

## 🚀 Development (5 minutes)

```bash
# Start all apps in development mode
pnpm dev

# Check the output:
# ✓ public-site ready on http://localhost:3000
# ✓ admin-dashboard ready on http://localhost:3001
```

**Open in browser:**
- Guest site: http://localhost:3000
- Admin dashboard: http://localhost:3001

## 🏗️ Project Structure Overview

```
apps/public-site/        ← Guest-facing website (RSVP, donations)
apps/admin-dashboard/    ← Admin dashboard (wedding planning)
packages/database/       ← Prisma schema & client
packages/auth/          ← Supabase Auth helpers
packages/payments/      ← Stripe & Mercado Pago
packages/ui/           ← Shared components
packages/types/        ← TypeScript types
packages/utils/        ← Zod validators
```

## 🔑 Environment Variables

Minimum required for testing:

```env
NEXT_PUBLIC_SUPABASE_URL=<get from Supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from Supabase>
SUPABASE_SERVICE_ROLE_KEY=<get from Supabase>
DATABASE_URL=<get from Supabase>

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...

NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USR-...
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-...

GOOGLE_CLIENT_ID=<optional for testing>
GOOGLE_CLIENT_SECRET=<optional for testing>

RSVP_JWT_SECRET=generate-random-string
```

## 📋 Common Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev -F admin-dashboard  # Only admin app

# Building
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm type-check       # Check TypeScript

# Database
pnpm db:push          # Push schema to DB
pnpm db:studio        # Open Prisma Studio
pnpm db:migrate       # Create migration

# Formatting
pnpm format           # Format all code
pnpm format:check     # Check formatting
```

## 🧪 Testing Your Setup

### 1️⃣ Check Database Connection
```bash
pnpm db:studio
# Should open http://localhost:5555
# Should see all tables (users, guests, fund_items, etc.)
```

### 2️⃣ Start Development Server
```bash
pnpm dev
# Should see green checkmarks for both apps ready
```

### 3️⃣ Test Public Site
```
http://localhost:3000
# Should show home page with "Welcome to Our Wedding"
```

### 4️⃣ Test Admin Dashboard
```
http://localhost:3001
# Should show "Welcome to Admin Dashboard"
# (Authentication not yet implemented on these starter pages)
```

## 🐛 Troubleshooting

**"pnpm: command not found"**
```bash
npm install -g pnpm
```

**Port 3000 already in use**
```bash
# Kill the process
lsof -i :3000
kill -9 <PID>
```

**Database connection error**
- Check `DATABASE_URL` in `.env.local`
- Verify Supabase project is running
- Test: `psql $DATABASE_URL -c "SELECT 1"`

**TypeScript errors**
```bash
pnpm type-check
# Shows what's wrong
```

**Prisma client not generated**
```bash
cd packages/database
npx prisma generate
cd ../..
```

## 📚 Full Documentation

- **Setup**: See [docs/SETUP.md](docs/SETUP.md)
- **Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Database**: See [docs/DATABASE.md](docs/DATABASE.md)
- **Deployment**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Checklist**: See [CHECKLIST.md](CHECKLIST.md)

## 🎯 Next Steps After Setup

1. ✅ Database schema created
2. ⏭️ Create couple admin account (bride & groom)
3. ⏭️ Add sample guests to test RSVP
4. ⏭️ Setup honeymoon fund items
5. ⏭️ Build RSVP page
6. ⏭️ Build donation/payment flow
7. ⏭️ Build admin dashboard pages
8. ⏭️ Deploy to Vercel

## 💡 Tips

- **Use Prisma Studio** to visualize and manage database
  ```bash
  pnpm db:studio
  ```

- **Enable hot reload** - changes save automatically in `pnpm dev`

- **Check TypeScript** before committing
  ```bash
  pnpm type-check
  ```

- **Use absolute imports** - `@/*` in apps, `@repo/*` for packages

- **Never commit .env.local** - it's in .gitignore

## 🚀 Ready to Build

Everything is scaffolded. Start building features by:

1. Adding pages to `apps/public-site/src/app`
2. Adding pages to `apps/admin-dashboard/src/app`
3. Creating API routes in `app/api`
4. Using validated schemas from `@repo/utils`
5. Using types from `@repo/types`
6. Querying database with Prisma

Happy coding! 🎉
