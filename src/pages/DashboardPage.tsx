import { Card, StatMini, Badge, Table, Button } from "../components/ui";
import { ROOM_STATUS_CONFIG, INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { TabId } from "../types";

interface DashboardPageProps { onNavigate: (t: TabId) => void; }

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const totalRooms = 0;
  const occupied = 0;
  const vacant = 0;
  const maintenance = 0;
  const occupancyPct = 0;
  const monthlyRevenue = 0;
  const unpaidTotal = 0;
  const pendingRequests = 0;
  const recentPayments = [];
  const expiringContracts = [];
  const overdueInvoices = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <StatMini label="Phòng đang thuê" value="0/0" icon="🏠" color="#065f46" bg="#d1fae5" sub="0% lấp đầy" />
      </div>
    </div>
  );
}
