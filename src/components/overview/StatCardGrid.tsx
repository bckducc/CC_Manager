import type { StatCard } from "../../types";

interface StatCardGridProps {
  stats: StatCard[];
}

export function StatCardGrid({ stats }: StatCardGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "18px 20px",
            border: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: s.bg,
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.icon}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
              {s.label}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
              {s.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
