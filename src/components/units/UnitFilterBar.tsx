import type { ApartmentUnit, FilterStatus } from "../../types";

interface UnitFilterBarProps {
  filterStatus: FilterStatus;
  units: ApartmentUnit[];
  onChange: (status: FilterStatus) => void;
}

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all",         label: "Tất cả"    },
  { value: "occupied",    label: "Đang thuê" },
  { value: "vacant",      label: "Trống"     },
  { value: "maintenance", label: "Bảo trì"   },
];

export function UnitFilterBar({ filterStatus, units, onChange }: UnitFilterBarProps) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
      {FILTER_OPTIONS.map((opt) => {
        const count =
          opt.value === "all"
            ? units.length
            : units.filter((u) => u.status === opt.value).length;
        const isActive = filterStatus === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "7px 16px",
              borderRadius: 20,
              border: isActive ? "none" : "1.5px solid #e5e7eb",
              background: isActive ? "#1a2744" : "#fff",
              color: isActive ? "#fff" : "#6b7280",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {opt.label}
            <span
              style={{
                marginLeft: 6,
                background: isActive ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                color: isActive ? "#fff" : "#9ca3af",
                padding: "1px 7px",
                borderRadius: 10,
                fontSize: 10,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
