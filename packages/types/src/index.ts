// Shared types for the wedding platform

export type User = {
  id: string;
  name: string;
  email: string;
  role: "BRIDE" | "GROOM";
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Guest = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  side: "bride" | "groom";
  age?: number;
  relationship?: string;
  inviteSent: boolean;
  rsvpToken: string;
  rsvpStatus: "pending" | "confirmed" | "declined";
  plusOneCount: number;
  dietaryRestrictions?: string;
  tableId?: string;
  ceremonyRole?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FundItem = {
  id: string;
  name: string;
  alias?: string;
  description?: string;
  photoUrl?: string;
  category: string;
  price: number;
  quantityAvailable: number;
  quantityFunded: number;
  fundedAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Donation = {
  id: string;
  fundItemId: string;
  guestId?: string;
  guestName?: string;
  guestEmail?: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
  paymentProvider: "stripe" | "mercado_pago";
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  stripeSessionId?: string;
  mercadoPagoId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BudgetItem = {
  id: string;
  itemName: string;
  category: string;
  estimatedCost: number;
  actualCost?: number;
  paid: boolean;
  supplierId?: string;
  dueDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskItem = {
  id: string;
  taskName: string;
  category: string;
  assignedTo: "bride" | "groom" | "both";
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Supplier = {
  id: string;
  name: string;
  category: string;
  contactInfo?: string;
  phone?: string;
  email?: string;
  estimatedCost?: number;
  proposalFileUrl?: string;
  contractFileUrl?: string;
  status: "prospect" | "contacted" | "quoted" | "booked" | "rejected";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type HelpfulMetrics = {
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
  totalBudget: number;
  spentBudget: number;
  honeymoonFundsRaised: number;
  honeymoonDonorCount: number;
};
