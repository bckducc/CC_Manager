import { Avatar } from "../ui";
import type { TabType } from "../../types";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const NAV_ITEMS: { icon: string; label: string; tab: TabType }[] = [
  { icon: "📊", label: "Tổng quan",        tab: "overview" },
  { icon: "🏢", label: "Căn hộ",           tab: "units" },
  { icon: "🔧", label: "Yêu cầu dịch vụ", tab: "requests" },
];

const EXTRA_ITEMS = [
  { icon: "👤", label: "Cư dân" },
  { icon: "💰", label: "Thu chi" },
  { icon: "📄", label: "Hợp đồng" },
  { icon: "⚙️", label: "Cài đặt" },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: "#1a2744",
        display: "flex",
        flexDirection: "column",
        padding: "0 0 24px",
        position: "fixed",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#3b82f6",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🏠
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
              MiniApart
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
              Quản lý chung cư
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              marginBottom: 2,
              background:
                activeTab === item.tab ? "rgba(59,130,246,0.2)" : "transparent",
              color:
                activeTab === item.tab
                  ? "#60a5fa"
                  : "rgba(255,255,255,0.6)",
              fontWeight: activeTab === item.tab ? 600 : 400,
              fontSize: 13,
              textAlign: "left",
              borderLeft:
                activeTab === item.tab
                  ? "3px solid #3b82f6"
                  : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {EXTRA_ITEMS.map((item) => (
            <button
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                marginBottom: 2,
                background: "transparent",
                color: "rgba(255,255,255,0.45)",
                fontSize: 13,
                textAlign: "left",
                borderLeft: "3px solid transparent",
              }}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* User */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar name="Quản Lý Admin" size={32} />
        <div>
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Quản lý</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Admin</div>
        </div>
      </div>
    </aside>
  );
}
