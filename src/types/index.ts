export type TabId =
  | "dashboard"
  | "rooms"
  | "contracts"
  | "utilities"
  | "invoices"
  | "services"
  | "accounts"
  | "payments";

export type RoomStatus = "occupied" | "vacant" | "maintenance" | "reserved";
export type RoomType = "single" | "double" | "studio" | "penthouse";

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  status: RoomStatus;
  area: number; 
  baseRent: number; 
  maxOccupants: number;
  amenities: string[];
  description?: string;
  tenantId?: string;
  contractId?: string;
}

export type AccountRole = "admin" | "staff" | "tenant";
export type AccountStatus = "active" | "inactive" | "suspended";
export type Gender = "male" | "female" | "other";

export interface Account {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: AccountRole;
  status: AccountStatus;
  gender: Gender;
  dob?: string;
  idNumber?: string;
  address?: string;
  roomId?: string;
  createdAt: string;
  lastLogin?: string;
}

export type ContractStatus = "active" | "expired" | "terminated" | "pending";

export interface Contract {
  id: string;
  roomId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: ContractStatus;
  terms?: string;
  createdAt: string;
  renewalCount: number;
}

export type UtilityType = "electricity" | "water" | "internet" | "parking";

export interface UtilityReading {
  id: string;
  roomId: string;
  type: UtilityType;
  month: string; 
  previousReading: number;
  currentReading: number;
  consumption: number;
  unitPrice: number;
  totalAmount: number;
  recordedAt: string;
  recordedBy: string;
}

export type ServiceStatus = "available" | "unavailable";
export type ServiceCategory = "cleaning" | "maintenance" | "laundry" | "parking" | "security" | "other";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  unit: string; 
  status: ServiceStatus;
  description?: string;
}

export interface ServiceRequest {
  id: string;
  serviceId: string;
  roomId: string;
  tenantId: string;
  requestDate: string;
  scheduledDate?: string;
  status: "pending" | "confirmed" | "inprogress" | "completed" | "cancelled";
  note?: string;
  amount: number;
}

export type InvoiceStatus = "unpaid" | "paid" | "overdue" | "partial";
export type InvoiceType = "monthly" | "utility" | "service" | "deposit" | "penalty";

export interface InvoiceItem {
  label: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  roomId: string;
  tenantId: string;
  contractId?: string;
  type: InvoiceType;
  month: string; 
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  totalAmount: number;
  paidAmount: number;
  status: InvoiceStatus;
  note?: string;
}

// ─── Payments ────────────────────────────────────────────────────────────────
export type PaymentMethod = "cash" | "transfer" | "momo" | "vnpay" | "card";

export interface Payment {
  id: string;
  invoiceId: string;
  roomId: string;
  tenantId: string;
  amount: number;
  method: PaymentMethod;
  paidAt: string;
  receivedBy: string;
  note?: string;
  transactionRef?: string;
}
