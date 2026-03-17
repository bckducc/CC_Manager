import { useState } from "react";
import { Card, Badge, Button, SearchBar, FilterPills, Modal, Table, StatMini } from "../components/ui";
import { SERVICE_CATEGORY_CONFIG, SERVICE_STATUS_CONFIG, BRAND } from "../constants";
import { services, serviceRequests, rooms, accounts } from "../data/mockData";
import { fmt } from "../utils";
import type { Service, ServiceRequest } from "../types";

const REQUEST_STATUS_CONFIG = {
  pending:    { label:"Chờ xử lý",  color:"#92400e", bg:"#fef3c7", dot:"#f59e0b" },
  confirmed:  { label:"Đã xác nhận",color:"#1e40af", bg:"#dbeafe", dot:"#3b82f6" },
  inprogress: { label:"Đang làm",   color:"#4c1d95", bg:"#ede9fe", dot:"#8b5cf6" },
  completed:  { label:"Hoàn thành", color:"#065f46", bg:"#d1fae5", dot:"#10b981" },
  cancelled:  { label:"Đã hủy",     color:"#374151", bg:"#f3f4f6", dot:"#9ca3af" },
} as const;

export function ServicesPage() {
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("all");
  const [reqFilter, setReqFilter]   = useState("all");
  const [tab, setTab]               = useState<"services" | "requests">("services");
  const [selectedSvc, setSelectedSvc] = useState<Service | null>(null);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);

  const pendingCount   = serviceRequests.filter(r => r.status === "pending").length;
  const confirmedCount = serviceRequests.filter(r => r.status === "confirmed" || r.status === "inprogress").length;
  const completedCount = serviceRequests.filter(r => r.status === "completed").length;

  const filteredServices = services.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q);
    const matchCat    = catFilter === "all" || s.category === catFilter;
    return matchSearch && matchCat;
  });

  const filteredRequests = serviceRequests.filter(r => {
    const matchFilter = reqFilter === "all" || r.status === reqFilter;
    return matchFilter;
  });

  const catOptions = [
    { value:"all", label:"Tất cả" },
    ...Object.entries(SERVICE_CATEGORY_CONFIG).map(([v, cfg]) => ({ value:v, label:`${cfg.icon} ${cfg.label}` })),
  ];

  const reqOptions = [
    { value:"all",        label:"Tất cả", count:serviceRequests.length },
    { value:"pending",    label:"Chờ",    count:pendingCount },
    { value:"confirmed",  label:"Đã xác nhận", count:confirmedCount },
    { value:"completed",  label:"Xong",   count:completedCount },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        <StatMini label="Tổng dịch vụ"   value={services.filter(s => s.status === "available").length} icon="⚙️" color={BRAND.text} bg="#f3f4f6" />
        <StatMini label="Chờ xử lý"      value={pendingCount}   icon="⏳" color="#92400e" bg="#fef3c7" />
        <StatMini label="Đang thực hiện" value={confirmedCount} icon="🔄" color="#4c1d95" bg="#ede9fe" />
        <StatMini label="Hoàn thành"     value={completedCount} icon="✅" color="#065f46" bg="#d1fae5" />
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, background:BRAND.surfaceAlt, padding:4, borderRadius:10, width:"fit-content" }}>
        {[{ id:"services", label:"Danh sách dịch vụ" }, { id:"requests", label:`Yêu cầu (${serviceRequests.length})` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)} style={{
            padding:"7px 16px", borderRadius:7, border:"none", cursor:"pointer",
            fontSize:13, fontWeight:600, fontFamily:"inherit",
            background:tab === t.id ? BRAND.surface : "transparent",
            color:tab === t.id ? BRAND.text : BRAND.textMuted,
            boxShadow:tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            transition:"all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Services list */}
      {tab === "services" && (
        <>
          <Card padding="12px 16px">
            <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" }}>
              <FilterPills options={catOptions} value={catFilter} onChange={setCatFilter} />
              <div style={{ display:"flex", gap:10 }}>
                <SearchBar value={search} onChange={setSearch} placeholder="Tên dịch vụ..." />
                <Button>+ Thêm dịch vụ</Button>
              </div>
            </div>
          </Card>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
            {filteredServices.map(svc => {
              const catCfg  = SERVICE_CATEGORY_CONFIG[svc.category];
              const statCfg = SERVICE_STATUS_CONFIG[svc.status];
              const reqCount = serviceRequests.filter(r => r.serviceId === svc.id).length;
              return (
                <Card key={svc.id} padding="16px 18px" style={{ cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontSize:24 }}>{catCfg.icon}</span>
                    <Badge label={statCfg.label} color={statCfg.color} bg={statCfg.bg} />
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:BRAND.text, marginBottom:4 }}>{svc.name}</div>
                  <div style={{ fontSize:11, color:BRAND.textMuted, marginBottom:10 }}>{svc.description}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:10, borderTop:`1px solid ${BRAND.border}` }}>
                    <div>
                      <div style={{ fontSize:16, fontWeight:800, color:"#065f46" }}>{fmt.currency(svc.price)}</div>
                      <div style={{ fontSize:10, color:BRAND.textMuted }}>/{svc.unit}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:BRAND.text }}>{reqCount}</div>
                      <div style={{ fontSize:10, color:BRAND.textMuted }}>yêu cầu</div>
                    </div>
                  </div>
                  <div style={{ marginTop:10, display:"flex", gap:6 }}>
                    <Button size="sm" variant="ghost" style={{ flex:1 }} onClick={() => setSelectedSvc(svc)}>Chi tiết</Button>
                    <Button size="sm" style={{ flex:1 }}>Chỉnh sửa</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Requests */}
      {tab === "requests" && (
        <>
          <Card padding="12px 16px">
            <div style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"space-between" }}>
              <FilterPills options={reqOptions} value={reqFilter} onChange={setReqFilter} />
              <Button>+ Tạo yêu cầu</Button>
            </div>
          </Card>

          <Card padding="0">
            <Table
              columns={[
                { key:"id",      label:"Mã",      width:80,  render:r => <span style={{ fontSize:11, fontFamily:"monospace", color:BRAND.textMuted }}>{r.id.toUpperCase()}</span> },
                { key:"service", label:"Dịch vụ",           render:r => {
                  const svc = services.find(s => s.id === r.serviceId);
                  const cat = svc ? SERVICE_CATEGORY_CONFIG[svc.category] : null;
                  return <span style={{ fontSize:12 }}>{cat?.icon} {svc?.name}</span>;
                }},
                { key:"room",    label:"Phòng",   width:80,  render:r => {
                  const room = rooms.find(rm => rm.id === r.roomId);
                  return <span style={{ fontWeight:700, background:BRAND.accentSoft, color:BRAND.accent, padding:"2px 8px", borderRadius:6, fontSize:12 }}>P.{room?.number}</span>;
                }},
                { key:"tenant",  label:"Cư dân",            render:r => {
                  const t = accounts.find(a => a.id === r.tenantId);
                  return <span style={{ fontSize:12 }}>{t?.fullName || "—"}</span>;
                }},
                { key:"date",    label:"Ngày yêu cầu", width:120, render:r => <span style={{ fontSize:11, color:BRAND.textMuted }}>{fmt.date(r.requestDate)}</span> },
                { key:"sched",   label:"Lịch",    width:110, render:r => r.scheduledDate ? <span style={{ fontSize:11 }}>{fmt.date(r.scheduledDate)}</span> : <span style={{ color:BRAND.textLight, fontSize:11 }}>—</span> },
                { key:"amount",  label:"Phí",     width:110, render:r => <span style={{ fontWeight:700 }}>{fmt.currency(r.amount)}</span>, align:"right" },
                { key:"status",  label:"Trạng thái",        render:r => <Badge {...REQUEST_STATUS_CONFIG[r.status]} /> },
                { key:"action",  label:"",        width:140, render:r => (
                  <div style={{ display:"flex", gap:5 }}>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedReq(r)}>Chi tiết</Button>
                    {(r.status === "pending" || r.status === "confirmed") && <Button size="sm">Xử lý</Button>}
                  </div>
                )},
              ]}
              data={filteredRequests}
              rowKey={r => r.id}
            />
          </Card>
        </>
      )}
    </div>
  );
}
