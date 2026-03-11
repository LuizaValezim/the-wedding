# Monorepo Architecture

This document explains the monorepo structure and design decisions.

## Structure Overview

### Apps
- **public-site**: Guest-facing website (port 3000)
  - RSVP management
  - Honeymoon fund showcase
  - Donation checkout
  - Wedding information
  
- **admin-dashboard**: Couple admin panel (port 3001)
  - Wedding planning tools
  - Budget management
  - Guest management
  - Seating arrangements
  - Vendor tracking

### Packages
- **database**: Prisma schema & client
  - Single source of truth for database model
  - Shared across both apps
  - Prisma migrations
  
- **auth**: Supabase authentication helpers
  - Client-side: Google/Apple OAuth, RSVP token validation
  - Server-side: Admin user verification
  
- **payments**: Payment provider integrations
  - Stripe for international cards
  - Mercado Pago for Pix and Brazilian cards
  - Webhook handlers
  
- **ui**: Shared React components
  - shadcn/ui base components
  - Custom wedding-specific components
  - Shared tables, forms, cards
  
- **types**: TypeScript types
  - Domain models
  - API response types
  - Validation schemas
  
- **utils**: Shared utilities
  - Zod validation schemas
  - Formatting helpers
  - Common functions
  
- **eslint-config**: Shared ESLint rules
- **typescript-config**: Shared TypeScript configs

## Dependency Graph

```
public-site
├── @repo/auth (client)
├── @repo/database
├── @repo/payments
├── @repo/types
├── @repo/ui
└── @repo/utils

admin-dashboard
├── @repo/auth (client)
├── @repo/database
├── @repo/types
├── @repo/ui
└── @repo/utils
```

Both apps can import from shared packages, but packages should not have circular dependencies.

## Build Strategy

Using Turborepo caching:
- Changes to `packages/database` invalidate both apps
- Changes to `packages/ui` invalidate both apps
- App-specific changes only rebuild that app
- Type changes invalidate everything

## Development Workflow

### Adding a New Feature

1. Identify which package(s) need changes
2. Make changes with TypeScript
3. Export from package `index.ts`
4. Import in app
5. Test: `pnpm dev`

### Adding a New Shared Component

1. Create component in `packages/ui/src/components`
2. Export from `packages/ui/src/index.ts`
3. Import in app: `import { MyComponent } from "@repo/ui"`

### Adding a New Database Table

1. Update `packages/database/prisma/schema.prisma`
2. Create migration: `pnpm db:migrate`
3. Regenerate Prisma client (automatic on save if watching)
4. Update `packages/types` if adding new domain types
5. Use in app with `import { PrismaClient } from "@repo/database"`

### Adding a New API Route

Create in app-specific `src/app/api/[feature]/route.ts`:
- Use shared utilities from `@repo/utils`
- Use auth from `@repo/auth/server`
- Use database from `@repo/database`
- Validate input with schemas from `@repo/utils`

## Environment Configuration

```
.env.local (git-ignored)
├── apps/public-site/.env.local (inherits from root)
├── apps/admin-dashboard/.env.local (inherits from root)
└── packages/database/.env.local (for migrations)
```

## Build Order for Deployment

Turborepo handles this automatically, but logically:
1. Config packages (typescript-config, eslint-config)
2. Core packages (database, auth, types, utils)
3. UI package (depends on core)
4. Apps (depend on all packages)

## Performance Optimization

- Monorepo caching keeps build times under 5 seconds for unchanged code
- Tree-shaking in production removes unused exports
- Each package has its own tsconfig for faster type-checking
- Image optimization via Next.js Image component

## Testing Strategy (Future)

```
packages/
├── __tests__/
├── database.test.ts (Prisma queries)
├── auth.test.ts (Auth logic)
└── utils.test.ts (Validation schemas)

apps/
├── __tests__/
├── e2e/ (Playwright)
└── components/ (React Testing Library)
```

## Security Considerations

- Prisma prevents SQL injection
- Zod validates all inputs at boundaries
- Auth tokens are HTTP-only
- Stripe/Mercado Pago tokens never cross to frontend
- Environment variables clearly marked as public vs secret in keys

## Future Enhancements

- [ ] E2E testing with Playwright
- [ ] Storybook for component library
- [ ] API documentation with OpenAPI/Swagger
- [ ] Performance monitoring with Vercel Analytics
- [ ] Error tracking with Sentry
- [ ] Real-time collaboration features
- [ ] Mobile app (React Native)
