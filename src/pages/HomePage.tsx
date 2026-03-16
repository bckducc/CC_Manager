import { useState } from "react";
import { Sidebar, Header } from "../components/layouts";
import { OverviewPage } from "./OverviewPage";
import { UnitsPage } from "./UnitsPage";
import { RequestsPage } from "./RequestsPage";
import { notifications } from "../data/mockData";
import type { TabType } from "../types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        background: "#f8f7f4",
        minHeight: "100vh",
        color: "#1a1a1a",
      }}
    >
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header
            activeTab={activeTab}
            notificationCount={notifications.length}
          />

          <main style={{ flex: 1, overflowY: "auto" }}>
            <div style={{ padding: 24 }}>
              {activeTab === "overview" && (
                <OverviewPage onTabChange={setActiveTab} />
              )}
              {activeTab === "units" && <UnitsPage />}
              {activeTab === "requests" && <RequestsPage />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
