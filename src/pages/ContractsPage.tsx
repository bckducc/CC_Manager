import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini } from "../components/ui";
import { CONTRACT_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Contract } from "../types";

export function ContractsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Contract | null>(null);

  const activeCount = 0;
  const expiredCount = 0;
  const terminatedCount = 0;
  const expiringSoon = [];
  const filtered = [];
  const filterOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Đang hiệu lực" value={activeCount} icon="✅" color="#065f46" bg="#d1fae5" />
        <StatMini label="Hết hạn" value={expiredCount} icon="📅" color="#374151" bg="#f3f4f6" />
        <StatMini label="Đã hủy" value={terminatedCount} icon="❌" color="#7c2d12" bg="#fee2e2" />
        <StatMini label="Sắp hết hạn" value={expiringSoon.length} icon="⚠️" color="#92400e" bg="#fef3c7" sub="Trong 60 ngày" />
      </div>
    </div>
  );
}
