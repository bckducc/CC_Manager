import { notifConfig } from "../../constants";
import type { Notification } from "../../types";

interface NotificationsPanelProps {
  notifications: Notification[];
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 20,
        border: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 14,
          color: "#111",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Thông báo
        <span
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {notifications.length} mới
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map((n) => {
          const cfg = notifConfig[n.type];
          return (
            <div
              key={n.id}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                padding: "9px 12px",
                borderRadius: 10,
                background: cfg.bg,
                borderLeft: `3px solid ${cfg.border}`,
              }}
            >
              <span style={{ fontSize: 14 }}>{cfg.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
                  {n.message}
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>
                  {n.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
