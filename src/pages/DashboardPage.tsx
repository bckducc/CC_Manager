import { Card, StatMini, Badge, Table, Button } from "../components/ui";
import { ROOM_STATUS_CONFIG, INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { rooms, invoices, contracts, serviceRequests, payments } from "../data/mockData";
import { accounts } from "../data/mockData";
import { fmt } from "../utils";
import type { TabId } from "../types";

interface DashboardPageProps { onNavigate: (t: TabId) => void; }

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const totalRooms    = rooms.length;
  const occupied      = rooms.filter(r => r.status === "occupied").length;
  const vacant        = rooms.filter(r => r.status === "vacant").length;
  const maintenance   = rooms.filter(r => r.status === "maintenance").length;
  const occupancyPct  = Math.round((occupied / totalRooms) * 100);

  const monthlyRevenue = invoices
    .filter(i => i.month === "2026-03" && i.status === "paid")
    .reduce((s, i) => s + i.paidAmount, 0);

  const unpaidTotal = invoices
    .filter(i => i.status === "unpaid" || i.status === "overdue")
    .reduce((s, i) => s + (i.totalAmount - i.paidAmount), 0);

  const pendingRequests = serviceRequests.filter(s => s.status === "pending" || s.status === "confirmed").length;

  const recentPayments = [...payments]
    .sort((a, b) => b.paidAt.localeCompare(a.paidAt))
    .slice(0, 5);

  const expiringContracts = contracts.filter(c => {
    if (c.status !== "active") return false;
    const days = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000);
    return days > 0 && days <= 60;
  });

  const overdueInvoices = invoices.filter(i => i.status === "overdue");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <StatMini label="Phòng đang thuê"   value={`${occupied}/${totalRooms}`} icon="🏠" color="#065f46" bg="#d1fae5" sub={`${occupancyPct}% lấp đầy`} />
        <StatMini label="Doanh thu T3/2026" value={`${(monthlyRevenue/1e6).toFixed(1)}M`} icon="💰" color="#1e40af" bg="#dbeafe" sub="VNĐ đã thu" />
        <StatMini label="Công nợ chưa thu"  value={`${(unpaidTotal/1e6).toFixed(1)}M`}  icon="📋" color="#92400e" bg="#fef3c7" sub="Cần xử lý" />
        <StatMini label="Yêu cầu dịch vụ"  value={pendingRequests}                       icon="🔧" color="#7c2d12" bg="#fee2e2" sub="Đang chờ xử lý" />
      </div>

      {/* Occupancy + Alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Occupancy donut-ish */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.text, marginBottom: 16 }}>Trạng thái phòng</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Simple ring */}
            <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.5"
                  strokeDasharray={`${occupancyPct} ${100-occupancyPct}`}
                  strokeLinecap="round" />
              </svg>
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: BRAND.text }}>{occupancyPct}%</div>
                <div style={{ fontSize: 9, color: BRAND.textMuted }}>lấp đầy</div>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {(["occupied","vacant","maintenance","reserved"] as const).map(s => {
                const cfg = ROOM_STATUS_CONFIG[s];
                const cnt = rooms.filter(r => r.status === s).length;
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: BRAND.textMuted, flex: 1 }}>{cfg.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: BRAND.text }}>{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.text, marginBottom: 14 }}>
            Cảnh báo & Nhắc nhở
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {overdueInvoices.map(inv => {
              const room = rooms.find(r => r.id === inv.roomId);
              return (
                <div key={inv.id} style={{
                  padding: "9px 12px", borderRadius: 9,
                  background: "#fff5f5", borderLeft: "3px solid #ef4444",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#991b1b" }}>
                      Phòng {room?.number} — Hóa đơn quá hạn
                    </div>
                    <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>
                      Hạn: {fmt.date(inv.dueDate)} · {fmt.currency(inv.totalAmount - inv.paidAmount)}
                    </div>
                  </div>
                  <Button size="sm" variant="danger" onClick={() => onNavigate("invoices")}>Xem</Button>
                </div>
              );
            })}
            {expiringContracts.slice(0, 3).map(c => {
              const room = rooms.find(r => r.id === c.roomId);
              const days = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000);
              return (
                <div key={c.id} style={{
                  padding: "9px 12px", borderRadius: 9,
                  background: "#fffbeb", borderLeft: "3px solid #f59e0b",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#92400e" }}>
                      Phòng {room?.number} — HĐ hết hạn sau {days} ngày
                    </div>
                    <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>
                      Hết hạn: {fmt.date(c.endDate)}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => onNavigate("contracts")}>Xem</Button>
                </div>
              );
            })}
            {overdueInvoices.length === 0 && expiringContracts.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0", color: BRAND.textLight, fontSize: 12 }}>
                ✓ Không có cảnh báo nào
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent payments + quick room grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>

        {/* Recent payments */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.text }}>Thanh toán gần đây</div>
            <Button size="sm" variant="ghost" onClick={() => onNavigate("payments")}>Xem tất cả</Button>
          </div>
          <Table
            columns={[
              { key: "room",   label: "Phòng",  width: 70, render: p => {
                const r = rooms.find(rm => rm.id === p.roomId);
                return <span style={{ fontWeight: 700, background: BRAND.accentSoft, color: BRAND.accent, padding: "2px 8px", borderRadius: 6, fontSize: 12 }}>P.{r?.number}</span>;
              }},
              { key: "amount", label: "Số tiền", render: p => <span style={{ fontWeight: 700, color: "#065f46" }}>{fmt.currency(p.amount)}</span> },
              { key: "method", label: "P.thức", width: 90, render: p => <span style={{ fontSize: 12, color: BRAND.textMuted }}>{p.method === "cash" ? "Tiền mặt" : p.method === "transfer" ? "CK" : p.method.toUpperCase()}</span> },
              { key: "date",   label: "Thời gian", render: p => <span style={{ fontSize: 11, color: BRAND.textLight }}>{fmt.datetime(p.paidAt).split(" ")[0]}</span> },
            ]}
            data={recentPayments}
            rowKey={p => p.id}
          />
        </Card>

        {/* Room floor map */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.text, marginBottom: 14 }}>Sơ đồ phòng</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[4, 3, 2, 1].map(floor => {
              const floorRooms = rooms.filter(r => r.floor === floor);
              return (
                <div key={floor}>
                  <div style={{ fontSize: 10, color: BRAND.textMuted, fontWeight: 600, marginBottom: 5 }}>TẦNG {floor}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {floorRooms.map(r => {
                      const cfg = ROOM_STATUS_CONFIG[r.status];
                      return (
                        <div key={r.id} title={`Phòng ${r.number} — ${cfg.label}`} style={{
                          width: 42, height: 32, borderRadius: 7,
                          background: cfg.bg, color: cfg.color,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 700, cursor: "pointer",
                          border: `1.5px solid ${cfg.dot}20`,
                          transition: "transform 0.1s",
                        }}
                          onClick={() => onNavigate("rooms")}
                          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)"}
                          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = ""}
                        >{r.number}</div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {(Object.entries(ROOM_STATUS_CONFIG) as [string, typeof ROOM_STATUS_CONFIG[keyof typeof ROOM_STATUS_CONFIG]][]).map(([, cfg]) => (
              <div key={cfg.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: cfg.dot }} />
                <span style={{ fontSize: 10, color: BRAND.textMuted }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
