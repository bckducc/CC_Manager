import { statusConfig } from "../../constants";
import type { ApartmentUnit } from "../../types";

interface OccupancyPanelProps {
  units: ApartmentUnit[];
}

export function OccupancyPanel({ units }: OccupancyPanelProps) {
  const occupiedCount = units.filter((u) => u.status === "occupied").length;
  const occupancyPct = Math.round((occupiedCount / units.length) * 100);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 20,
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: "#111" }}>
        Tỷ lệ lấp đầy
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 13, color: "#6b7280" }}>Đang thuê / Tổng</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>
          {occupiedCount} / {units.length}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          background: "#f3f4f6",
          borderRadius: 8,
          height: 10,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: `${occupancyPct}%`,
            height: "100%",
            background: "linear-gradient(90deg, #1a2744, #3b82f6)",
            borderRadius: 8,
            transition: "width 0.6s ease",
          }}
        />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12 }}>
        {(Object.entries(statusConfig) as [ApartmentUnit["status"], typeof statusConfig[keyof typeof statusConfig]][]).map(
          ([key, cfg]) => {
            const count = units.filter((u) => u.status === key).length;
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: cfg.dot,
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: 11, color: "#6b7280" }}>
                  {cfg.label}: <strong>{count}</strong>
                </span>
              </div>
            );
          }
        )}
      </div>

      {/* Big number */}
      <div
        style={{
          marginTop: 16,
          padding: "12px 16px",
          background: "#f8f7f4",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#1a2744",
            textAlign: "center",
          }}
        >
          {occupancyPct}%
        </div>
        <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
          Tỷ lệ lấp đầy tháng 3
        </div>
      </div>
    </div>
  );
}
