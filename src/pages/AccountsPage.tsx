import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini, Avatar } from "../components/ui";
import { ACCOUNT_ROLE_CONFIG, ACCOUNT_STATUS_CONFIG, BRAND } from "../constants";
import { fmt } from "../utils";
import type { Account } from "../types";

export function AccountsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRole] = useState("all");
  const [statusFilter, setStatus] = useState("all");
  const [selected, setSelected] = useState<Account | null>(null);

  const adminCount = 0;
  const staffCount = 0;
  const tenantCount = 0;
  const activeCount = 0;
  const filtered = [];
  const roleOptions = [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatMini label="Tổng tài khoản" value={0} icon="👥" color={BRAND.text} bg="#f3f4f6" />
      </div>
    </div>
  );
}
