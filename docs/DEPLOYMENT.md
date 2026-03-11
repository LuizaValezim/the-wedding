# Deployment Guide

Production deployment checklist and instructions for Vercel.

## Pre-Deployment Checklist

- [ ] All environment variables configured in `.env.local`
- [ ] Database migrations run successfully (`pnpm db:push`)
- [ ] Tests passing (if implemented)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Build completes successfully (`pnpm build`)
- [ ] Manual testing of RSVP, donation flow, admin features
- [ ] SSL certificates ready
- [ ] CDN configured (Cloudflare optional)

## Vercel Deployment

### 1. Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign in with GitHub
3. Import the wedding-website repository

### 2. Project Configuration

Vercel automatically detects:
- **Build Command**: `pnpm build` (from `turbo.json`)
- **Output Directory**: `.next` for each app
- **Install Command**: `pnpm install`

### 3. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

**Database:**
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (only in server functions)
DATABASE_URL=postgresql://...
```

**Stripe:**
```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
```

**Mercado Pago:**
```
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USR-...
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-...
```

**Email:**
```
RESEND_API_KEY=re_...
```

**OAuth:**
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
```

**Other:**
```
RSVP_JWT_SECRET=... (generate random string)
WEDDING_DATE=2025-12-15
NEXT_PUBLIC_APP_URL=https://yourweddingsite.com
NEXT_PUBLIC_ADMIN_URL=https://admin.yourweddingsite.com
NODE_ENV=production
```

### 4. Deploy Root & Apps

Vercel will auto-detect monorepo and deploy:
- **public-site**: as main domain
- **admin-dashboard**: as subdomain or separate project

For separate projects:
1. Create two Vercel projects
2. Point different domains/subdomains
3. Each has own environment variable configuration

### 5. Configure Custom Domains

**public-site:**
```
Domain: yourweddingsite.com
DNS: Point to Vercel nameservers
```

**admin-dashboard:**
```
Domain: admin.yourweddingsite.com
DNS: Point to Vercel nameservers
```

Or use:
```
https://yourweddingsite.com (public)
https://app.yourweddingsite.com (admin)
```

### 6. SSL Certificates

Vercel automatically provisions SSL certificates via Let's Encrypt. Always use HTTPS.

## Post-Deployment Configuration

### Update OAuth Providers

**Google Cloud Console:**
1. Go to OAuth 2.0 Client IDs
2. Add authorized redirect URIs:
   ```
   https://yoursite.com/auth/callback
   https://admin.yoursite.com/auth/callback
   ```

**Apple Developer:**
1. Go to Sign in with Apple configuration
2. Add return URLs:
   ```
   https://yoursite.com
   https://admin.yoursite.com
   ```

**Supabase Dashboard:**
1. Authentication → Providers
2. Redirect URL must be:
   ```
   https://[project-ref].supabase.co/auth/v1/callback
   ```

### Update Payment Webhooks

**Stripe Dashboard:**
1. Developers → Webhooks
2. Update endpoint URL:
   ```
   https://yoursite.com/api/webhooks/stripe
   ```
3. Events: `checkout.session.completed`, `payment_intent.failed`
4. Copy new signing secret to Vercel env vars

**Mercado Pago Dashboard:**
1. Settings → Webhooks
2. Update notification URL:
   ```
   https://yoursite.com/api/webhooks/mercado-pago
   ```
3. Select topics: `payment`, `test`

### Verify Deployments

After deploying:

1. **Test Public Site**
   ```
   https://yourweddingsite.com → Should load home page
   https://yourweddingsite.com/honeymoon → Should show fund items
   https://yourweddingsite.com/rsvp/[token] → Should show RSVP form
   ```

2. **Test Admin Dashboard**
   ```
   https://admin.yoursite.com → Should redirect to login
   Sign in with Google → Should authenticate
   Should show overview dashboard
   ```

3. **Test Payments**
   - Stripe: Use test card `4242 4242 4242 4242`
   - Mercado Pago: Use test sandbox mode
   - Verify donation created in database

4. **Test Email**
   - Complete RSVP → Check email received
   - Complete donation → Check receipt email

## Monitoring & Maintenance

### Vercel Analytics

Enable in Vercel Dashboard:
1. Integrations → Web Analytics
2. Track page performance
3. Monitor Core Web Vitals

### Error Tracking (Optional)

Add Sentry for error monitoring:

1. Create Sentry account at https://sentry.io
2. Create project for Next.js
3. Install SDK:
   ```bash
   pnpm add @sentry/nextjs
   ```
4. Configure in `next.config.js`:
   ```javascript
   const withSentry = require("@sentry/nextjs").withSentry;
   module.exports = withSentry({...});
   ```

### Database Backups

Supabase automatically backs up:
- Daily backups (7 days retention)
- Weekly backups (4 weeks retention)

Enable manual backups in Supabase Dashboard → Backups.

### Monitoring Queries

Track slow queries:
```bash
# Connection list
SELECT datname, usename, query, query_start, state
FROM pg_stat_activity
WHERE query NOT LIKE '%pg_stat%';
```

## Performance Optimization

### Image Optimization

Already configured in Next.js:
```javascript
// next.config.js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.supabase.co' }
  ]
}
```

### Caching Strategy

- **Static**: Homepage, wedding details → Revalidate hourly
- **ISR**: Guest list, budget overview → Revalidate on demand
- **Dynamic**: RSVP, donations → Always fresh

### Database Query Optimization

Use Prisma select to fetch only needed fields:
```typescript
const guests = await prisma.guest.findMany({
  select: {
    id: true,
    name: true,
    rsvpStatus: true,
  },
  take: 50, // pagination
  skip: 0,
});
```

## Scaling Considerations

Current setup handles:
- Up to 10,000 concurrent users (Vercel Pro plan)
- Unlimited monthly serverless function executions
- PostgreSQL up to 4 CPU, 16GB RAM (Supabase Pro)

If you exceed these:
1. Upgrade Vercel plan
2. Upgrade Supabase plan or database
3. Implement caching layer (Redis)
4. Move file storage to S3/CDN

## Disaster Recovery

### Database Recovery

If database corrupted:
1. Verify in Supabase Dashboard
2. Restore from backup:
   - Supabase → Backups → Restore
   - Select backup point and confirm
3. Verify data integrity
4. Alert users if needed

### Rollback Deployment

If deployment breaks:
1. Vercel Dashboard → Deployments
2. Click "Promote" on previous working deployment
3. Or redeploy from GitHub with previous commit

### Emergency Contacts

- Supabase Support: https://supabase.com/docs/guides/getting-help
- Stripe Support: https://support.stripe.com
- Vercel Support: https://vercel.com/support

## Post-Wedding Tasks

After the wedding:

1. **Archive Data**
   - Export guest list
   - Export photos
   - Export budget/spending report
   - Download contracts/proposals

2. **Keep Running** (optional)
   - Display wedding photos
   - Share memories
   - Show expenses transparency

3. **Shut Down** (if desired)
   - Delete Vercel projects
   - Delete Supabase project
   - Delete Auth credentials
   - Keep database backup

---

**Deployment Complete!** 🎉

The wedding platform is now live and ready for guests to RSVP and contribute to your honeymoon fund.
