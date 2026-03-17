import { useState } from "react";
import { Card, Badge, Button, FilterPills, Modal, Table, StatMini, Select } from "../components/ui";
import { UTILITY_CONFIG, BRAND } from "../constants";
import { utilityReadings, rooms } from "../data/mockData";
import { fmt } from "../utils";
import type { UtilityReading, UtilityType } from "../types";

export function UtilitiesPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | UtilityType>("all");
  const [monthFilter, setMonthFilter] = useState("2026-03");
  const [selected, setSelected] = useState<UtilityReading | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const months = ["2026-03", "2026-02", "2026-01"];

  const monthReadings = utilityReadings.filter(u => u.month === monthFilter);

  const filtered = monthReadings.filter(u =>
    typeFilter === "all" || u.type === typeFilter
  );

  const totalElec  = monthReadings.filter(u => u.type === "electricity").reduce((s, u) => s + u.totalAmount, 0);
  const totalWater = monthReadings.filter(u => u.type === "water").reduce((s, u) => s + u.totalAmount, 0);
  const totalElecKwh = monthReadings.filter(u => u.type === "electricity").reduce((s, u) => s + u.consumption, 0);
  const totalWaterM3 = monthReadings.filter(u => u.type === "water").reduce((s, u) => s + u.consumption, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng tiền điện"  value={`${(totalElec/1e6).toFixed(2)}M`}  icon="⚡" color="#92400e" bg="#fef3c7" sub={`${totalElecKwh} kWh`} />
        <StatMini label="Tổng tiền nước"  value={`${(totalWater/1e6).toFixed(2)}M`} icon="💧" color="#1e40af" bg="#dbeafe" sub={`${totalWaterM3} m³`} />
        <StatMini label="Số phòng ghi chỉ số" value={new Set(monthReadings.map(u => u.roomId)).size} icon="📊" color={BRAND.text} bg="#f3f4f6" />
        <StatMini label="Tổng doanh thu điện nước" value={`${((totalElec+totalWater)/1e6).toFixed(2)}M`} icon="💰" color="#065f46" bg="#d1fae5" />
      </div>

      {/* Toolbar */}
      <Card padding="12px 16px">
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <FilterPills
              options={[
                { value: "all",         label: "Tất cả" },
                { value: "electricity", label: "⚡ Điện" },
                { value: "water",       label: "💧 Nước" },
              ]}
              value={typeFilter}
              onChange={v => setTypeFilter(v as typeof typeFilter)}
            />
            <Select
              value={monthFilter}
              onChange={setMonthFilter}
              options={months.map(m => ({ value: m, label: fmt.month(m) }))}
              style={{ width: 150 }}
            />
          </div>
          <Button onClick={() => setShowAdd(true)}>+ Ghi chỉ số mới</Button>
        </div>
      </Card>

      {/* Consumption cards per room */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {rooms.filter(r => r.status === "occupied").map(room => {
          const elec  = utilityReadings.find(u => u.roomId === room.id && u.type === "electricity" && u.month === monthFilter);
          const water = utilityReadings.find(u => u.roomId === room.id && u.type === "water" && u.month === monthFilter);
          if (typeFilter === "electricity" && !elec) return null;
          if (typeFilter === "water" && !water) return null;

          return (
            <Card key={room.id} padding="16px 18px">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontWeight:800, fontSize:16, color:BRAND.text }}>Phòng {room.number}</div>
                <span style={{ fontSize:11, color:BRAND.textMuted }}>Tầng {room.floor}</span>
              </div>

              {(typeFilter === "all" || typeFilter === "electricity") && elec && (
                <div style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#92400e" }}>⚡ Điện</span>
                    <span style={{ fontSize:12, fontWeight:700 }}>{fmt.currency(elec.totalAmount)}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                    {[
                      ["Chỉ số cũ", elec.previousReading + " kWh"],
                      ["Chỉ số mới", elec.currentReading + " kWh"],
                      ["Tiêu thụ", elec.consumption + " kWh"],
                    ].map(([l, v]) => (
                      <div key={l} style={{ padding:"6px 8px", background:"#fef3c7", borderRadius:7, textAlign:"center" }}>
                        <div style={{ fontSize:10, color:"#92400e" }}>{l}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:"#78350f" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(typeFilter === "all" || typeFilter === "water") && water && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#1e40af" }}>💧 Nước</span>
                    <span style={{ fontSize:12, fontWeight:700 }}>{fmt.currency(water.totalAmount)}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                    {[
                      ["Chỉ số cũ", water.previousReading + " m³"],
                      ["Chỉ số mới", water.currentReading + " m³"],
                      ["Tiêu thụ", water.consumption + " m³"],
                    ].map(([l, v]) => (
                      <div key={l} style={{ padding:"6px 8px", background:"#dbeafe", borderRadius:7, textAlign:"center" }}>
                        <div style={{ fontSize:10, color:"#1e40af" }}>{l}</div>
                        <div style={{ fontSize:11, fontWeight:700, color:"#1e3a8a" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!elec && !water && (
                <div style={{ textAlign:"center", padding:"12px 0", color:BRAND.textLight, fontSize:12 }}>
                  Chưa ghi chỉ số tháng này
                </div>
              )}

              <div style={{ marginTop:12, display:"flex", gap:6 }}>
                {(elec || water) && (
                  <Button size="sm" variant="ghost" style={{ flex:1 }}
                    onClick={() => setSelected(elec || water || null)}>
                    Chi tiết
                  </Button>
                )}
                <Button size="sm" style={{ flex:1 }} onClick={() => setShowAdd(true)}>
                  {(elec || water) ? "Cập nhật" : "Ghi chỉ số"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* All readings table */}
      <Card padding="0">
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${BRAND.border}`, fontWeight:700, fontSize:14, color:BRAND.text }}>
          Bảng chỉ số {fmt.month(monthFilter)}
        </div>
        <Table
          columns={[
            { key:"room",   label:"Phòng",    width:80,  render:u => {
              const r = rooms.find(rm => rm.id === u.roomId);
              return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{r?.number}</span>;
            }},
            { key:"type",   label:"Loại",     width:100, render:u => {
              const cfg = UTILITY_CONFIG[u.type];
              return <span style={{ fontSize:12 }}>{cfg.icon} {cfg.label}</span>;
            }},
            { key:"prev",   label:"Chỉ số cũ", width:110, render:u => `${fmt.number(u.previousReading)} ${UTILITY_CONFIG[u.type].unit}`, align:"right" },
            { key:"curr",   label:"Chỉ số mới", width:110, render:u => `${fmt.number(u.currentReading)} ${UTILITY_CONFIG[u.type].unit}`, align:"right" },
            { key:"cons",   label:"Tiêu thụ", width:100,  render:u => <span style={{ fontWeight:600 }}>{u.consumption} {UTILITY_CONFIG[u.type].unit}</span>, align:"right" },
            { key:"price",  label:"Đơn giá",  width:110, render:u => fmt.currency(u.unitPrice), align:"right" },
            { key:"total",  label:"Thành tiền",width:130, render:u => <span style={{ fontWeight:700, color:"#065f46" }}>{fmt.currency(u.totalAmount)}</span>, align:"right" },
            { key:"date",   label:"Ngày ghi",            render:u => <span style={{ fontSize:11, color:BRAND.textMuted }}>{fmt.date(u.recordedAt)}</span> },
          ]}
          data={filtered}
          rowKey={u => u.id}
        />
      </Card>

      {/* Add reading modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Ghi chỉ số điện/nước">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Select label="Phòng" value="" onChange={() => {}}
            options={[{ value:"", label:"— Chọn phòng —" }, ...rooms.filter(r => r.status === "occupied").map(r => ({ value:r.id, label:`Phòng ${r.number}` }))]}
          />
          <Select label="Loại" value="electricity" onChange={() => {}}
            options={[{ value:"electricity", label:"⚡ Điện" }, { value:"water", label:"💧 Nước" }]}
          />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:BRAND.textMuted, display:"block", marginBottom:5 }}>Chỉ số cũ</label>
              <input readOnly value="—" style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:`1px solid ${BRAND.border}`, fontSize:13, background:BRAND.surfaceAlt, boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:BRAND.textMuted, display:"block", marginBottom:5 }}>Chỉ số mới *</label>
              <input placeholder="Nhập chỉ số..." style={{ width:"100%", padding:"8px 12px", borderRadius:8, border:`1.5px solid ${BRAND.accent}`, fontSize:13, outline:"none", boxSizing:"border-box" }} />
            </div>
          </div>
          <div style={{ padding:"10px 12px", background:BRAND.surfaceAlt, borderRadius:9, fontSize:12, color:BRAND.textMuted }}>
            Đơn giá: Điện 3,500đ/kWh · Nước 15,000đ/m³
          </div>
          <div style={{ display:"flex", gap:8, paddingTop:8, borderTop:`1px solid ${BRAND.border}` }}>
            <Button variant="ghost" style={{ flex:1 }} onClick={() => setShowAdd(false)}>Hủy</Button>
            <Button style={{ flex:1 }}>Lưu chỉ số</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
