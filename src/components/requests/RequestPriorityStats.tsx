import { priorityConfig } from "../../constants";
import type { ServiceRequest } from "../../types";

interface RequestPriorityStatsProps {
  requests: ServiceRequest[];
}

const PRIORITY_LABELS: Record<ServiceRequest["priority"], string> = {
  high:   "Khẩn cấp",
  medium: "Trung bình",
  low:    "Thấp",
};

export function RequestPriorityStats({ requests }: RequestPriorityStatsProps) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
      {(["high", "medium", "low"] as ServiceRequest["priority"][]).map((p) => {
        const cfg = priorityConfig[p];
        const count = requests.filter((r) => r.priority === p).length;

        return (
          <div
            key={p}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "14px 18px",
              border: "1px solid #f0f0f0",
              display: "flex",
              gap: 12,
              alignItems: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: cfg.bg,
                color: cfg.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {count}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
                {PRIORITY_LABELS[p]}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>
                yêu cầu đang chờ
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
