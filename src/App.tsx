import { useState } from "react";
import { Sidebar, Header } from "./components/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { RoomsPage }     from "./pages/RoomsPage";
import { ContractsPage } from "./pages/ContractsPage";
import { UtilitiesPage } from "./pages/UtilitiesPage";
import { InvoicesPage }  from "./pages/InvoicesPage";
import { ServicesPage }  from "./pages/ServicesPage";
import { AccountsPage }  from "./pages/AccountsPage";
import { PaymentsPage }  from "./pages/PaymentsPage";
import { BRAND } from "./constants";
import type { TabId } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  const pageMap: Record<TabId, JSX.Element> = {
    dashboard: <DashboardPage onNavigate={setActiveTab} />,
    rooms:     <RoomsPage />,
    contracts: <ContractsPage />,
    utilities: <UtilitiesPage />,
    invoices:  <InvoicesPage />,
    services:  <ServicesPage />,
    accounts:  <AccountsPage />,
    payments:  <PaymentsPage />,
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; height: 100%; }
        body {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
          background: ${BRAND.surfaceAlt};
          color: ${BRAND.text};
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        input:focus, select:focus { outline: none; border-color: ${BRAND.accent} !important; box-shadow: 0 0 0 3px ${BRAND.accentSoft}; }
        button { font-family: inherit; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar active={activeTab} onNavigate={setActiveTab} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Header active={activeTab} notifCount={3} />

          <main style={{
            flex: 1, overflowY: "auto", padding: "22px 26px",
          }}>
            {pageMap[activeTab]}
          </main>
        </div>
      </div>
    </>
  );
}
