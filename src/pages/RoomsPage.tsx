import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, StatMini, Table } from "../components/ui";
import { ROOM_STATUS_CONFIG, ROOM_TYPE_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Room, RoomStatus } from "../types";

export function RoomsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Room | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");

  const statusCounts = {};
  const filtered = [];
  const filterOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng phòng"   value={0} icon="🏢" color={BRAND.text}   bg="#f3f4f6" />
        <StatMini label="Đang thuê"    value={0}    icon="✅" color="#065f46" bg="#d1fae5" sub="0%" />
        <StatMini label="Phòng trống"  value={0}      icon="🔑" color="#92400e" bg="#fef3c7" sub="Sẵn sàng cho thuê" />
        <StatMini label="Bảo trì"      value={0} icon="🔧" color="#7c2d12" bg="#fee2e2" />
      </div>

      {/* Toolbar */}
      <Card padding="14px 18px">
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <FilterPills options={filterOptions} value={filter} onChange={setFilter} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Tìm phòng..." />
            <div style={{ display: "flex", gap: 4 }}>
              {(["grid","table"] as const).map(v => (
                <Button key={v} label={v} onClick={() => setView(v)} />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Content */}
      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {/* Placeholder for grid items */}
          <Card>Grid Item</Card>
          <Card>Grid Item</Card>
          <Card>Grid Item</Card>
        </div>
      ) : (
        <Table>
          {/* Placeholder for table rows */}
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
