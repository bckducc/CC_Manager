export interface StatCard {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  color: string;
  bg: string;
}

export interface ApartmentUnit {
  id: string;
  floor: number;
  room: string;
  tenant: string;
  status: "occupied" | "vacant" | "maintenance";
  rent: number;
  dueDate?: string;
}

export interface Notification {
  id: number;
  type: "warning" | "info" | "success" | "danger";
  message: string;
  time: string;
}

export interface ServiceRequest {
  id: number;
  unit: string;
  tenant: string;
  issue: string;
  priority: "high" | "medium" | "low";
  date: string;
}

export type TabType = "overview" | "units" | "requests";
export type FilterStatus = "all" | ApartmentUnit["status"];
