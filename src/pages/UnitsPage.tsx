import { useState } from "react";
import { UnitCard, UnitFilterBar } from "../components/units";
import { units } from "../data/mockData";
import type { FilterStatus } from "../types";

export function UnitsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredUnits =
    filterStatus === "all"
      ? units
      : units.filter((u) => u.status === filterStatus);

  return (
    <div>
      <UnitFilterBar
        filterStatus={filterStatus}
        units={units}
        onChange={setFilterStatus}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        {filteredUnits.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
