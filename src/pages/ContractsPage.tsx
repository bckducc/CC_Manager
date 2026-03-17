import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini } from "../components/ui";
import { CONTRACT_STATUS_CONFIG, BRAND } from "../constants";
import { contracts, rooms, accounts } from "../data/mockData";
import { fmt } from "../utils";
import type { Contract } from "../types";

export function ContractsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Contract | null>(null);

  const activeCount     = contracts.filter(c => c.status === "active").length;
  const expiredCount    = contracts.filter(c => c.status === "expired").length;
  const terminatedCount = contracts.filter(c => c.status === "terminated").length;

  // Contracts expiring in 60 days
  const expiringSoon = contracts.filter(c => {
    if (c.status !== "active") return false;
    const days = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000);
    return days > 0 && days <= 60;
  });

  const filtered = contracts.filter(c => {
    const room   = rooms.find(r => r.id === c.roomId);
    const tenant = accounts.find(a => a.id === c.tenantId);
    const q = search.toLowerCase();
    const matchSearch = !q || room?.number.includes(q) || tenant?.fullName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const filterOptions = [
    { value: "all",         label: "Tất cả",      count: contracts.length },
    { value: "active",      label: "Hiệu lực",    count: activeCount },
    { value: "expired",     label: "Hết hạn",     count: expiredCount },
    { value: "terminated",  label: "Đã hủy",      count: terminatedCount },
    { value: "pending",     label: "Chờ duyệt",   count: contracts.filter(c => c.status === "pending").length },
  ];

  const daysLeft = (endDate: string) => {
    return Math.ceil((new Date(endDate).getTime() - Date.now()) / 86400000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Đang hiệu lực"   value={activeCount}     icon="✅" color="#065f46" bg="#d1fae5" />
        <StatMini label="Hết hạn"         value={expiredCount}    icon="📅" color="#374151" bg="#f3f4f6" />
        <StatMini label="Đã hủy"          value={terminatedCount} icon="❌" color="#7c2d12" bg="#fee2e2" />
        <StatMini label="Sắp hết hạn"     value={expiringSoon.length} icon="⚠️" color="#92400e" bg="#fef3c7" sub="Trong 60 ngày" />
      </div>

      {/* Expiring soon banner */}
      {expiringSoon.length > 0 && (
        <Card padding="12px 16px" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
            ⚠️ {expiringSoon.length} hợp đồng sắp hết hạn trong 60 ngày tới
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {expiringSoon.map(c => {
              const room = rooms.find(r => r.id === c.roomId);
              const days = daysLeft(c.endDate);
              return (
                <button key={c.id} onClick={() => setSelected(c)} style={{
                  padding: "4px 10px", borderRadius: 7, background: "#fef3c7",
                  color: "#92400e", fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer",
                }}>
                  P.{room?.number} — còn {days} ngày
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Toolbar */}
      <Card padding="12px 16px">
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <FilterPills options={filterOptions} value={filter} onChange={setFilter} />
          <div style={{ display: "flex", gap: 10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Phòng, cư dân..." />
            <Button>+ Tạo hợp đồng</Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="0">
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BRAND.border}`, fontWeight: 700, fontSize: 14, color: BRAND.text }}>
          {filtered.length} hợp đồng
        </div>
        <Table
          columns={[
            { key:"id",     label:"Mã HĐ",    width:90,  render:c => <span style={{ fontSize:11, color:BRAND.textMuted, fontFamily:"monospace" }}>{c.id.toUpperCase()}</span> },
            { key:"room",   label:"Phòng",    width:80,  render:c => {
              const r = rooms.find(rm => rm.id === c.roomId);
              return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{r?.number}</span>;
            }},
            { key:"tenant", label:"Cư dân",             render:c => {
              const t = accounts.find(a => a.id === c.tenantId);
              return <span style={{ fontSize:13 }}>{t?.fullName || "—"}</span>;
            }},
            { key:"period", label:"Thời hạn",           render:c => (
              <div>
                <div style={{ fontSize:12 }}>{fmt.date(c.startDate)} → {fmt.date(c.endDate)}</div>
                {c.status === "active" && (() => {
                  const days = daysLeft(c.endDate);
                  const color = days <= 30 ? "#ef4444" : days <= 60 ? "#f59e0b" : "#065f46";
                  return <div style={{ fontSize:10, color, fontWeight:600 }}>còn {days} ngày</div>;
                })()}
              </div>
            )},
            { key:"rent",   label:"Tiền thuê", width:130, render:c => <span style={{ fontWeight:700 }}>{fmt.currency(c.monthlyRent)}</span>, align:"right" },
            { key:"deposit",label:"Đặt cọc",  width:130, render:c => <span style={{ color:BRAND.textMuted }}>{fmt.currency(c.deposit)}</span>, align:"right" },
            { key:"renewals",label:"Gia hạn", width:70,  render:c => <span style={{ fontSize:12 }}>{c.renewalCount}×</span>, align:"center" },
            { key:"status", label:"Trạng thái",         render:c => <Badge {...CONTRACT_STATUS_CONFIG[c.status]} /> },
            { key:"action", label:"",         width:130, render:c => (
              <div style={{ display:"flex", gap:5 }}>
                <Button size="sm" variant="ghost" onClick={() => setSelected(c)}>Chi tiết</Button>
                {c.status === "active" && <Button size="sm" variant="outline">Gia hạn</Button>}
              </div>
            )},
          ]}
          data={filtered}
          rowKey={c => c.id}
        />
      </Card>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Chi tiết hợp đồng" width={560}>
        {selected && (() => {
          const room   = rooms.find(r => r.id === selected.roomId);
          const tenant = accounts.find(a => a.id === selected.tenantId);
          const days   = daysLeft(selected.endDate);
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontFamily:"monospace", fontSize:13, color:BRAND.textMuted, background:BRAND.surfaceAlt, padding:"3px 8px", borderRadius:6 }}>
                  {selected.id.toUpperCase()}
                </span>
                <Badge {...CONTRACT_STATUS_CONFIG[selected.status]} />
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Phòng", `Phòng ${room?.number} (Tầng ${room?.floor})`],
                  ["Cư dân", tenant?.fullName || "—"],
                  ["Ngày bắt đầu", fmt.date(selected.startDate)],
                  ["Ngày kết thúc", fmt.date(selected.endDate)],
                  ["Tiền thuê/tháng", fmt.currency(selected.monthlyRent)],
                  ["Tiền đặt cọc", fmt.currency(selected.deposit)],
                  ["Số lần gia hạn", `${selected.renewalCount} lần`],
                  ["Ngày tạo", fmt.date(selected.createdAt)],
                ].map(([l, v]) => (
                  <div key={l} style={{ padding:"10px 12px", background:BRAND.surfaceAlt, borderRadius:9 }}>
                    <div style={{ fontSize:10, color:BRAND.textMuted, fontWeight:600 }}>{l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:BRAND.text, marginTop:2 }}>{v}</div>
                  </div>
                ))}
              </div>

              {selected.status === "active" && (
                <div style={{
                  padding:"10px 14px", borderRadius:9,
                  background: days <= 30 ? "#fee2e2" : days <= 60 ? "#fffbeb" : "#d1fae5",
                  display:"flex", justifyContent:"space-between", alignItems:"center"
                }}>
                  <span style={{ fontSize:12, fontWeight:600, color: days <= 30 ? "#991b1b" : days <= 60 ? "#92400e" : "#065f46" }}>
                    {days <= 0 ? "Đã hết hạn" : `Còn ${days} ngày đến ngày kết thúc`}
                  </span>
                  <Button size="sm" variant="outline">Gia hạn</Button>
                </div>
              )}

              <div style={{ display:"flex", gap:8, paddingTop:8, borderTop:`1px solid ${BRAND.border}` }}>
                <Button style={{ flex:1 }}>📄 In hợp đồng</Button>
                {selected.status === "active" && (
                  <Button variant="danger" style={{ flex:1 }}>Chấm dứt HĐ</Button>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
