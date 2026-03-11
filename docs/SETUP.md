# Setup Guide

Complete setup instructions for the wedding platform.

## 1. Prerequisites

- **Node.js**: 18.17+ or 20+
- **PNPM**: 8.0+ (install from https://pnpm.io/installation)
- **Supabase Account**: Create at https://supabase.com
- **Stripe Account**: Create at https://stripe.com
- **Mercado Pago Account**: Create at https://www.mercadopago.com
- **Google OAuth Credentials**: Set up at Google Cloud Console
- **Apple Developer Account**: Optional, for Apple Sign-In

## 2. Clone Repository

```bash
git clone https://github.com/yourusername/the-wedding.git
cd the-wedding
```

## 3. Install Dependencies

```bash
# Using PNPM (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

**Note**: PNPM is required for monorepo workspaces to work correctly.

## 4. Environment Setup

### Create `.env.local`

```bash
cp .env.example .env.local
```

### Fill in Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Create a new project or select existing one
3. Copy **Project URL** and **Anon Public Key** (Settings → API → Project API keys)
4. Copy **Service Role Key** (Settings → API → Project API keys)
5. Get **Database Password** (Settings → Database → Connection string)
6. Get **Database URL** (Settings → Database → Connection string → Prisma)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT].supabase.co:5432/postgres
```

**Where to find DATABASE_URL:**
- In Supabase Dashboard: Go to **Settings → Database → Connection Pooling**
- Or: **Settings → Database → Connection string → Prisma**
- Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres`
- Replace `[PASSWORD]` with your database password (shown in Settings → Database)
- Replace `[PROJECT_ID]` with your project ID from the URL

### Fill in Stripe Credentials

1. Go to https://dashboard.stripe.com
2. Get keys from Developers → API keys

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

To get Webhook Secret:
- Go to Stripe Dashboard → Developers → Webhooks
- Create webhook endpoint to `https://yourdomain.com/api/webhooks/stripe`
- Signing secret will be displayed after creation

### Fill in Mercado Pago Credentials

1. Go to https://www.mercadopago.com/developers/panel
2. Get credentials from API Keys

```
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USR-...
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-...
```

### Fill in Email Service (Resend)

1. Go to https://resend.com
2. Create an account and get API key

```
RESEND_API_KEY=re_...
```

### Fill in OAuth Credentials

**Google OAuth:**
1. Go to https://console.cloud.google.com
2. Create project
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized URLs

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

**Apple OAuth:**
```
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
```

### Other Configuration

```
RSVP_JWT_SECRET=generate-a-random-string-here
WEDDING_DATE=2025-12-15
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NODE_ENV=development
```

## 5. Database Setup

### Initialize Database on Supabase

```bash
# Push Prisma schema to Supabase
pnpm db:push
```

This will:
1. Create all tables defined in `packages/database/prisma/schema.prisma`
2. Create indexes and constraints
3. Generate Prisma client

### Seed Database (Optional)

Create a seed file at `packages/database/prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed couple
  const bride = await prisma.user.create({
    data: {
      name: "Bride Name",
      email: "bride@example.com",
      role: "BRIDE",
      isAdmin: true,
    },
  });

  const groom = await prisma.user.create({
    data: {
      name: "Groom Name",
      email: "groom@example.com",
      role: "GROOM",
      isAdmin: true,
    },
  });

  console.log("Seeded couple:", { bride, groom });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run:
```bash
pnpm db:seed
```

## 6. Verify Setup

### Test Database Connection

```bash
pnpm db:studio
```

Opens Prisma Studio at http://localhost:5555 to inspect database.

### Test Build

```bash
pnpm build
```

Should complete without errors.

### Start Development Server

```bash
pnpm dev
```

Opens:
- **public-site**: http://localhost:3000
- **admin-dashboard**: http://localhost:3001

## 7. Configure Supabase Auth

### Setup Google OAuth in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google
3. Add Google Client ID and Secret
4. Set Redirect URL to `https://yourproject.supabase.co/auth/v1/callback`

### Setup Apple OAuth in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Apple
3. Add Apple credentials

### Create First Admin User

1. Go to admin-dashboard
2. Click "Sign in with Google" or "Sign in with Apple"
3. After signing in, manually set `is_admin = true` in database for that user

## 8. Configure RLS Policies (Row Level Security)

Supabase requires explicit RLS policies. Set them up in Supabase Dashboard → SQL Editor.

```sql
-- Example: Allow public read of fund_items
ALTER TABLE fund_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fund items are public" ON fund_items
  FOR SELECT USING (true);

-- Example: Allow guests to read own record via RSVP token
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guests can read own record" ON guests
  FOR SELECT USING (
    auth.jwt() ->> 'rsvp_token' = rsvp_token
  );

-- Admin-only tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access" ON users
  FOR ALL USING (
    auth.uid()::text = id OR is_admin = true
  );
```

## 9. Test RSVP Token Generation

```bash
# Generate a JWT token for testing
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign({ rsvpToken: 'test-token' }, process.env.RSVP_JWT_SECRET);
console.log('Token:', token);
"
```

## 10. Deploy to Vercel

### Connect Git Repository

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit: The Wedding platform"
git remote add origin https://github.com/yourusername/the-wedding.git
git push -u origin main
```

### Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects monorepo structure
5. Configure environment variables in Vercel dashboard
6. Deploy

### Vercel Configuration

Vercel automatically detects:
- `turbo.json` for monorepo
- `next.config.js` for Next.js apps
- `package.json` workspace structure

Create `vercel.json` for custom configuration (optional):

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

## 11. Post-Deployment

### Update OAuth Redirect URLs

After deploying to Vercel:

**Supabase Settings:**
```
https://yourapp.vercel.app/auth/callback
https://admin.yourapp.vercel.app/auth/callback
```

**Google Cloud Console:**
```
https://yourapp.vercel.app/auth/callback
https://admin.yourapp.vercel.app/auth/callback
```

**Apple Developer:**
```
https://yourapp.vercel.app/auth/callback
https://admin.yourapp.vercel.app/auth/callback
```

### Update Stripe/Mercado Pago Webhook URLs

**Stripe Webhook:**
```
https://yourapp.vercel.app/api/webhooks/stripe
```

**Mercado Pago Webhook:**
```
https://yourapp.vercel.app/api/webhooks/mercado-pago
```

## 12. Troubleshooting

### PNPM Workspace Errors

```bash
# Clear cache and reinstall
pnpm store prune
rm -rf node_modules
pnpm install
```

### Prisma Client Not Generated

```bash
# Regenerate Prisma client
cd packages/database && npx prisma generate
cd ../..
```

### Port Already in Use

If port 3000 or 3001 is in use:

```bash
# Kill process
lsof -i :3000
kill -9 <PID>

# Or use different ports
pnpm dev -- --port 3000 --next-port 3001
```

### Database Connection Issues

1. Verify `DATABASE_URL` in `.env.local`
2. Check Supabase project is running
3. Verify database password is correct
4. Ping database: `psql $DATABASE_URL -c "SELECT 1"`

### Stripe/Mercado Pago Errors

- Verify API keys are correct
- Check webhook signing secrets
- Use API in test mode first
- Check request/response logs in provider dashboard

## 13. Next Steps

After setup:

1. ✅ Create couple admin account
2. ✅ Add first guests to system
3. ✅ Setup honeymoon fund items
4. ✅ Test RSVP workflow
5. ✅ Test donation checkout
6. ✅ Email configuration
7. ✅ Analytics setup
8. ✅ Launch to production

See [docs/DEPLOYMENT.md](DEPLOYMENT.md) for production deployment checklist.
