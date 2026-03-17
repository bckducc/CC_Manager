import type { TabId, Account } from "../../types";
import { NAV_ITEMS, BRAND } from "../../constants";
import { Avatar } from "../ui";

// ─── Sidebar ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  active: TabId;
  onNavigate: (t: TabId) => void;
  onLogout: () => void;
}

export function Sidebar({ active, onNavigate, onLogout }: SidebarProps) {
  const groups = [
    { id: "main",    label: "Quản lý" },
    { id: "finance", label: "Tài chính" },
    { id: "admin",   label: "Hệ thống" },
  ] as const;

  return (
    <aside style={{
      width: 226, flexShrink: 0,
      background: BRAND.primary,
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 18px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "#2563eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, flexShrink: 0,
          }}>🏢</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.02em" }}>MiniApart</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginTop: 1 }}>Hệ thống quản lý</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px" }}>
        {groups.map(grp => {
          const items = NAV_ITEMS.filter(n => n.group === grp.id);
          return (
            <div key={grp.id} style={{ marginBottom: 6 }}>
              <div style={{
                fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "10px 10px 5px",
              }}>{grp.label}</div>
              {items.map(item => {
                const isActive = active === item.id;
                return (
                  <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                    display: "flex", alignItems: "center", gap: 9,
                    width: "100%", padding: "9px 10px", borderRadius: 8,
                    border: "none", cursor: "pointer", marginBottom: 1,
                    background: isActive ? "rgba(37,99,235,0.25)" : "transparent",
                    color: isActive ? "#93c5fd" : "rgba(255,255,255,0.55)",
                    fontWeight: isActive ? 600 : 400, fontSize: 13, textAlign: "left",
                    fontFamily: "inherit",
                    borderLeft: `3px solid ${isActive ? "#3b82f6" : "transparent"}`,
                    transition: "all 0.12s",
                  }}>
                    <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User + logout */}
      <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={onLogout} style={{
          display: "flex", alignItems: "center", gap: 8,
          width: "100%", padding: "8px 10px", borderRadius: 8,
          border: "none", cursor: "pointer", background: "transparent",
          color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "inherit",
          transition: "all 0.12s",
        }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
        >
          <span style={{ fontSize: 15 }}>🚪</span> Đăng xuất
        </button>
      </div>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
const TAB_LABELS: Record<TabId, string> = {
  dashboard:  "Tổng quan",
  rooms:      "Quản lý phòng",
  contracts:  "Hợp đồng thuê",
  utilities:  "Điện - Nước",
  invoices:   "Hóa đơn",
  payments:   "Lịch sử thanh toán",
  services:   "Dịch vụ",
  accounts:   "Tài khoản",
};

interface HeaderProps {
  active: TabId;
  notifCount: number;
  user: Account;
  onLogout: () => void;
}

export function Header({ active, notifCount, user, onLogout }: HeaderProps) {
  return (
    <header style={{
      background: BRAND.surface, borderBottom: `1px solid ${BRAND.border}`,
      padding: "12px 26px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: BRAND.text, letterSpacing: "-0.02em" }}>
          {TAB_LABELS[active]}
        </h1>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: BRAND.textMuted }}>
          Thứ Hai, 16/03/2026 · Mini Tower, 123 Đường ABC, Quận 1, TP.HCM
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button style={{
            width: 36, height: 36, borderRadius: 9, border: `1px solid ${BRAND.border}`,
            background: BRAND.surface, cursor: "pointer", fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>🔔</button>
          {notifCount > 0 && (
            <span style={{
              position: "absolute", top: -3, right: -3,
              background: "#ef4444", color: "#fff",
              width: 16, height: 16, borderRadius: "50%",
              fontSize: 9, fontWeight: 700, display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>{notifCount}</span>
          )}
        </div>

        {/* User chip */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "5px 10px 5px 5px",
          borderRadius: 24, border: `1px solid ${BRAND.border}`,
          background: BRAND.surface, cursor: "pointer",
        }}>
          <Avatar name={user.fullName} size={26} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: BRAND.text, lineHeight: 1.2 }}>{user.fullName.split(" ").slice(-1)[0]}</div>
            <div style={{ fontSize: 10, color: BRAND.textMuted, lineHeight: 1 }}>
              {user.role === "admin" ? "Quản trị" : user.role === "staff" ? "Nhân viên" : "Cư dân"}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button onClick={onLogout} title="Đăng xuất" style={{
          width: 36, height: 36, borderRadius: 9, border: `1px solid ${BRAND.border}`,
          background: BRAND.surface, cursor: "pointer", fontSize: 15,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: BRAND.textMuted, transition: "all 0.15s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fee2e2"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#fecaca"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = BRAND.surface; (e.currentTarget as HTMLButtonElement).style.borderColor = BRAND.border; }}
        >🚪</button>
      </div>
    </header>
  );
}
