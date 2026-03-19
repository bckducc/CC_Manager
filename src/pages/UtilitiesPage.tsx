import { useState } from "react";
import { Card, Badge, Button, FilterPills, Modal, Table, StatMini, Select } from "../components/ui";
import { UTILITY_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { UtilityReading, UtilityType } from "../types";

export function UtilitiesPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | UtilityType>("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [selected, setSelected] = useState<UtilityReading | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const months = [];
  const monthReadings = [];
  const filtered = [];
  const totalElec = 0;
  const totalWater = 0;
  const totalElecKwh = 0;
  const totalWaterM3 = 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng tiền điện" value="0M" icon="⚡" color="#92400e" bg="#fef3c7" sub="0 kWh" />
      </div>
    </div>
  );
}
