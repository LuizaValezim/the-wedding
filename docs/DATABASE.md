# The Wedding - Database Schema

Complete documentation of The Wedding database schema.

## Table Relationships

```
User (bride/groom)

Guest ──┬─→ Table (seating)
        ├─→ Message
        └─→ Donation

FundItem ──┬─→ Donation
           └─→ HoneymoonActivity

BudgetItem ──→ Supplier

TaskItem (no FK, standalone checklists)

Venue (no FK, comparison options)

Supplier ──→ BudgetItem

InspirationImage (no FK, moodboard items)

MusicTrack (no FK, playlist items)

Photo (no FK, gallery)
```

## Detailed Table Structure

### `users` - Wedding Couple

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | String | Full name |
| email | String | Unique, for auth |
| role | Enum | BRIDE or GROOM |
| isAdmin | Boolean | Always true for couple |
| createdAt | DateTime | System generated |
| updatedAt | DateTime | System generated |

**Purpose**: Store the couple who will be managing the platform.
**Access**: Protected, couple-only via Google/Apple OAuth

---

### `guests` - RSVP Management

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | String | Guest name |
| email | String | Optional, for contact |
| phone | String | Optional |
| side | String | "bride" or "groom" |
| age | Int | Optional, for insights |
| relationship | String | "parent", "sibling", "friend", etc. |
| inviteSent | Boolean | Track if invite sent |
| **rsvpToken** | String | **Unique**, for passwordless link |
| rsvpStatus | String | pending / confirmed / declined |
| plusOneCount | Int | How many +1s attending |
| dietaryRestrictions | String | Allergy/diet info |
| tableId | UUID | FK → Table |
| ceremonyRole | String | "usher", "reader", "flower_girl", etc. |
| notes | String | Admin notes |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Key Feature**: `rsvpToken` enables passwordless RSVP without account creation
**Access**: Guest can update own via token; couple has full access

**Example RSVP Link**: `https://wedding.com/rsvp/abc123xyz?token=eyJ...`

---

### `tables` - Seating Arrangements

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| tableNumber | Int | Unique, "Table 1", "Table 2", etc. |
| theme | String | Optional, table decoration theme |
| chairsCapacity | Int | How many seats available |
| notes | String | Seating constraints or notes |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Reverse Relation**: Many guests per table

**Validation**: Cannot assign more guests than `chairsCapacity`

---

### `fund_items` - Honeymoon Gift Options

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | String | "Dinner in Rome" |
| alias | String | URL-friendly "italy-dinner" |
| description | String | Detailed description |
| photoUrl | String | Supabase Storage URL |
| category | String | "dining" / "activity" / "transport" / "accommodation" |
| price | Decimal | Amount in USD or base currency |
| quantityAvailable | Int | Total amount/packages available |
| quantityFunded | Int | How many funded so far |
| fundedAmount | Decimal | Total amount raised for this item |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Purpose**: Allow guests to contribute to specific honeymoon experiences
**Progress**: Display as progress bar (fundedAmount / price)

**Examples**:
- "Wine Tasting in Tuscany" - $500
- "Train to Florence" - $200
- "Gelato Nights" - $100 (qty: 5)

---

### `donations` - Payment Records

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| fundItemId | UUID | FK → FundItem |
| guestId | UUID | FK → Guest (nullable for anonymous) |
| guestName | String | Display name (can differ from account) |
| guestEmail | String | For receipt email |
| amount | Decimal | Donation amount |
| isAnonymous | Boolean | Hide name on public display |
| message | String | Guest message/note |
| paymentProvider | String | "stripe" or "mercado_pago" |
| paymentStatus | String | pending / completed / failed / refunded |
| stripeSessionId | String | For Stripe tracking |
| mercadoPagoId | String | For Mercado Pago tracking |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Security**: Never store card data (only transaction IDs)
**Public View**: Show total raised, donor count, not individual user mapping

**Privacy**: Anonymous users show only amount + message, not name

---

### `budget_items` - Wedding Expenses

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| itemName | String | "Venue rental" |
| category | String | "venue" / "catering" / "flowers" / "music" / etc. |
| estimatedCost | Decimal | Budget amount |
| actualCost | Decimal | Real spending (nullable until known) |
| paid | Boolean | Whether invoice paid |
| supplierId | UUID | FK → Supplier (nullable) |
| dueDate | DateTime | Payment deadline |
| notes | String | Admin notes |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Analytics**: Group by category for budget breakdown charts
**Comparisons**: Compare estimated vs actual for each category

