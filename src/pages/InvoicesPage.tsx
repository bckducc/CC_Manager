import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini, Select } from "../components/ui";
import { INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { invoices, rooms, accounts } from "../data/mockData";
import { fmt } from "../utils";
import type { Invoice, InvoiceStatus } from "../types";

export function InvoicesPage() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [month, setMonth]     = useState("2026-03");
  const [selected, setSelected] = useState<Invoice | null>(null);

  const months = ["2026-03","2026-02","2026-01"];

  const paid    = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.paidAmount, 0);
  const unpaid  = invoices.filter(i => i.status === "unpaid").reduce((s, i) => s + i.totalAmount, 0);
  const overdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + (i.totalAmount - i.paidAmount), 0);
  const partial = invoices.filter(i => i.status === "partial").reduce((s, i) => s + (i.totalAmount - i.paidAmount), 0);

  const filtered = invoices.filter(i => {
    const room   = rooms.find(r => r.id === i.roomId);
    const tenant = accounts.find(a => a.id === i.tenantId);
    const q = search.toLowerCase();
    const matchSearch = !q || room?.number.includes(q) || tenant?.fullName.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
    const matchFilter = filter === "all" || i.status === filter;
    const matchMonth  = !month || i.month === month;
    return matchSearch && matchFilter && matchMonth;
  });

  const filterOptions = [
    { value:"all",     label:"Tất cả",      count:invoices.length },
    { value:"unpaid",  label:"Chưa TT",     count:invoices.filter(i => i.status === "unpaid").length },
    { value:"paid",    label:"Đã TT",       count:invoices.filter(i => i.status === "paid").length },
    { value:"overdue", label:"Quá hạn",     count:invoices.filter(i => i.status === "overdue").length },
    { value:"partial", label:"Một phần",    count:invoices.filter(i => i.status === "partial").length },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        <StatMini label="Đã thu"        value={`${(paid/1e6).toFixed(1)}M`}    icon="✅" color="#065f46" bg="#d1fae5" />
        <StatMini label="Chưa thanh toán" value={`${(unpaid/1e6).toFixed(1)}M`} icon="⏳" color="#92400e" bg="#fef3c7" />
        <StatMini label="Quá hạn"        value={`${(overdue/1e6).toFixed(1)}M`} icon="🔴" color="#7c2d12" bg="#fee2e2" />
        <StatMini label="Thanh toán một phần" value={`${(partial/1e6).toFixed(1)}M`} icon="🔵" color="#1e40af" bg="#dbeafe" />
      </div>

      <Card padding="12px 16px">
        <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <FilterPills options={filterOptions} value={filter} onChange={setFilter} />
            <Select value={month} onChange={setMonth}
              options={[{ value:"", label:"Tất cả tháng" }, ...months.map(m => ({ value:m, label:fmt.month(m) }))]}
              style={{ width:150 }}
            />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Phòng, cư dân..." />
            <Button>+ Tạo hóa đơn</Button>
          </div>
        </div>
      </Card>

      <Card padding="0">
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${BRAND.border}`, fontWeight:700, fontSize:14, color:BRAND.text }}>
          {filtered.length} hóa đơn
        </div>
        <Table
          columns={[
            { key:"id",     label:"Mã HĐ",    width:100, render:i => <span style={{ fontSize:11, fontFamily:"monospace", color:BRAND.textMuted }}>{i.id.toUpperCase()}</span> },
            { key:"room",   label:"Phòng",    width:80,  render:i => {
              const r = rooms.find(rm => rm.id === i.roomId);
              return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{r?.number}</span>;
            }},
            { key:"tenant", label:"Cư dân",             render:i => {
              const t = accounts.find(a => a.id === i.tenantId);
              return <span style={{ fontSize:12 }}>{t?.fullName}</span>;
            }},
            { key:"month",  label:"Tháng",    width:100, render:i => <span style={{ fontSize:12 }}>{fmt.month(i.month)}</span> },
            { key:"issue",  label:"Ngày phát",width:110, render:i => <span style={{ fontSize:11, color:BRAND.textMuted }}>{fmt.date(i.issueDate)}</span> },
            { key:"due",    label:"Hạn TT",   width:110, render:i => {
              const isOver = i.status !== "paid" && new Date(i.dueDate) < new Date();
              return <span style={{ fontSize:11, color:isOver ? "#ef4444" : BRAND.textMuted, fontWeight:isOver ? 700 : 400 }}>{fmt.date(i.dueDate)}</span>;
            }},
            { key:"total",  label:"Tổng tiền", width:130, render:i => <span style={{ fontWeight:700 }}>{fmt.currency(i.totalAmount)}</span>, align:"right" },
            { key:"paid",   label:"Đã TT",    width:120, render:i => <span style={{ color:i.paidAmount > 0 ? "#065f46" : BRAND.textLight }}>{fmt.currency(i.paidAmount)}</span>, align:"right" },
            { key:"status", label:"TT",                  render:i => <Badge {...INVOICE_STATUS_CONFIG[i.status]} /> },
            { key:"action", label:"",         width:130, render:i => (
              <div style={{ display:"flex", gap:5 }}>
                <Button size="sm" variant="ghost" onClick={() => setSelected(i)}>Chi tiết</Button>
                {i.status !== "paid" && <Button size="sm">Thu tiền</Button>}
              </div>
            )},
          ]}
          data={filtered}
          rowKey={i => i.id}
        />
      </Card>

      {/* Invoice detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Chi tiết hóa đơn" width={560}>
        {selected && (() => {
          const room   = rooms.find(r => r.id === selected.roomId);
          const tenant = accounts.find(a => a.id === selected.tenantId);
          const remaining = selected.totalAmount - selected.paidAmount;
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:11, color:BRAND.textMuted, fontFamily:"monospace" }}>{selected.id.toUpperCase()}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:BRAND.text, marginTop:2 }}>Phòng {room?.number} · {fmt.month(selected.month)}</div>
                  <div style={{ fontSize:12, color:BRAND.textMuted }}>{tenant?.fullName}</div>
                </div>
                <Badge {...INVOICE_STATUS_CONFIG[selected.status]} />
              </div>

              {/* Items */}
              <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${BRAND.border}` }}>
                <div style={{ padding:"8px 12px", background:BRAND.surfaceAlt, fontSize:11, fontWeight:700, color:BRAND.textMuted, display:"grid", gridTemplateColumns:"1fr 60px 100px 100px", gap:8 }}>
                  <span>KHOẢN MỤC</span><span style={{ textAlign:"right" }}>SL</span><span style={{ textAlign:"right" }}>ĐƠN GIÁ</span><span style={{ textAlign:"right" }}>THÀNH TIỀN</span>
                </div>
                {selected.items.map((item, i) => (
                  <div key={i} style={{ padding:"9px 12px", borderTop:`1px solid ${BRAND.border}`, fontSize:12, display:"grid", gridTemplateColumns:"1fr 60px 100px 100px", gap:8, alignItems:"center" }}>
                    <span>{item.label}</span>
                    <span style={{ textAlign:"right", color:BRAND.textMuted }}>{item.quantity}</span>
                    <span style={{ textAlign:"right", color:BRAND.textMuted }}>{fmt.currency(item.unitPrice)}</span>
                    <span style={{ textAlign:"right", fontWeight:600 }}>{fmt.currency(item.amount)}</span>
                  </div>
                ))}
                <div style={{ padding:"10px 12px", background:BRAND.surfaceAlt, display:"flex", justifyContent:"space-between", borderTop:`2px solid ${BRAND.border}` }}>
                  <span style={{ fontSize:13, fontWeight:700 }}>TỔNG CỘNG</span>
                  <span style={{ fontSize:15, fontWeight:800, color:BRAND.text }}>{fmt.currency(selected.totalAmount)}</span>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                <div style={{ padding:"10px", background:"#d1fae5", borderRadius:9, textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"#065f46" }}>Đã thanh toán</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#065f46" }}>{fmt.currency(selected.paidAmount)}</div>
                </div>
                <div style={{ padding:"10px", background: remaining > 0 ? "#fee2e2" : BRAND.surfaceAlt, borderRadius:9, textAlign:"center" }}>
                  <div style={{ fontSize:10, color: remaining > 0 ? "#7c2d12" : BRAND.textMuted }}>Còn lại</div>
                  <div style={{ fontSize:13, fontWeight:700, color: remaining > 0 ? "#7c2d12" : BRAND.textMuted }}>{fmt.currency(remaining)}</div>
                </div>
                <div style={{ padding:"10px", background:BRAND.surfaceAlt, borderRadius:9, textAlign:"center" }}>
                  <div style={{ fontSize:10, color:BRAND.textMuted }}>Hạn TT</div>
                  <div style={{ fontSize:13, fontWeight:700, color:BRAND.text }}>{fmt.date(selected.dueDate)}</div>
                </div>
              </div>

              <div style={{ display:"flex", gap:8, paddingTop:8, borderTop:`1px solid ${BRAND.border}` }}>
                <Button variant="ghost" style={{ flex:1 }}>🖨️ In hóa đơn</Button>
                {selected.status !== "paid" && <Button style={{ flex:1 }}>💳 Thu tiền</Button>}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
