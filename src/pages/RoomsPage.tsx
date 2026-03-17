import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, StatMini, Table } from "../components/ui";
import { ROOM_STATUS_CONFIG, ROOM_TYPE_CONFIG, BRAND } from "../constants";
import { rooms as initialRooms } from "../data/mockData";
import { accounts, contracts } from "../data/mockData";
import { fmt } from "../utils";
import type { Room, RoomStatus } from "../types";

export function RoomsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Room | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");

  const statusCounts = (["occupied","vacant","maintenance","reserved"] as RoomStatus[])
    .reduce((acc, s) => ({ ...acc, [s]: initialRooms.filter(r => r.status === s).length }), {} as Record<RoomStatus, number>);

  const filtered = initialRooms.filter(r => {
    const matchSearch = r.number.includes(search) || r.type.includes(search);
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const filterOptions = [
    { value: "all",         label: "Tất cả",   count: initialRooms.length },
    { value: "occupied",    label: "Đang thuê", count: statusCounts.occupied },
    { value: "vacant",      label: "Trống",     count: statusCounts.vacant },
    { value: "maintenance", label: "Bảo trì",   count: statusCounts.maintenance },
    { value: "reserved",    label: "Đã đặt",    count: statusCounts.reserved },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng phòng"   value={initialRooms.length} icon="🏢" color={BRAND.text}   bg="#f3f4f6" />
        <StatMini label="Đang thuê"    value={statusCounts.occupied}    icon="✅" color="#065f46" bg="#d1fae5" sub={`${Math.round(statusCounts.occupied/initialRooms.length*100)}%`} />
        <StatMini label="Phòng trống"  value={statusCounts.vacant}      icon="🔑" color="#92400e" bg="#fef3c7" sub="Sẵn sàng cho thuê" />
        <StatMini label="Bảo trì"      value={statusCounts.maintenance} icon="🔧" color="#7c2d12" bg="#fee2e2" />
      </div>

      {/* Toolbar */}
      <Card padding="14px 18px">
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <FilterPills options={filterOptions} value={filter} onChange={setFilter} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Tìm phòng..." />
            <div style={{ display: "flex", gap: 4 }}>
              {(["grid","table"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  width: 32, height: 32, borderRadius: 7, border: `1px solid ${BRAND.border}`,
                  background: view === v ? BRAND.primary : BRAND.surface,
                  color: view === v ? "#fff" : BRAND.textMuted,
                  cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                }}>{ v === "grid" ? "⊞" : "☰" }</button>
              ))}
            </div>
            <Button>+ Thêm phòng</Button>
          </div>
        </div>
      </Card>

      {/* Grid view */}
      {view === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {filtered.map(room => {
            const cfg = ROOM_STATUS_CONFIG[room.status];
            const typeCfg = ROOM_TYPE_CONFIG[room.type];
            const tenant = accounts.find(a => a.id === room.tenantId);
            return (
              <Card key={room.id} style={{ cursor: "pointer", borderTop: `3px solid ${cfg.dot}`, transition: "box-shadow 0.15s" }}
                padding="16px 18px"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: BRAND.text }}>Phòng {room.number}</div>
                    <div style={{ fontSize: 11, color: BRAND.textMuted }}>Tầng {room.floor} · {typeCfg.icon} {typeCfg.label}</div>
                  </div>
                  <Badge {...cfg} />
                </div>

                <div style={{ display: "flex", gap: 14, marginBottom: 12, padding: "9px 0", borderTop: `1px solid ${BRAND.border}`, borderBottom: `1px solid ${BRAND.border}` }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text }}>{room.area}m²</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted }}>Diện tích</div>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46" }}>{(room.baseRent/1e6).toFixed(1)}M</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted }}>VNĐ/tháng</div>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text }}>{room.maxOccupants}</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted }}>Người tối đa</div>
                  </div>
                </div>

                {tenant ? (
                  <div style={{ fontSize: 12, color: BRAND.textMuted, marginBottom: 10 }}>
                    👤 {tenant.fullName}
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: BRAND.textLight, marginBottom: 10 }}>Chưa có cư dân</div>
                )}

                <div style={{ display: "flex", gap: 6 }}>
                  {room.amenities.slice(0, 2).map(a => (
                    <span key={a} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: BRAND.surfaceAlt, color: BRAND.textMuted }}>
                      {a}
                    </span>
                  ))}
                  {room.amenities.length > 2 && (
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: BRAND.surfaceAlt, color: BRAND.textMuted }}>
                      +{room.amenities.length - 2}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                  <Button size="sm" variant="ghost" style={{ flex: 1 }} onClick={() => setSelected(room)}>Chi tiết</Button>
                  <Button size="sm" style={{ flex: 1 }}>Chỉnh sửa</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Table view */}
      {view === "table" && (
        <Card padding="0">
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BRAND.border}`, fontWeight: 700, fontSize: 14, color: BRAND.text }}>
            {filtered.length} phòng
          </div>
          <Table
            columns={[
              { key:"num",    label:"Phòng",    width:80,  render:r => <strong>P.{r.number}</strong> },
              { key:"floor",  label:"Tầng",     width:60,  render:r => `Tầng ${r.floor}` },
              { key:"type",   label:"Loại",     width:110, render:r => ROOM_TYPE_CONFIG[r.type].label },
              { key:"area",   label:"Diện tích",width:90,  render:r => `${r.area} m²`, align:"right" },
              { key:"rent",   label:"Giá thuê", width:130, render:r => <span style={{ fontWeight:700, color:"#065f46" }}>{fmt.currency(r.baseRent)}</span>, align:"right" },
              { key:"status", label:"Trạng thái",         render:r => <Badge {...ROOM_STATUS_CONFIG[r.status]} /> },
              { key:"tenant", label:"Cư dân",             render:r => {
                const t = accounts.find(a => a.id === r.tenantId);
                return t ? <span style={{ fontSize:12 }}>{t.fullName}</span> : <span style={{ color: BRAND.textLight, fontSize:12 }}>—</span>;
              }},
              { key:"action", label:"",         width:100, render:r => (
                <div style={{ display:"flex", gap:5 }}>
                  <Button size="sm" variant="ghost" onClick={() => setSelected(r)}>Chi tiết</Button>
                </div>
              )},
            ]}
            data={filtered}
            rowKey={r => r.id}
          />
        </Card>
      )}

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Phòng ${selected?.number} — Chi tiết`} width={540}>
        {selected && (() => {
          const cfg = ROOM_STATUS_CONFIG[selected.status];
          const tenant = accounts.find(a => a.id === selected.tenantId);
          const contract = contracts.find(c => c.id === selected.contractId);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <Badge {...cfg} />
                <Badge label={ROOM_TYPE_CONFIG[selected.type].label} color={BRAND.textMuted} bg={BRAND.surfaceAlt} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Số phòng", selected.number],
                  ["Tầng", `Tầng ${selected.floor}`],
                  ["Diện tích", `${selected.area} m²`],
                  ["Giá thuê cơ bản", fmt.currency(selected.baseRent)],
                  ["Tối đa", `${selected.maxOccupants} người`],
                  ["Cư dân", tenant?.fullName || "—"],
                ].map(([l, v]) => (
                  <div key={l} style={{ padding: "10px 12px", background: BRAND.surfaceAlt, borderRadius: 9 }}>
                    <div style={{ fontSize: 10, color: BRAND.textMuted, fontWeight: 600 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.text, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: BRAND.textMuted, marginBottom: 7 }}>Tiện nghi</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {selected.amenities.map(a => (
                    <span key={a} style={{ padding: "4px 10px", borderRadius: 8, background: BRAND.accentSoft, color: BRAND.accent, fontSize: 12, fontWeight: 600 }}>{a}</span>
                  ))}
                </div>
              </div>
              {contract && (
                <div style={{ padding: "12px 14px", background: "#d1fae5", borderRadius: 9 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", marginBottom: 4 }}>Hợp đồng hiện tại</div>
                  <div style={{ fontSize: 12, color: "#065f46" }}>
                    {fmt.date(contract.startDate)} → {fmt.date(contract.endDate)} · {fmt.currency(contract.monthlyRent)}/tháng
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: `1px solid ${BRAND.border}` }}>
                <Button style={{ flex: 1 }}>✏️ Chỉnh sửa</Button>
                {selected.status === "vacant" && <Button variant="outline" style={{ flex: 1 }}>📄 Tạo hợp đồng</Button>}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