---

### `task_items` - Planning Checklist

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| taskName | String | "Book florist" |
| category | String | "planning" / "payments" / "confirmations" / "decorations" / etc. |
| assignedTo | String | "bride" / "groom" / "both" |
| dueDate | DateTime | Deadline |
| priority | String | "low" / "medium" / "high" |
| completed | Boolean | Checkbox state |
| notes | String | Task details |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Auto-generation**: Can generate tasks based on wedding date
  - 6 months before: "Book venue"
  - 3 months before: "Order invitations"
  - 1 month before: "Confirm catering numbers"
  - 1 week before: "Final seating chart"

---

### `venues` - Venue Options

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | String | "The Elegant Ballroom" |
| cost | Decimal | Venue rental cost |
| distanceKm | Int | Distance from city center |
| packageType | String | "All-inclusive" / "Venue only" / etc. |
| availableDates | DateTime[] | Array of available dates |
| hostingCapacity | Int | Max guest count |
| rainPlan | String | Backup indoor location |
| rainPlanScore | Int | 1-10 rating of backup |
| address | String | Full venue address |
| visited | Boolean | If couple has viewed it |
| proposalFileUrl | String | PDF from venue |
| notes | String | Impressions and notes |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Used for**: Comparison tool, not for wedding confirmation

---

### `suppliers` - Vendor Management

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | String | "Sweet Petals Florist" |
| category | String | "florist" / "caterer" / "photographer" / "dj" / etc. |
| contactInfo | String | Business description |
| phone | String | Business phone |
| email | String | Contact email |
| estimatedCost | Decimal | Quote amount |
| proposalFileUrl | String | PDF proposal from vendor |
| contractFileUrl | String | Signed contract PDF |
| status | String | "prospect" / "contacted" / "quoted" / "booked" / "rejected" |
| notes | String | Decision notes, why chosen/not |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Pipeline**: Track vendors through decision process
**Linking**: BudgetItems reference suppliers they're booked with

---

### `messages` - Guest Messages

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| guestId | UUID | FK → Guest |
| guestName | String | Name of message writer |
| messageText | String | Message content |
| isFromAdmin | Boolean | True if couple wrote response |
| createdAt | DateTime | |

**Purpose**: Guestbook messages or well-wishes
**Admin Response**: Couple can reply to messages

---

### `inspiration_images` - Moodboard

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| imageUrl | String | Store in Supabase or Pinterest/external |
| category | String | "decor" / "dress" / "makeup" / "flowers" / "photography" / "color_palette" |
| notes | String | Style notes or source description |
| sourceLink | String | Link to original source |
| isFavorite | Boolean | Star for top picks |
| createdAt | DateTime | |

**Purpose**: Pinterest-like inspiration board
**Categories**: Organize by wedding element

---

### `music_tracks` - Playlists

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| title | String | Song name |
| artist | String | Artist/band |
| category | String | "ceremony" / "cocktail" / "dinner" / "party" |
| spotifyUrl | String | Link to Spotify |
| durationSeconds | Int | Song length |
| notes | String | Why chosen or placement |
| createdAt | DateTime | |

**Purpose**: Track music selections for each wedding phase
**Optional**: Can integrate with Spotify API later

---

### `honeymoon_activities` - Trip Planning

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| destination | String | "Rome" / "Florence" / "Venice" |
| activityName | String | "Colosseum tour" |
| activityType | String | "tour" / "restaurant" / "hotel" / "transport" |
| estimatedCost | Decimal | Activity price |
| fundItemId | UUID | FK → FundItem (nullable, can link to fund) |
| dates | DateTime[] | When activity scheduled |
| notes | String | Details and tips |
| bookingStatus | String | "not_booked" / "pending" / "confirmed" |
| bookingUrl | String | Booking confirmation or link |
| createdAt | DateTime | |
| updatedAt | DateTime | |

**Linking**: Can be funded as FundItem (e.g., "Dinner in Rome" is both an activity and a fund item)

---

### `photos` - Photo Gallery

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| imageUrl | String | Supabase Storage URL |
| title | String | Photo title |
| description | String | Caption |
| uploadedBy | String | Email of uploader |
| category | String | "pre-wedding" / "venue" / "decor" / "ceremony" / "reception" |
| createdAt | DateTime | |

