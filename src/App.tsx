import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthPage }        from "./pages/auth/AuthPage";
import { Sidebar, Header } from "./components/layout";
import { DashboardPage }   from "./pages/DashboardPage";
import { RoomsPage }       from "./pages/RoomsPage";
import { ContractsPage }   from "./pages/ContractsPage";
import { UtilitiesPage }   from "./pages/UtilitiesPage";
import { InvoicesPage }    from "./pages/InvoicesPage";
import { ServicesPage }    from "./pages/ServicesPage";
import { AccountsPage }    from "./pages/AccountsPage";
import { PaymentsPage }    from "./pages/PaymentsPage";
import { BRAND } from "./constants";
import type { TabId } from "./types";

// ─── Authenticated shell ──────────────────────────────────────────────────────
function AppShell() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  // Not logged in → show auth page (login / register / forgot)
  if (!user) {
    return <AuthPage />;
  }

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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar active={activeTab} onNavigate={setActiveTab} onLogout={logout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header active={activeTab} notifCount={3} user={user} onLogout={logout} />
        <main style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>
          {pageMap[activeTab]}
        </main>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root      { margin: 0; padding: 0; height: 100%; }
        body {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
          background: ${BRAND.surfaceAlt};
          color: ${BRAND.text};
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar       { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        button { font-family: inherit; }
      `}</style>

      {/* AuthProvider wraps everything — useAuth() works anywhere inside */}
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </>
  );
}
