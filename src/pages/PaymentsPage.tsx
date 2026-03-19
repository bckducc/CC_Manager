import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, StatMini, Avatar, Select } from "../components/ui";
import { PAYMENT_METHOD_CONFIG, INVOICE_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Payment } from "../types";

export function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethod] = useState("all");
  const [selected, setSelected] = useState<Payment | null>(null);
  const [month, setMonth] = useState("");

  const months = [];
  const totalPaid = 0;
  const cashTotal = 0;
  const transferTotal = 0;
  const filtered = [];
  const sortedPayments = [];
  const methodOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng đã thu" value="0M" icon="💰" color="#065f46" bg="#d1fae5" sub="VNĐ" />
      </div>
    </div>
  );
}
