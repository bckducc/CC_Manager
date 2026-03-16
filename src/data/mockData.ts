import type { StatCard, ApartmentUnit, Notification, ServiceRequest } from "../types";

export const stats: StatCard[] = [
  { label: "Tổng căn hộ",   value: 48,      sub: "4 tầng × 12 phòng",  icon: "🏢", color: "#1e3a5f", bg: "#dbeafe" },
  { label: "Đang thuê",     value: 41,      sub: "85.4% lấp đầy",      icon: "👥", color: "#14532d", bg: "#dcfce7" },
  { label: "Trống",         value: 5,       sub: "Sẵn sàng cho thuê",  icon: "🔑", color: "#78350f", bg: "#fef3c7" },
  { label: "Bảo trì",       value: 2,       sub: "Đang xử lý",         icon: "🔧", color: "#7f1d1d", bg: "#fee2e2" },
  { label: "Thu tháng này", value: "82.5M", sub: "VNĐ · Đạt 91%",      icon: "💰", color: "#1e3a5f", bg: "#ede9fe" },
  { label: "Yêu cầu mới",   value: 7,       sub: "Chờ xử lý",          icon: "📋", color: "#7c2d12", bg: "#ffedd5" },
];

export const units: ApartmentUnit[] = [
  { id: "101", floor: 1, room: "101", tenant: "Nguyễn Văn An",   status: "occupied",    rent: 4500000, dueDate: "2026-03-20" },
  { id: "102", floor: 1, room: "102", tenant: "Trần Thị Bình",   status: "occupied",    rent: 4200000, dueDate: "2026-03-15" },
  { id: "103", floor: 1, room: "103", tenant: "",                 status: "vacant",      rent: 4000000 },
  { id: "104", floor: 1, room: "104", tenant: "Lê Minh Châu",    status: "occupied",    rent: 4500000, dueDate: "2026-04-01" },
  { id: "201", floor: 2, room: "201", tenant: "",                 status: "maintenance", rent: 5000000 },
  { id: "202", floor: 2, room: "202", tenant: "Phạm Đức Dương",  status: "occupied",    rent: 5000000, dueDate: "2026-03-25" },
  { id: "203", floor: 2, room: "203", tenant: "Hoàng Thị Lan",   status: "occupied",    rent: 4800000, dueDate: "2026-03-18" },
  { id: "204", floor: 2, room: "204", tenant: "Vũ Quang Minh",   status: "occupied",    rent: 5200000, dueDate: "2026-03-22" },
  { id: "301", floor: 3, room: "301", tenant: "Đặng Thu Hà",     status: "occupied",    rent: 5500000, dueDate: "2026-03-30" },
  { id: "302", floor: 3, room: "302", tenant: "",                 status: "vacant",      rent: 5300000 },
  { id: "303", floor: 3, room: "303", tenant: "Bùi Văn Nam",     status: "occupied",    rent: 5500000, dueDate: "2026-03-28" },
  { id: "304", floor: 3, room: "304", tenant: "Ngô Thị Hoa",     status: "occupied",    rent: 5800000, dueDate: "2026-04-05" },
];

export const notifications: Notification[] = [
  { id: 1, type: "warning", message: "Phòng 102 - Tiền thuê sắp đến hạn (15/03)",       time: "2 giờ trước" },
  { id: 2, type: "danger",  message: "Phòng 201 - Báo cáo rò rỉ nước, cần xử lý gấp",  time: "3 giờ trước" },
  { id: 3, type: "success", message: "Phòng 304 - Đã ký hợp đồng mới thành công",       time: "5 giờ trước" },
  { id: 4, type: "info",    message: "Hệ thống điện tháng 3 đã được cập nhật",           time: "1 ngày trước" },
  { id: 5, type: "warning", message: "Phòng 103 - Còn trống 12 ngày, cần đăng tin",      time: "1 ngày trước" },
];

export const serviceRequests: ServiceRequest[] = [
  { id: 1, unit: "201", tenant: "—",              issue: "Rò rỉ đường nước phòng tắm",  priority: "high",   date: "16/03" },
  { id: 2, unit: "104", tenant: "Lê Minh Châu",   issue: "Máy lạnh không lạnh",          priority: "medium", date: "15/03" },
  { id: 3, unit: "302", tenant: "—",              issue: "Sửa cửa sổ trước cho thuê",   priority: "low",    date: "14/03" },
  { id: 4, unit: "203", tenant: "Hoàng Thị Lan",  issue: "Bóng đèn hành lang hỏng",      priority: "low",    date: "14/03" },
];
