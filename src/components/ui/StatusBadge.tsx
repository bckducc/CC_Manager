import { statusConfig } from "../../constants";

type ApartmentStatus = "occupied" | "vacant" | "maintenance";

export function StatusBadge({ status }: { status: ApartmentStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: 20,
        background: cfg.bg,
        color: cfg.color,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cfg.dot,
          display: "inline-block",
        }}
      />
      {cfg.label}
    </span>
  );
}
