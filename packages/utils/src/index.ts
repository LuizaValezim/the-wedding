import { z } from "zod";

// ============================================
// GUEST RSVP VALIDATION
// ============================================

export const RSVPFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  plusOneCount: z.coerce.number().min(0).max(5),
  dietaryRestrictions: z.string().optional(),
  rsvpStatus: z.enum(["confirmed", "declined"]),
});

export type RSVPFormData = z.infer<typeof RSVPFormSchema>;

// ============================================
// DONATION VALIDATION
// ============================================

export const DonationFormSchema = z.object({
  fundItemId: z.string().uuid(),
  guestName: z.string().min(2, "Name must be at least 2 characters").optional(),
  guestEmail: z.string().email().optional(),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  message: z.string().optional(),
  isAnonymous: z.boolean().default(false),
});

export type DonationFormData = z.infer<typeof DonationFormSchema>;

// ============================================
// GUEST MANAGEMENT VALIDATION
// ============================================

export const GuestFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  side: z.enum(["bride", "groom"]),
  age: z.coerce.number().optional().nullable(),
  relationship: z.string().optional().nullable(),
  dietaryRestrictions: z.string().optional().nullable(),
  tableId: z.string().optional().nullable(),
  ceremonyRole: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type GuestFormData = z.infer<typeof GuestFormSchema>;

// ============================================
// BUDGET VALIDATION
// ============================================

export const BudgetItemSchema = z.object({
  itemName: z.string().min(2, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  estimatedCost: z.coerce.number().positive("Cost must be greater than 0"),
  actualCost: z.coerce.number().optional().nullable(),
  paid: z.boolean().default(false),
  supplierId: z.string().optional().nullable(),
  dueDate: z.date().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type BudgetItemData = z.infer<typeof BudgetItemSchema>;

// ============================================
// SUPPLIER VALIDATION
// ============================================

export const SupplierSchema = z.object({
  name: z.string().min(2, "Supplier name is required"),
  category: z.string().min(1, "Category is required"),
  contactInfo: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  estimatedCost: z.coerce.number().optional().nullable(),
  status: z.enum(["prospect", "contacted", "quoted", "booked", "rejected"]).default("prospect"),
  notes: z.string().optional().nullable(),
});

export type SupplierData = z.infer<typeof SupplierSchema>;

// ============================================
// FUND ITEM VALIDATION
// ============================================

export const FundItemSchema = z.object({
  name: z.string().min(2, "Fund item name is required"),
  alias: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  quantityAvailable: z.coerce.number().positive("Quantity must be greater than 0"),
});

export type FundItemData = z.infer<typeof FundItemSchema>;

// ============================================
// TASK VALIDATION
// ============================================

export const TaskItemSchema = z.object({
  taskName: z.string().min(2, "Task name is required"),
  category: z.string().min(1, "Category is required"),
  assignedTo: z.enum(["bride", "groom", "both"]).default("both"),
  dueDate: z.date().optional().nullable(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  completed: z.boolean().default(false),
  notes: z.string().optional().nullable(),
});

export type TaskItemData = z.infer<typeof TaskItemSchema>;

// ============================================
// TABLE VALIDATION
// ============================================

export const TableSchema = z.object({
  tableNumber: z.coerce.number().positive("Table number is required"),
  theme: z.string().optional().nullable(),
  chairsCapacity: z.coerce.number().positive("Capacity must be greater than 0"),
  notes: z.string().optional().nullable(),
});

export type TableData = z.infer<typeof TableSchema>;
