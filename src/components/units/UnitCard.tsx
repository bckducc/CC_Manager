import { Avatar, StatusBadge } from "../ui";
import { statusConfig } from "../../constants";
import type { ApartmentUnit } from "../../types";

interface UnitCardProps {
  unit: ApartmentUnit;
}

export function UnitCard({ unit }: UnitCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 18,
        border: "1px solid #f0f0f0",
        borderTop: `3px solid ${statusConfig[unit.status].dot}`,
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1a2744" }}>
            Phòng {unit.room}
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Tầng {unit.floor}</div>
        </div>
        <StatusBadge status={unit.status} />
      </div>

      {/* Tenant info */}
      {unit.status === "occupied" && unit.tenant ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            padding: "10px 12px",
            background: "#f8f7f4",
            borderRadius: 10,
          }}
        >
          <Avatar name={unit.tenant} size={30} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
              {unit.tenant}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>Cư dân</div>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "10px 12px",
            background: "#f8f7f4",
            borderRadius: 10,
            marginBottom: 12,
            textAlign: "center",
            color: "#9ca3af",
            fontSize: 12,
          }}
        >
          {unit.status === "vacant" ? "Chưa có cư dân" : "Đang bảo trì"}
        </div>
      )}

      {/* Rent + Due date */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1a2744" }}>
            {unit.rent.toLocaleString("vi-VN")}đ
          </div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>/ tháng</div>
        </div>
        {unit.dueDate && (
          <div style={{ fontSize: 10, color: "#6b7280", textAlign: "right" }}>
            Hạn:{" "}
            <strong>
              {new Date(unit.dueDate).toLocaleDateString("vi-VN")}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
