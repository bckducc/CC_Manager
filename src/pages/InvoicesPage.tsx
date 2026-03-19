import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini, Select } from "../components/ui";
import { INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Invoice, InvoiceStatus } from "../types";

export function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [month, setMonth] = useState("");
  const [selected, setSelected] = useState<Invoice | null>(null);

  const months = [];
  const paid = 0;
  const unpaid = 0;
  const overdue = 0;
  const partial = 0;
  const filtered = [];
  const filterOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Đã thu" value="0M" icon="✅" color="#065f46" bg="#d1fae5" />
      </div>
    </div>
  );
}
