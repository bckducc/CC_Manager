import { PriorityBadge } from "../ui";
import type { ServiceRequest, TabType } from "../../types";

interface RecentRequestsTableProps {
  requests: ServiceRequest[];
  onViewAll: (tab: TabType) => void;
}

export function RecentRequestsTable({ requests, onViewAll }: RecentRequestsTableProps) {
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
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Yêu cầu dịch vụ gần đây
        <button
          onClick={() => onViewAll("requests")}
          style={{
            background: "none",
            border: "none",
            color: "#3b82f6",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Xem tất cả →
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
            {["Phòng", "Vấn đề", "Độ ưu tiên", "Ngày"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  fontSize: 11,
                  color: "#9ca3af",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} style={{ borderBottom: "1px solid #f9fafb" }}>
              <td style={{ padding: "10px 12px" }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#1a2744",
                    background: "#eff6ff",
                    padding: "2px 8px",
                    borderRadius: 6,
                  }}
                >
                  P.{req.unit}
                </span>
              </td>
              <td style={{ padding: "10px 12px", fontSize: 13, color: "#374151" }}>
                {req.issue}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <PriorityBadge priority={req.priority} />
              </td>
              <td style={{ padding: "10px 12px", fontSize: 12, color: "#9ca3af" }}>
                {req.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
