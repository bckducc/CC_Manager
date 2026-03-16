import { StatCardGrid, OccupancyPanel, NotificationsPanel, RecentRequestsTable } from "../components/overview";
import { stats, units, notifications, serviceRequests } from "../data/mockData";
import type { TabType } from "../types";

interface OverviewPageProps {
  onTabChange: (tab: TabType) => void;
}

export function OverviewPage({ onTabChange }: OverviewPageProps) {
  return (
    <div>
      <StatCardGrid stats={stats} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <OccupancyPanel units={units} />
        <NotificationsPanel notifications={notifications} />
      </div>

      <RecentRequestsTable
        requests={serviceRequests}
        onViewAll={onTabChange}
      />
    </div>
  );
}
