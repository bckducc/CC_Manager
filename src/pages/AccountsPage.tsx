import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini, Avatar } from "../components/ui";
import { ACCOUNT_ROLE_CONFIG, ACCOUNT_STATUS_CONFIG, BRAND } from "../constants";
import { accounts, rooms, contracts } from "../data/mockData";
import { fmt } from "../utils";
import type { Account } from "../types";

export function AccountsPage() {
  const [search, setSearch]     = useState("");
  const [roleFilter, setRole]   = useState("all");
  const [statusFilter, setStatus] = useState("all");
  const [selected, setSelected] = useState<Account | null>(null);

  const adminCount  = accounts.filter(a => a.role === "admin").length;
  const staffCount  = accounts.filter(a => a.role === "staff").length;
  const tenantCount = accounts.filter(a => a.role === "tenant").length;
  const activeCount = accounts.filter(a => a.status === "active").length;

  const filtered = accounts.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.fullName.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.phone.includes(q);
    const matchRole   = roleFilter === "all"   || a.role === roleFilter;
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const roleOptions = [
    { value:"all",    label:"Tất cả",    count:accounts.length },
    { value:"admin",  label:"Quản trị",  count:adminCount },
    { value:"staff",  label:"Nhân viên", count:staffCount },
    { value:"tenant", label:"Cư dân",    count:tenantCount },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        <StatMini label="Tổng tài khoản" value={accounts.length}  icon="👥" color={BRAND.text}   bg="#f3f4f6" />
        <StatMini label="Quản trị & NV"  value={adminCount + staffCount} icon="👔" color="#4c1d95" bg="#ede9fe" />
        <StatMini label="Cư dân"         value={tenantCount}       icon="🏠" color="#065f46" bg="#d1fae5" />
        <StatMini label="Đang hoạt động" value={activeCount}       icon="✅" color="#1e40af" bg="#dbeafe" />
      </div>

      <Card padding="12px 16px">
        <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <FilterPills options={roleOptions} value={roleFilter} onChange={setRole} />
            <FilterPills
              options={[
                { value:"all",       label:"Mọi trạng thái" },
                { value:"active",    label:"Hoạt động" },
                { value:"inactive",  label:"Không HĐ" },
                { value:"suspended", label:"Bị khóa" },
              ]}
              value={statusFilter}
              onChange={setStatus}
            />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Tên, email, SĐT..." />
            <Button>+ Tạo tài khoản</Button>
          </div>
        </div>
      </Card>

      <Card padding="0">
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${BRAND.border}`, fontWeight:700, fontSize:14, color:BRAND.text }}>
          {filtered.length} tài khoản
        </div>
        <Table
          columns={[
            { key:"user",   label:"Người dùng",          render:a => (
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Avatar name={a.fullName} size={32} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{a.fullName}</div>
                  <div style={{ fontSize:11, color:BRAND.textMuted }}>{a.email}</div>
                </div>
              </div>
            )},
            { key:"phone",  label:"Điện thoại", width:130, render:a => <span style={{ fontSize:12 }}>{a.phone}</span> },
            { key:"role",   label:"Vai trò",    width:110, render:a => <Badge {...ACCOUNT_ROLE_CONFIG[a.role]} /> },
            { key:"room",   label:"Phòng",      width:80,  render:a => {
              if (!a.roomId) return <span style={{ color:BRAND.textLight, fontSize:12 }}>—</span>;
              const r = rooms.find(rm => rm.id === a.roomId);
              return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{r?.number}</span>;
            }},
            { key:"status", label:"Trạng thái",           render:a => <Badge {...ACCOUNT_STATUS_CONFIG[a.status]} dot={ACCOUNT_STATUS_CONFIG[a.status].dot} /> },
            { key:"login",  label:"Đăng nhập cuối", width:140, render:a => (
              <span style={{ fontSize:11, color:BRAND.textMuted }}>{a.lastLogin ? fmt.date(a.lastLogin) : "—"}</span>
            )},
            { key:"joined", label:"Ngày tạo",  width:110, render:a => <span style={{ fontSize:11, color:BRAND.textLight }}>{fmt.date(a.createdAt)}</span> },
            { key:"action", label:"",          width:120, render:a => (
              <div style={{ display:"flex", gap:5 }}>
                <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>Chi tiết</Button>
              </div>
            )},
          ]}
          data={filtered}
          rowKey={a => a.id}
        />
      </Card>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Chi tiết tài khoản" width={540}>
        {selected && (() => {
          const room     = rooms.find(r => r.id === selected.roomId);
          const contract = contracts.find(c => c.tenantId === selected.id && c.status === "active");
          return (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Profile */}
              <div style={{ display:"flex", alignItems:"center", gap:16, padding:"16px", background:BRAND.surfaceAlt, borderRadius:12 }}>
                <Avatar name={selected.fullName} size={56} />
                <div>
                  <div style={{ fontSize:17, fontWeight:800, color:BRAND.text }}>{selected.fullName}</div>
                  <div style={{ fontSize:12, color:BRAND.textMuted, marginTop:2 }}>{selected.email}</div>
                  <div style={{ display:"flex", gap:8, marginTop:8 }}>
                    <Badge {...ACCOUNT_ROLE_CONFIG[selected.role]} />
                    <Badge {...ACCOUNT_STATUS_CONFIG[selected.status]} dot={ACCOUNT_STATUS_CONFIG[selected.status].dot} />
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Số điện thoại", selected.phone],
                  ["Giới tính",     selected.gender === "male" ? "Nam" : selected.gender === "female" ? "Nữ" : "Khác"],
                  ["Ngày sinh",     selected.dob ? fmt.date(selected.dob) : "—"],
                  ["CCCD/CMND",     selected.idNumber || "—"],
                  ["Địa chỉ gốc",   selected.address || "—"],
                  ["Phòng hiện tại",room ? `Phòng ${room.number}, Tầng ${room.floor}` : "—"],
                  ["Ngày tạo TK",   fmt.date(selected.createdAt)],
                  ["Đăng nhập cuối",selected.lastLogin ? fmt.date(selected.lastLogin) : "—"],
                ].map(([l, v]) => (
                  <div key={l} style={{ padding:"10px 12px", background:BRAND.surfaceAlt, borderRadius:9 }}>
                    <div style={{ fontSize:10, color:BRAND.textMuted, fontWeight:600 }}>{l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:BRAND.text, marginTop:2 }}>{v}</div>
                  </div>
                ))}
              </div>

              {contract && (
                <div style={{ padding:"10px 14px", background:"#d1fae5", borderRadius:9 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#065f46", marginBottom:4 }}>Hợp đồng hiện tại</div>
                  <div style={{ fontSize:12, color:"#065f46" }}>
                    {fmt.date(contract.startDate)} → {fmt.date(contract.endDate)} · {fmt.currency(contract.monthlyRent)}/tháng
                  </div>
                </div>
              )}

              <div style={{ display:"flex", gap:8, paddingTop:8, borderTop:`1px solid ${BRAND.border}` }}>
                <Button style={{ flex:1 }}>✏️ Chỉnh sửa</Button>
                {selected.status === "active"
                  ? <Button variant="danger" style={{ flex:1 }}>🔒 Khóa tài khoản</Button>
                  : <Button variant="outline" style={{ flex:1 }}>🔓 Mở tài khoản</Button>
                }
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
