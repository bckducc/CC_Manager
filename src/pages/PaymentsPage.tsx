import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini, Avatar, Select } from "../components/ui";
import { PAYMENT_METHOD_CONFIG, INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { payments, invoices, rooms, accounts } from "../data/mockData";
import { fmt } from "../utils";
import type { Payment } from "../types";

export function PaymentsPage() {
  const [search, setSearch]     = useState("");
  const [methodFilter, setMethod] = useState("all");
  const [selected, setSelected] = useState<Payment | null>(null);
  const [month, setMonth]       = useState("");

  const months = ["2026-03","2026-02","2026-01"];

  const totalPaid   = payments.reduce((s, p) => s + p.amount, 0);
  const cashTotal   = payments.filter(p => p.method === "cash").reduce((s, p) => s + p.amount, 0);
  const transferTotal = payments.filter(p => p.method === "transfer").reduce((s, p) => s + p.amount, 0);

  const filtered = payments.filter(p => {
    const room   = rooms.find(r => r.id === p.roomId);
    const tenant = accounts.find(a => a.id === p.tenantId);
    const q = search.toLowerCase();
    const matchSearch = !q || room?.number.includes(q) || tenant?.fullName.toLowerCase().includes(q) || p.transactionRef?.toLowerCase().includes(q);
    const matchMethod = methodFilter === "all" || p.method === methodFilter;
    const matchMonth  = !month || p.paidAt.startsWith(month);
    return matchSearch && matchMethod && matchMonth;
  });

  const sortedPayments = [...filtered].sort((a, b) => b.paidAt.localeCompare(a.paidAt));

  const methodOptions = [
    { value:"all",      label:"Tất cả",          count:payments.length },
    { value:"cash",     label:"💵 Tiền mặt",      count:payments.filter(p => p.method === "cash").length },
    { value:"transfer", label:"🏦 Chuyển khoản",  count:payments.filter(p => p.method === "transfer").length },
    { value:"momo",     label:"💜 MoMo",           count:payments.filter(p => p.method === "momo").length },
    { value:"vnpay",    label:"🔵 VNPay",          count:payments.filter(p => p.method === "vnpay").length },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        <StatMini label="Tổng đã thu"     value={`${(totalPaid/1e6).toFixed(1)}M`}    icon="💰" color="#065f46" bg="#d1fae5" sub="VNĐ" />
        <StatMini label="Tiền mặt"        value={`${(cashTotal/1e6).toFixed(1)}M`}    icon="💵" color="#92400e" bg="#fef3c7" />
        <StatMini label="Chuyển khoản"    value={`${(transferTotal/1e6).toFixed(1)}M`}icon="🏦" color="#1e40af" bg="#dbeafe" />
        <StatMini label="Số giao dịch"    value={payments.length}                      icon="📋" color={BRAND.text} bg="#f3f4f6" />
      </div>

      <Card padding="12px 16px">
        <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <FilterPills options={methodOptions} value={methodFilter} onChange={setMethod} />
            <Select value={month} onChange={setMonth}
              options={[{ value:"", label:"Tất cả tháng" }, ...months.map(m => ({ value:m, label:fmt.month(m) }))]}
              style={{ width:150 }}
            />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Phòng, cư dân, mã GD..." />
            <Button>+ Ghi nhận thanh toán</Button>
          </div>
        </div>
      </Card>

      {/* Summary by method */}
      <Card padding="16px 18px">
        <div style={{ fontWeight:700, fontSize:14, color:BRAND.text, marginBottom:14 }}>Phân bổ theo phương thức</div>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          {Object.entries(PAYMENT_METHOD_CONFIG).map(([method, cfg]) => {
            const methodPayments = payments.filter(p => p.method === method);
            const total = methodPayments.reduce((s, p) => s + p.amount, 0);
            const pct   = totalPaid > 0 ? Math.round(total / totalPaid * 100) : 0;
            return (
              <div key={method} style={{ flex:"1 1 140px", padding:"12px 14px", background:BRAND.surfaceAlt, borderRadius:10 }}>
                <div style={{ fontSize:18, marginBottom:6 }}>{cfg.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:BRAND.text }}>{cfg.label}</div>
                <div style={{ fontSize:14, fontWeight:800, color:BRAND.text, marginTop:4 }}>
                  {total > 0 ? `${(total/1e6).toFixed(1)}M` : "—"}
                </div>
                <div style={{ fontSize:10, color:BRAND.textMuted }}>
                  {methodPayments.length} GD · {pct}%
                </div>
                {total > 0 && (
                  <div style={{ marginTop:6, background:BRAND.border, borderRadius:4, height:4 }}>
                    <div style={{ height:4, borderRadius:4, background:BRAND.accent, width:`${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Table */}
      <Card padding="0">
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${BRAND.border}`, fontWeight:700, fontSize:14, color:BRAND.text }}>
          {sortedPayments.length} giao dịch
        </div>
        <Table
          columns={[
            { key:"id",     label:"Mã GD",    width:80,  render:p => <span style={{ fontSize:11, fontFamily:"monospace", color:BRAND.textMuted }}>{p.id.toUpperCase()}</span> },
            { key:"paidAt", label:"Thời gian",width:140, render:p => <span style={{ fontSize:11 }}>{fmt.datetime(p.paidAt)}</span> },
            { key:"room",   label:"Phòng",    width:80,  render:p => {
              const r = rooms.find(rm => rm.id === p.roomId);
              return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{r?.number}</span>;
            }},
            { key:"tenant", label:"Cư dân",             render:p => {
              const t = accounts.find(a => a.id === p.tenantId);
              return (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {t && <Avatar name={t.fullName} size={24} />}
                  <span style={{ fontSize:12 }}>{t?.fullName || "—"}</span>
                </div>
              );
            }},
            { key:"invoice",label:"Hóa đơn", width:100, render:p => {
              const inv = invoices.find(i => i.id === p.invoiceId);
              return inv
                ? <span style={{ fontSize:11, fontFamily:"monospace", color:BRAND.textMuted }}>{p.invoiceId.toUpperCase()}</span>
                : <span style={{ fontSize:11, color:BRAND.textLight }}>{p.invoiceId}</span>;
            }},
            { key:"amount", label:"Số tiền",  width:130, render:p => (
              <span style={{ fontSize:14, fontWeight:800, color:"#065f46" }}>{fmt.currency(p.amount)}</span>
            ), align:"right"},
            { key:"method", label:"P.thức",   width:140, render:p => {
              const cfg = PAYMENT_METHOD_CONFIG[p.method];
              return <span style={{ fontSize:12 }}>{cfg.icon} {cfg.label}</span>;
            }},
            { key:"ref",    label:"Mã tham chiếu", render:p => (
              <span style={{ fontSize:11, fontFamily:"monospace", color:BRAND.textMuted }}>{p.transactionRef || "—"}</span>
            )},
            { key:"action", label:"",         width:80,  render:p => (
              <Button size="sm" variant="ghost" onClick={() => setSelected(p)}>Chi tiết</Button>
            )},
          ]}
          data={sortedPayments}
          rowKey={p => p.id}
        />
      </Card>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Chi tiết thanh toán" width={480}>
        {selected && (() => {
          const room    = rooms.find(r => r.id === selected.roomId);
          const tenant  = accounts.find(a => a.id === selected.tenantId);
          const invoice = invoices.find(i => i.id === selected.invoiceId);
          const receiver= accounts.find(a => a.id === selected.receivedBy);
          const methodCfg = PAYMENT_METHOD_CONFIG[selected.method];
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Amount hero */}
              <div style={{ textAlign:"center", padding:"20px", background:"#d1fae5", borderRadius:12 }}>
                <div style={{ fontSize:11, color:"#065f46", fontWeight:600, marginBottom:6 }}>SỐ TIỀN THANH TOÁN</div>
                <div style={{ fontSize:32, fontWeight:900, color:"#065f46" }}>{fmt.currency(selected.amount)}</div>
                <div style={{ fontSize:12, color:"#065f46", marginTop:6 }}>{methodCfg.icon} {methodCfg.label}</div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Phòng",          room ? `Phòng ${room.number}` : "—"],
                  ["Cư dân",         tenant?.fullName || "—"],
                  ["Thời gian",      fmt.datetime(selected.paidAt)],
                  ["Hóa đơn",        selected.invoiceId.toUpperCase()],
                  ["Nhận bởi",       receiver?.fullName || "—"],
                  ["Mã tham chiếu",  selected.transactionRef || "—"],
                ].map(([l, v]) => (
                  <div key={l} style={{ padding:"10px 12px", background:BRAND.surfaceAlt, borderRadius:9 }}>
                    <div style={{ fontSize:10, color:BRAND.textMuted, fontWeight:600 }}>{l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:BRAND.text, marginTop:2 }}>{v}</div>
                  </div>
                ))}
              </div>

              {selected.note && (
                <div style={{ padding:"10px 12px", background:"#fffbeb", borderRadius:9, fontSize:12, color:"#92400e" }}>
                  📝 {selected.note}
                </div>
              )}

              {invoice && (
                <div style={{ padding:"10px 14px", background:BRAND.accentSoft, borderRadius:9 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:BRAND.accent, marginBottom:4 }}>Hóa đơn liên quan</div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:BRAND.accent }}>
                    <span>{fmt.month(invoice.month)} · Phòng {room?.number}</span>
                    <span style={{ fontWeight:700 }}>{fmt.currency(invoice.totalAmount)}</span>
                  </div>
                  <div style={{ marginTop:4 }}>
                    <Badge {...INVOICE_STATUS_CONFIG[invoice.status]} size="sm" />
                  </div>
                </div>
              )}

              <div style={{ display:"flex", gap:8, paddingTop:8, borderTop:`1px solid ${BRAND.border}` }}>
                <Button variant="ghost" style={{ flex:1 }}>🖨️ In biên lai</Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