**Purpose**: Wedding and engagement photo gallery for guests to view
**Access**: Public read, admin write

---

## Database Views (Aggregations)

### `guest_stats`

```sql
SELECT 
  COUNT(*) as total_guests,
  COUNT(CASE WHEN rsvp_status = 'confirmed' THEN 1 END) as confirmed,
  COUNT(CASE WHEN rsvp_status = 'pending' THEN 1 END) as pending,
  COUNT(CASE WHEN rsvp_status = 'declined' THEN 1 END) as declined,
  SUM(plus_one_count) as additional_guests
FROM guests;
```

**Used**: Dashboard overview cards

### `budget_summary`

```sql
SELECT 
  SUM(estimated_cost) as total_estimated,
  SUM(actual_cost) as total_actual,
  COUNT(*) as item_count
FROM budget_items;
```

**Used**: Budget overview, category breakdown

### `honeymoon_progress`

```sql
SELECT 
  SUM(amount) as total_raised,
  COUNT(*) as contributor_count,
  COUNT(DISTINCT fund_item_id) as items_funded
FROM donations
WHERE payment_status = 'completed';
```

**Used**: Honeymoon fund progress display

---

## Indexes

Defined for performance:

```sql
-- Guest lookups by token (passwordless RSVP)
CREATE INDEX idx_guests_rsvp_token ON guests(rsvp_token);

-- Guest lookups by table (seating planner)
CREATE INDEX idx_guests_table_id ON guests(table_id);

-- Donation tracking
CREATE INDEX idx_donations_fund_item_id ON donations(fund_item_id);
CREATE INDEX idx_donations_guest_id ON donations(guest_id);
CREATE INDEX idx_donations_payment_status ON donations(payment_status);

-- Budget and supplier queries
CREATE INDEX idx_budget_items_category ON budget_items(category);
CREATE INDEX idx_budget_items_supplier_id ON budget_items(supplier_id);
CREATE INDEX idx_suppliers_category ON suppliers(category);
CREATE INDEX idx_suppliers_status ON suppliers(status);

-- Moodboard and music browsing
CREATE INDEX idx_inspiration_images_category ON inspiration_images(category);
CREATE INDEX idx_music_tracks_category ON music_tracks(category);

-- Honeymoon planning
CREATE INDEX idx_honeymoon_activities_destination ON honeymoon_activities(destination);
CREATE INDEX idx_honeymoon_activities_fund_item_id ON honeymoon_activities(fund_item_id);

-- Photos
CREATE INDEX idx_photos_category ON photos(category);
```

---

## Security - Row Level Security (RLS)

```sql
-- Users (couple only)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only see themselves" ON users
  FOR SELECT USING (auth.uid()::text = id);

-- Guests (couple full access, guests via RSVP token)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guests can see own data" ON guests
  FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Couple can manage all guests" ON guests
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid()::text AND is_admin = true
  ));

-- Fund Items (public read, admin write)
ALTER TABLE fund_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Fund items are public" ON fund_items
  FOR SELECT USING (true);
CREATE POLICY "Couple can manage fund items" ON fund_items
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid()::text AND is_admin = true
  ));

-- Donations (mostly public read for progress, admin full access)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Donations are publicly visible" ON donations
  FOR SELECT USING (true);
CREATE POLICY "Couple can manage donations" ON donations
  FOR ALL USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid()::text AND is_admin = true
  ));
```

---

## Data Types

All monetary values use `Decimal(10, 2)` for precision:
- Supports up to $99,999,999.99
- Precise to the cent
- Better than Float for financial data

All IDs use UUID for:
- Security (not sequential)
- Distributed generation
- Cross-database compatibility

---

## Constraints

**Primary Keys**: All tables have `id UUID @id @default(uuid())`
**Unique**: Only `users.email`, `guests.email`, `guests.rsvpToken`, `tables.tableNumber`
**Foreign Keys**: Defined with `@relation` and `onDelete` behavior
**Defaults**: Timestamps auto-set via `@default(now())`, status fields default to pending

---

## Growth Projections

Based on typical wedding:
- **Guests**: 100-300 rows
- **Budget Items**: 50-100 rows
- **Donations**: 1-300 rows (depends on fund participation)
- **Tasks**: 100-200 rows
- **Total Data Size**: < 1 MB

PostgreSQL on Supabase easily handles these volumes.
