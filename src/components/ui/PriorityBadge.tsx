import { priorityConfig } from "../../constants";
import type { ServiceRequest } from "../../types";

interface PriorityBadgeProps {
  priority: ServiceRequest["priority"];
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const cfg = priorityConfig[priority];

  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 12,
        background: cfg.bg,
        color: cfg.color,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {cfg.label}
    </span>
  );
}
