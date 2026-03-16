import type { TabType } from "../../types";

interface HeaderProps {
  activeTab: TabType;
  notificationCount: number;
}

const TAB_TITLES: Record<TabType, string> = {
  overview: "Tổng quan hệ thống",
  units:    "Danh sách căn hộ",
  requests: "Yêu cầu dịch vụ",
};

export function Header({ activeTab, notificationCount }: HeaderProps) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111" }}>
          {TAB_TITLES[activeTab]}
        </h1>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>
          Thứ Hai, 16 tháng 3, 2026 · Chung cư Mini Tower
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              background: "#f3f4f6",
              border: "none",
              borderRadius: 10,
              width: 38,
              height: 38,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            🔔
          </button>
          {notificationCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                background: "#ef4444",
                color: "#fff",
                width: 16,
                height: 16,
                borderRadius: "50%",
                fontSize: 9,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          style={{
            background: "#1a2744",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          + Thêm mới
        </button>
      </div>
    </header>
  );
}
