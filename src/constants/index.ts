export const statusConfig = {
  occupied: { label: "Đang thuê", color: "#14532d", bg: "#dcfce7", dot: "#16a34a" },
  vacant:   { label: "Trống",     color: "#78350f", bg: "#fef3c7", dot: "#d97706" },
  maintenance: { label: "Bảo trì", color: "#7f1d1d", bg: "#fee2e2", dot: "#dc2626" },
} as const;

export const priorityConfig = {
  high:   { label: "Khẩn",       color: "#7f1d1d", bg: "#fee2e2" },
  medium: { label: "Trung bình", color: "#78350f", bg: "#fef3c7" },
  low:    { label: "Thấp",       color: "#1e3a5f", bg: "#dbeafe" },
} as const;

export const notifConfig = {
  warning: { icon: "⚠️", border: "#fbbf24", bg: "#fffbeb" },
  danger:  { icon: "🔴", border: "#f87171", bg: "#fff5f5" },
  success: { icon: "✅", border: "#34d399", bg: "#f0fdf4" },
  info:    { icon: "ℹ️", border: "#60a5fa", bg: "#eff6ff" },
} as const;

export const AVATAR_COLORS = [
  "#1e3a5f", "#14532d", "#78350f", "#7f1d1d", "#4c1d95", "#134e4a",
];
