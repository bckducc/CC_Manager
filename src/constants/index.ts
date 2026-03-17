import type {
  RoomStatus, RoomType, ContractStatus, AccountRole, AccountStatus,
  UtilityType, ServiceCategory, InvoiceStatus, PaymentMethod, TabId, ServiceStatus
} from "../types";

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS: { id: TabId; icon: string; label: string; group: "main" | "finance" | "admin" }[] = [
  { id: "dashboard",  icon: "▦",  label: "Tổng quan",         group: "main"    },
  { id: "rooms",      icon: "⊞",  label: "Quản lý phòng",     group: "main"    },
  { id: "contracts",  icon: "✎",  label: "Hợp đồng",          group: "main"    },
  { id: "utilities",  icon: "⚡",  label: "Điện - Nước",       group: "finance" },
  { id: "invoices",   icon: "◫",  label: "Hóa đơn",           group: "finance" },
  { id: "payments",   icon: "◈",  label: "Lịch sử thanh toán",group: "finance" },
  { id: "services",   icon: "⚙",  label: "Dịch vụ",           group: "admin"   },
  { id: "accounts",   icon: "◉",  label: "Tài khoản",         group: "admin"   },
];

// ─── Room ─────────────────────────────────────────────────────────────────────
export const ROOM_STATUS_CONFIG: Record<RoomStatus, { label: string; color: string; bg: string; dot: string }> = {
  occupied:    { label: "Đang thuê",   color: "#065f46", bg: "#d1fae5", dot: "#10b981" },
  vacant:      { label: "Trống",       color: "#92400e", bg: "#fef3c7", dot: "#f59e0b" },
  maintenance: { label: "Bảo trì",     color: "#7c2d12", bg: "#fee2e2", dot: "#ef4444" },
  reserved:    { label: "Đã đặt",      color: "#1e40af", bg: "#dbeafe", dot: "#3b82f6" },
};

export const ROOM_TYPE_CONFIG: Record<RoomType, { label: string; icon: string }> = {
  single:    { label: "Phòng đơn",   icon: "🛏" },
  double:    { label: "Phòng đôi",   icon: "🛏🛏" },
  studio:    { label: "Studio",      icon: "🏠" },
  penthouse: { label: "Penthouse",   icon: "👑" },
};

// ─── Contract ─────────────────────────────────────────────────────────────────
export const CONTRACT_STATUS_CONFIG: Record<ContractStatus, { label: string; color: string; bg: string }> = {
  active:     { label: "Hiệu lực",    color: "#065f46", bg: "#d1fae5" },
  expired:    { label: "Hết hạn",     color: "#374151", bg: "#f3f4f6" },
  terminated: { label: "Đã hủy",      color: "#7c2d12", bg: "#fee2e2" },
  pending:    { label: "Chờ duyệt",   color: "#1e40af", bg: "#dbeafe" },
};

// ─── Account ──────────────────────────────────────────────────────────────────
export const ACCOUNT_ROLE_CONFIG: Record<AccountRole, { label: string; color: string; bg: string }> = {
  admin:  { label: "Quản trị",  color: "#4c1d95", bg: "#ede9fe" },
  staff:  { label: "Nhân viên", color: "#1e40af", bg: "#dbeafe" },
  tenant: { label: "Cư dân",    color: "#065f46", bg: "#d1fae5" },
};

export const ACCOUNT_STATUS_CONFIG: Record<AccountStatus, { label: string; color: string; bg: string; dot: string }> = {
  active:    { label: "Hoạt động",  color: "#065f46", bg: "#d1fae5", dot: "#10b981" },
  inactive:  { label: "Không hoạt động", color: "#374151", bg: "#f3f4f6", dot: "#9ca3af" },
  suspended: { label: "Bị khóa",    color: "#7c2d12", bg: "#fee2e2", dot: "#ef4444" },
};

// ─── Utility ──────────────────────────────────────────────────────────────────
export const UTILITY_CONFIG: Record<UtilityType, { label: string; icon: string; unit: string; color: string; bg: string }> = {
  electricity: { label: "Điện",    icon: "⚡", unit: "kWh",  color: "#92400e", bg: "#fef3c7" },
  water:       { label: "Nước",    icon: "💧", unit: "m³",   color: "#1e40af", bg: "#dbeafe" },
  internet:    { label: "Internet",icon: "📡", unit: "tháng",color: "#4c1d95", bg: "#ede9fe" },
  parking:     { label: "Gửi xe", icon: "🅿", unit: "tháng",color: "#065f46", bg: "#d1fae5" },
};

// ─── Service ──────────────────────────────────────────────────────────────────
export const SERVICE_CATEGORY_CONFIG: Record<ServiceCategory, { label: string; icon: string }> = {
  cleaning:    { label: "Vệ sinh",    icon: "🧹" },
  maintenance: { label: "Sửa chữa",   icon: "🔧" },
  laundry:     { label: "Giặt ủi",    icon: "👕" },
  parking:     { label: "Đỗ xe",      icon: "🚗" },
  security:    { label: "Bảo vệ",     icon: "🔐" },
  other:       { label: "Khác",        icon: "📦" },
};

export const SERVICE_STATUS_CONFIG: Record<ServiceStatus, { label: string; color: string; bg: string }> = {
  available:   { label: "Sẵn sàng",   color: "#065f46", bg: "#d1fae5" },
  unavailable: { label: "Tạm dừng",   color: "#374151", bg: "#f3f4f6" },
};

// ─── Invoice ──────────────────────────────────────────────────────────────────
export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, { label: string; color: string; bg: string; dot: string }> = {
  unpaid:  { label: "Chưa thanh toán", color: "#92400e", bg: "#fef3c7", dot: "#f59e0b" },
  paid:    { label: "Đã thanh toán",   color: "#065f46", bg: "#d1fae5", dot: "#10b981" },
  overdue: { label: "Quá hạn",         color: "#7c2d12", bg: "#fee2e2", dot: "#ef4444" },
  partial: { label: "Thanh toán một phần", color: "#1e40af", bg: "#dbeafe", dot: "#3b82f6" },
};

// ─── Payment ──────────────────────────────────────────────────────────────────
export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, { label: string; icon: string }> = {
  cash:     { label: "Tiền mặt",        icon: "💵" },
  transfer: { label: "Chuyển khoản",    icon: "🏦" },
  momo:     { label: "MoMo",            icon: "💜" },
  vnpay:    { label: "VNPay",           icon: "🔵" },
  card:     { label: "Thẻ ngân hàng",   icon: "💳" },
};

// ─── Colors ───────────────────────────────────────────────────────────────────
export const AVATAR_PALETTE = [
  "#0f4c81","#1a5c3a","#7b2d00","#4a0e8f","#00506b","#7c1536","#1a4731","#5c3d00"
];

export const BRAND = {
  primary:   "#0f1f45",
  accent:    "#2563eb",
  accentSoft:"#dbeafe",
  surface:   "#ffffff",
  surfaceAlt:"#f8f9fb",
  border:    "#e5e7eb",
  text:      "#111827",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
};
