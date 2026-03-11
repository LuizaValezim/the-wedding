# The Wedding

> *It's not going to be a wedding, it's going to be **The Wedding***

A production-grade full-stack wedding management platform combining a public guest-facing website with a comprehensive admin dashboard for wedding planning and honeymoon fund contributions.

## 🎯 Overview

This monorepo contains two main applications:

- **public-site** (`apps/public-site`) - Guest-facing website for RSVP, honeymoon fund contributions, and wedding information
- **admin-dashboard** (`apps/admin-dashboard`) - Couple-only admin interface for wedding planning and management

## 📋 Project Structure

```
the-wedding/
├── apps/
│   ├── public-site/          # Guest website (Next.js 14)
│   └── admin-dashboard/      # Admin dashboard (Next.js 14)
├── packages/
│   ├── database/             # Prisma schema & PostgreSQL models
│   ├── auth/                 # Supabase Auth helpers
│   ├── payments/             # Stripe & Mercado Pago integration
│   ├── ui/                   # Shared shadcn/ui components
│   ├── types/                # TypeScript types
│   ├── utils/                # Validators & utilities
│   ├── eslint-config/        # Shared ESLint config
│   └── typescript-config/    # Shared TypeScript config
├── turbo.json                # Turborepo configuration
└── pnpm-workspace.yaml       # PNPM workspaces
```

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **TailwindCSS v4** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **React Hook Form** + **Zod** for form validation
- **TanStack Query** for data fetching (admin)
- **TanStack Table** for advanced tables (admin)
- **React DnD** for drag-and-drop seating (admin)
- **Recharts** for data visualization

### Backend
- **Next.js API Routes** for backend
- **Supabase PostgreSQL** for database
- **Prisma ORM** for database access
- **Supabase Auth** for authentication

### Payments
- **Stripe** for international card payments
- **Mercado Pago** for Pix and Brazilian cards

### Deployment
- **Vercel** for hosting
- **Turborepo** for monorepo management

## 📦 Getting Started

### Prerequisites

- Node.js 18+ (or 20+)
- PNPM 8+ (https://pnpm.io/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/the-wedding.git
cd the-wedding
```

2. Install dependencies:
```bash
pnpm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

Fill in your Supabase, Stripe, Mercado Pago, and other API keys in `.env.local`.

4. Setup the database:
```bash
pnpm db:push
```

### Development

Start all apps in development mode:
```bash
pnpm dev
```

This will start:
- **public-site**: http://localhost:3000
- **admin-dashboard**: http://localhost:3001

### Build

Build all apps:
```bash
pnpm build
```

### Database

- **Push schema changes**: `pnpm db:push`
- **Create migration**: `pnpm db:migrate`
- **Open Prisma Studio**: `pnpm db:studio`

## 📚 Database Schema

Core tables include:

- `users` - Couple (bride & groom)
- `guests` - RSVP management
- `tables` - Seating arrangements
- `fund_items` - Honeymoon gift options
- `donations` - Payment records
- `budget_items` - Wedding expenses
- `task_items` - Planning checklist
- `suppliers` - Vendor management
- `venues` - Venue options
- `music_tracks` - Playlist tracking
- `honeymoon_activities` - Trip planning
- And more...

See [packages/database/prisma/schema.prisma](packages/database/prisma/schema.prisma) for full schema.

## 🔐 Security

- ✅ Zod validation on all inputs
- ✅ Rate limiting on public endpoints
- ✅ CSRF protection (Next.js built-in)
- ✅ Row-Level Security (RLS) in Supabase
- ✅ No card data storage (PCI-DSS compliance via hosted payment)
- ✅ Webhook signature verification
- ✅ XSS & SQL injection prevention

## 🚀 Deployments

### Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with `vercel deploy`

The monorepo structure is auto-detected by Vercel.

## 📖 API Documentation

### Public Endpoints

```
GET    /api/public/honeymoon             # List fund items
GET    /api/public/rsvp/[token]          # Get guest info
POST   /api/public/rsvp/[token]          # Submit RSVP
POST   /api/webhooks/stripe              # Stripe webhook
POST   /api/webhooks/mercado-pago        # Mercado Pago webhook
```

### Admin Endpoints (Protected)

```
GET    /api/dashboard/overview           # Analytics
GET    /api/guests                       # List guests
POST   /api/guests                       # Create guest
PATCH  /api/guests/[id]                  # Update guest
DELETE /api/guests/[id]                  # Delete guest
GET    /api/budget                       # List budget items
POST   /api/budget                       # Create budget item
... (similar for all CRUD entities)
```

## 🎯 Features

### Public Website
- ✅ Home page with wedding info
- ✅ Wedding details (date, location, schedule)
- ✅ Photo gallery
- ✅ RSVP system (passwordless with tokens)
- ✅ Honeymoon fund with items
- ✅ Donation checkout (Stripe + Mercado Pago)
- ✅ Guest messages
- ✅ Progress tracking

### Admin Dashboard
- ✅ Overview with analytics & charts
- ✅ Guest management (RSVP, dietary, seating)
- ✅ Budget tracking by category
- ✅ Seating planner (drag-and-drop)
- ✅ Supplier pipeline management
- ✅ Venue comparison
- ✅ Task checklist with auto-generation
- ✅ Inspirations moodboard
- ✅ Music playlist tracker
- ✅ Honeymoon activities planner
- ✅ Trousseau & clothing tracker
- ✅ Wedding day timeline
- ✅ Bachelor party planning
- ✅ Data export (CSV)

## 🔄 Development Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes across monorepo
3. Test locally: `pnpm dev`
4. Lint & format: `pnpm lint && pnpm format`
5. Type check: `pnpm type-check`
6. Commit: `git commit -m "feat: your feature"`
7. Push and create pull request

## 📝 Notes

- **Guest Authentication**: Passwordless token-based (no login needed)
- **Admin Authentication**: Google/Apple OAuth only
- **Real-time**: Sequential updates (no live collaboration)
- **Languages**: Portuguese (Brazil) + English
- **Database**: PostgreSQL via Supabase

## 🤝 Contributing

This is a private wedding platform. For modifications or new features, please contact the project maintainer.

## 📄 License

Private - For personal use only

---

**Status**: 🚧 Under Active Development

For questions or issues, please contact the development team.
