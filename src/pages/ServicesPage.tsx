import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini } from "../components/ui";
import { SERVICE_CATEGORY_CONFIG, SERVICE_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Service, ServiceRequest } from "../types";

const REQUEST_STATUS_CONFIG = {
  pending:    { label:"Chờ xử lý",  color:"#92400e", bg:"#fef3c7", dot:"#f59e0b" },
  confirmed:  { label:"Đã xác nhận",color:"#1e40af", bg:"#dbeafe", dot:"#3b82f6" },
  inprogress: { label:"Đang làm",   color:"#4c1d95", bg:"#ede9fe", dot:"#8b5cf6" },
  completed:  { label:"Hoàn thành", color:"#065f46", bg:"#d1fae5", dot:"#10b981" },
  cancelled:  { label:"Đã hủy",     color:"#374151", bg:"#f3f4f6", dot:"#9ca3af" },
} as const;

export function ServicesPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [reqFilter, setReqFilter] = useState("all");
  const [tab, setTab] = useState<"services" | "requests">("services");
  const [selectedSvc, setSelectedSvc] = useState<Service | null>(null);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);

  const pendingCount = 0;
  const confirmedCount = 0;
  const completedCount = 0;

  const filteredServices = [];
  const filteredRequests = [];

  const catOptions = [];
  const reqOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng dịch vụ" value={0} icon="🛠" color={BRAND.text} bg="#f3f4f6" />
      </div>
    </div>
  );
}
