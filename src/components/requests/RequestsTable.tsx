import { Avatar, PriorityBadge } from "../ui";
import type { ServiceRequest } from "../../types";

interface RequestsTableProps {
  requests: ServiceRequest[];
}

const TABLE_HEADERS = ["#", "Phòng", "Cư dân", "Vấn đề", "Độ ưu tiên", "Ngày tạo", "Thao tác"];

export function RequestsTable({ requests }: RequestsTableProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 20,
        border: "1px solid #f0f0f0",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
            {TABLE_HEADERS.map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 14px",
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
            <tr
              key={req.id}
              style={{ borderBottom: "1px solid #f9fafb" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#fafafa")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "")
              }
            >
              <td style={{ padding: "12px 14px", fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>
                #{req.id.toString().padStart(3, "0")}
              </td>

              <td style={{ padding: "12px 14px" }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#1a2744",
                    background: "#eff6ff",
                    padding: "3px 10px",
                    borderRadius: 8,
                  }}
                >
                  P.{req.unit}
                </span>
              </td>

              <td style={{ padding: "12px 14px" }}>
                {req.tenant !== "—" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={req.tenant} size={26} />
                    <span style={{ fontSize: 12, color: "#374151" }}>{req.tenant}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>—</span>
                )}
              </td>

              <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>
                {req.issue}
              </td>

              <td style={{ padding: "12px 14px" }}>
                <PriorityBadge priority={req.priority} />
              </td>

              <td style={{ padding: "12px 14px", fontSize: 12, color: "#9ca3af" }}>
                {req.date}/2026
              </td>

              <td style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    style={{
                      background: "#dcfce7",
                      color: "#14532d",
                      border: "none",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ✓ Xử lý
                  </button>
                  <button
                    style={{
                      background: "#f3f4f6",
                      color: "#6b7280",
                      border: "none",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Chi tiết
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
