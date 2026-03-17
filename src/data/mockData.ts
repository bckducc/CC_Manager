import type { Room, Account, Contract, UtilityReading, Service, ServiceRequest, Invoice, Payment } from "../types";

// ─── Rooms ───────────────────────────────────────────────────────────────────
export const rooms: Room[] = [
  { id:"r01", number:"101", floor:1, type:"single",    status:"occupied",    area:25, baseRent:3500000, maxOccupants:1, amenities:["Điều hòa","WC riêng","Ban công"],        tenantId:"u05", contractId:"c01" },
  { id:"r02", number:"102", floor:1, type:"single",    status:"occupied",    area:25, baseRent:3500000, maxOccupants:1, amenities:["Điều hòa","WC riêng"],                   tenantId:"u06", contractId:"c02" },
  { id:"r03", number:"103", floor:1, type:"double",    status:"vacant",      area:35, baseRent:5000000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Tủ bếp"] },
  { id:"r04", number:"104", floor:1, type:"single",    status:"maintenance", area:25, baseRent:3500000, maxOccupants:1, amenities:["Điều hòa"] },
  { id:"r05", number:"201", floor:2, type:"studio",    status:"occupied",    area:40, baseRent:6500000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Ban công","Bếp"],  tenantId:"u07", contractId:"c03" },
  { id:"r06", number:"202", floor:2, type:"studio",    status:"occupied",    area:40, baseRent:6500000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Bếp"],             tenantId:"u08", contractId:"c04" },
  { id:"r07", number:"203", floor:2, type:"double",    status:"reserved",    area:35, baseRent:5000000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Tủ bếp"] },
  { id:"r08", number:"204", floor:2, type:"double",    status:"occupied",    area:35, baseRent:5200000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Ban công"],         tenantId:"u09", contractId:"c05" },
  { id:"r09", number:"301", floor:3, type:"studio",    status:"occupied",    area:45, baseRent:7000000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Bếp","Ban công"],   tenantId:"u10", contractId:"c06" },
  { id:"r10", number:"302", floor:3, type:"studio",    status:"vacant",      area:45, baseRent:7000000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Bếp"] },
  { id:"r11", number:"303", floor:3, type:"double",    status:"occupied",    area:38, baseRent:5500000, maxOccupants:2, amenities:["Điều hòa","WC riêng","Tủ bếp"],           tenantId:"u11", contractId:"c07" },
  { id:"r12", number:"401", floor:4, type:"penthouse", status:"occupied",    area:80, baseRent:15000000,maxOccupants:4, amenities:["Điều hòa","WC riêng","Bếp","Ban công","Máy giặt","Sân thượng"], tenantId:"u12", contractId:"c08" },
];

// ─── Accounts ─────────────────────────────────────────────────────────────────
export const accounts: Account[] = [
  { id:"u01", fullName:"Nguyễn Quản Lý",   email:"admin@miniapart.vn",    phone:"0901111111", role:"admin",  status:"active",   gender:"male",   dob:"1985-03-15", idNumber:"012345678901", address:"HCM", createdAt:"2023-01-01", lastLogin:"2026-03-16" },
  { id:"u02", fullName:"Trần Văn Nhân",     email:"staff1@miniapart.vn",   phone:"0902222222", role:"staff",  status:"active",   gender:"male",   dob:"1992-07-20", idNumber:"012345678902", address:"HCM", createdAt:"2023-06-01", lastLogin:"2026-03-15" },
  { id:"u03", fullName:"Lê Thị Thu",        email:"staff2@miniapart.vn",   phone:"0903333333", role:"staff",  status:"active",   gender:"female", dob:"1995-11-05", idNumber:"012345678903", address:"HCM", createdAt:"2023-06-01", lastLogin:"2026-03-14" },
  { id:"u04", fullName:"Phạm Kế Toán",     email:"staff3@miniapart.vn",   phone:"0904444444", role:"staff",  status:"inactive", gender:"female", dob:"1990-02-28", idNumber:"012345678904", address:"HCM", createdAt:"2024-01-01" },
  { id:"u05", fullName:"Nguyễn Văn An",     email:"an.nguyen@gmail.com",   phone:"0911111111", role:"tenant", status:"active",   gender:"male",   dob:"1998-04-10", idNumber:"079098001234", address:"Hà Nội", roomId:"r01", createdAt:"2024-03-01", lastLogin:"2026-03-10" },
  { id:"u06", fullName:"Trần Thị Bình",     email:"binh.tran@gmail.com",   phone:"0912222222", role:"tenant", status:"active",   gender:"female", dob:"2000-08-22", idNumber:"079098002345", address:"Đà Nẵng", roomId:"r02", createdAt:"2024-06-01", lastLogin:"2026-03-12" },
  { id:"u07", fullName:"Lê Minh Châu",      email:"chau.le@gmail.com",     phone:"0913333333", role:"tenant", status:"active",   gender:"male",   dob:"1996-12-30", idNumber:"079098003456", address:"Cần Thơ", roomId:"r05", createdAt:"2025-01-15", lastLogin:"2026-03-11" },
  { id:"u08", fullName:"Phạm Đức Dũng",     email:"dung.pham@gmail.com",   phone:"0914444444", role:"tenant", status:"active",   gender:"male",   dob:"1993-05-18", idNumber:"079098004567", address:"HCM", roomId:"r06", createdAt:"2025-02-01", lastLogin:"2026-03-09" },
  { id:"u09", fullName:"Hoàng Thị Emi",     email:"emi.hoang@gmail.com",   phone:"0915555555", role:"tenant", status:"active",   gender:"female", dob:"1999-09-09", idNumber:"079098005678", address:"Hà Nội", roomId:"r08", createdAt:"2025-03-01", lastLogin:"2026-03-13" },
  { id:"u10", fullName:"Vũ Quang Phong",    email:"phong.vu@gmail.com",    phone:"0916666666", role:"tenant", status:"active",   gender:"male",   dob:"1994-01-25", idNumber:"079098006789", address:"HCM", roomId:"r09", createdAt:"2025-04-01", lastLogin:"2026-03-08" },
  { id:"u11", fullName:"Đặng Thu Hà",       email:"ha.dang@gmail.com",     phone:"0917777777", role:"tenant", status:"active",   gender:"female", dob:"1997-07-07", idNumber:"079098007890", address:"Huế", roomId:"r11", createdAt:"2025-05-01", lastLogin:"2026-03-15" },
  { id:"u12", fullName:"Bùi Gia Huy",       email:"huy.bui@gmail.com",     phone:"0918888888", role:"tenant", status:"active",   gender:"male",   dob:"1988-03-03", idNumber:"079098008901", address:"HCM", roomId:"r12", createdAt:"2023-09-01", lastLogin:"2026-03-16" },
];

// ─── Contracts ────────────────────────────────────────────────────────────────
export const contracts: Contract[] = [
  { id:"c01", roomId:"r01", tenantId:"u05", startDate:"2024-03-01", endDate:"2025-03-01", monthlyRent:3500000, deposit:7000000,  status:"active",     createdAt:"2024-02-25", renewalCount:1 },
  { id:"c02", roomId:"r02", tenantId:"u06", startDate:"2024-06-01", endDate:"2025-06-01", monthlyRent:3500000, deposit:7000000,  status:"active",     createdAt:"2024-05-28", renewalCount:0 },
  { id:"c03", roomId:"r05", tenantId:"u07", startDate:"2025-01-15", endDate:"2026-01-15", monthlyRent:6500000, deposit:13000000, status:"active",     createdAt:"2025-01-10", renewalCount:0 },
  { id:"c04", roomId:"r06", tenantId:"u08", startDate:"2025-02-01", endDate:"2026-02-01", monthlyRent:6500000, deposit:13000000, status:"active",     createdAt:"2025-01-27", renewalCount:0 },
  { id:"c05", roomId:"r08", tenantId:"u09", startDate:"2025-03-01", endDate:"2026-03-01", monthlyRent:5200000, deposit:10400000, status:"active",     createdAt:"2025-02-25", renewalCount:0 },
  { id:"c06", roomId:"r09", tenantId:"u10", startDate:"2025-04-01", endDate:"2026-04-01", monthlyRent:7000000, deposit:14000000, status:"active",     createdAt:"2025-03-28", renewalCount:0 },
  { id:"c07", roomId:"r11", tenantId:"u11", startDate:"2025-05-01", endDate:"2026-05-01", monthlyRent:5500000, deposit:11000000, status:"active",     createdAt:"2025-04-28", renewalCount:0 },
  { id:"c08", roomId:"r12", tenantId:"u12", startDate:"2023-09-01", endDate:"2024-09-01", monthlyRent:15000000,deposit:30000000, status:"active",     createdAt:"2023-08-25", renewalCount:2 },
  { id:"c09", roomId:"r03", tenantId:"u05", startDate:"2023-06-01", endDate:"2024-06-01", monthlyRent:4800000, deposit:9600000,  status:"expired",    createdAt:"2023-05-28", renewalCount:0 },
  { id:"c10", roomId:"r04", tenantId:"u06", startDate:"2023-09-01", endDate:"2024-03-01", monthlyRent:3200000, deposit:6400000,  status:"terminated", createdAt:"2023-08-20", renewalCount:0 },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
export const utilityReadings: UtilityReading[] = [
  // March 2026
  { id:"ut01", roomId:"r01", type:"electricity", month:"2026-03", previousReading:1240, currentReading:1312, consumption:72,  unitPrice:3500, totalAmount:252000,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut02", roomId:"r01", type:"water",        month:"2026-03", previousReading:45,   currentReading:50,   consumption:5,   unitPrice:15000,totalAmount:75000,   recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut03", roomId:"r02", type:"electricity", month:"2026-03", previousReading:980,  currentReading:1065, consumption:85,  unitPrice:3500, totalAmount:297500,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut04", roomId:"r02", type:"water",        month:"2026-03", previousReading:38,   currentReading:44,   consumption:6,   unitPrice:15000,totalAmount:90000,   recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut05", roomId:"r05", type:"electricity", month:"2026-03", previousReading:2100, currentReading:2198, consumption:98,  unitPrice:3500, totalAmount:343000,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut06", roomId:"r05", type:"water",        month:"2026-03", previousReading:72,   currentReading:79,   consumption:7,   unitPrice:15000,totalAmount:105000,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut07", roomId:"r06", type:"electricity", month:"2026-03", previousReading:1580, currentReading:1667, consumption:87,  unitPrice:3500, totalAmount:304500,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut08", roomId:"r06", type:"water",        month:"2026-03", previousReading:55,   currentReading:62,   consumption:7,   unitPrice:15000,totalAmount:105000,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut09", roomId:"r08", type:"electricity", month:"2026-03", previousReading:870,  currentReading:945,  consumption:75,  unitPrice:3500, totalAmount:262500,  recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut10", roomId:"r08", type:"water",        month:"2026-03", previousReading:30,   currentReading:36,   consumption:6,   unitPrice:15000,totalAmount:90000,   recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut11", roomId:"r09", type:"electricity", month:"2026-03", previousReading:3200, currentReading:3312, consumption:112, unitPrice:3500, totalAmount:392000,  recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut12", roomId:"r09", type:"water",        month:"2026-03", previousReading:88,   currentReading:96,   consumption:8,   unitPrice:15000,totalAmount:120000,  recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut13", roomId:"r11", type:"electricity", month:"2026-03", previousReading:1400, currentReading:1478, consumption:78,  unitPrice:3500, totalAmount:273000,  recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut14", roomId:"r11", type:"water",        month:"2026-03", previousReading:48,   currentReading:54,   consumption:6,   unitPrice:15000,totalAmount:90000,   recordedAt:"2026-03-01", recordedBy:"u03" },
  { id:"ut15", roomId:"r12", type:"electricity", month:"2026-03", previousReading:5600, currentReading:5745, consumption:145, unitPrice:3500, totalAmount:507500,  recordedAt:"2026-03-01", recordedBy:"u02" },
  { id:"ut16", roomId:"r12", type:"water",        month:"2026-03", previousReading:120,  currentReading:131,  consumption:11,  unitPrice:15000,totalAmount:165000,  recordedAt:"2026-03-01", recordedBy:"u02" },
  // Feb 2026
  { id:"ut17", roomId:"r01", type:"electricity", month:"2026-02", previousReading:1168, currentReading:1240, consumption:72,  unitPrice:3500, totalAmount:252000,  recordedAt:"2026-02-01", recordedBy:"u02" },
  { id:"ut18", roomId:"r01", type:"water",        month:"2026-02", previousReading:40,   currentReading:45,   consumption:5,   unitPrice:15000,totalAmount:75000,   recordedAt:"2026-02-01", recordedBy:"u02" },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const services: Service[] = [
  { id:"sv01", name:"Vệ sinh phòng cơ bản",  category:"cleaning",    price:100000, unit:"lần",   status:"available",   description:"Lau dọn, hút bụi, lau kính" },
  { id:"sv02", name:"Vệ sinh tổng thể",       category:"cleaning",    price:250000, unit:"lần",   status:"available",   description:"Vệ sinh toàn diện bao gồm WC, bếp" },
  { id:"sv03", name:"Sửa điện cơ bản",        category:"maintenance", price:150000, unit:"lần",   status:"available",   description:"Thay bóng đèn, sửa ổ cắm, CB tự động" },
  { id:"sv04", name:"Sửa nước cơ bản",        category:"maintenance", price:200000, unit:"lần",   status:"available",   description:"Thay vòi, sửa xả bồn cầu" },
  { id:"sv05", name:"Sửa điều hòa",           category:"maintenance", price:350000, unit:"lần",   status:"available",   description:"Vệ sinh, kiểm tra gas, sửa chữa" },
  { id:"sv06", name:"Giặt quần áo (5kg)",     category:"laundry",     price:70000,  unit:"lần",   status:"available",   description:"Giặt và sấy khô" },
  { id:"sv07", name:"Giặt ủi quần áo (5kg)",  category:"laundry",     price:120000, unit:"lần",   status:"available",   description:"Giặt, sấy và ủi phẳng" },
  { id:"sv08", name:"Gửi xe máy",             category:"parking",     price:200000, unit:"tháng", status:"available",   description:"Chỗ gửi xe máy có bảo vệ 24/7" },
  { id:"sv09", name:"Gửi ô tô",              category:"parking",     price:1500000,unit:"tháng", status:"available",   description:"Bãi đỗ xe ô tô có camera" },
  { id:"sv10", name:"Bảo vệ 24/7",            category:"security",    price:300000, unit:"tháng", status:"available",   description:"Dịch vụ bảo vệ tòa nhà" },
  { id:"sv11", name:"Internet cáp quang",     category:"other",       price:200000, unit:"tháng", status:"available",   description:"Gói 100Mbps không giới hạn" },
];

export const serviceRequests: ServiceRequest[] = [
  { id:"sr01", serviceId:"sv05", roomId:"r05", tenantId:"u07", requestDate:"2026-03-10", scheduledDate:"2026-03-12", status:"completed",  amount:350000, note:"Điều hòa không mát" },
  { id:"sr02", serviceId:"sv01", roomId:"r12", tenantId:"u12", requestDate:"2026-03-11", scheduledDate:"2026-03-13", status:"completed",  amount:100000 },
  { id:"sr03", serviceId:"sv03", roomId:"r08", tenantId:"u09", requestDate:"2026-03-14", scheduledDate:"2026-03-16", status:"confirmed",  amount:150000, note:"Ổ cắm phòng ngủ bị hở" },
  { id:"sr04", serviceId:"sv04", roomId:"r09", tenantId:"u10", requestDate:"2026-03-15",                             status:"pending",    amount:200000, note:"Vòi sen bị rò rỉ" },
  { id:"sr05", serviceId:"sv06", roomId:"r02", tenantId:"u06", requestDate:"2026-03-15", scheduledDate:"2026-03-16", status:"inprogress", amount:70000 },
  { id:"sr06", serviceId:"sv08", roomId:"r01", tenantId:"u05", requestDate:"2026-03-01",                             status:"completed",  amount:200000, note:"Đăng ký tháng 3" },
];

// ─── Invoices ─────────────────────────────────────────────────────────────────
export const invoices: Invoice[] = [
  {
    id:"inv01", roomId:"r01", tenantId:"u05", contractId:"c01", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:3500000, amount:3500000 },
      { label:"Điện (72 kWh × 3,500đ)", quantity:72, unitPrice:3500, amount:252000 },
      { label:"Nước (5 m³ × 15,000đ)", quantity:5, unitPrice:15000, amount:75000 },
      { label:"Internet", quantity:1, unitPrice:200000, amount:200000 },
      { label:"Gửi xe máy", quantity:1, unitPrice:200000, amount:200000 },
    ],
    totalAmount:4227000, paidAmount:4227000, status:"paid"
  },
  {
    id:"inv02", roomId:"r02", tenantId:"u06", contractId:"c02", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:3500000, amount:3500000 },
      { label:"Điện (85 kWh × 3,500đ)", quantity:85, unitPrice:3500, amount:297500 },
      { label:"Nước (6 m³ × 15,000đ)", quantity:6, unitPrice:15000, amount:90000 },
      { label:"Internet", quantity:1, unitPrice:200000, amount:200000 },
    ],
    totalAmount:4087500, paidAmount:0, status:"unpaid"
  },
  {
    id:"inv03", roomId:"r05", tenantId:"u07", contractId:"c03", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:6500000, amount:6500000 },
      { label:"Điện (98 kWh × 3,500đ)", quantity:98, unitPrice:3500, amount:343000 },
      { label:"Nước (7 m³ × 15,000đ)", quantity:7, unitPrice:15000, amount:105000 },
      { label:"Internet", quantity:1, unitPrice:200000, amount:200000 },
    ],
    totalAmount:7148000, paidAmount:7148000, status:"paid"
  },
  {
    id:"inv04", roomId:"r06", tenantId:"u08", contractId:"c04", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:6500000, amount:6500000 },
      { label:"Điện (87 kWh × 3,500đ)", quantity:87, unitPrice:3500, amount:304500 },
      { label:"Nước (7 m³ × 15,000đ)", quantity:7, unitPrice:15000, amount:105000 },
    ],
    totalAmount:6909500, paidAmount:3000000, status:"partial"
  },
  {
    id:"inv05", roomId:"r08", tenantId:"u09", contractId:"c05", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:5200000, amount:5200000 },
      { label:"Điện (75 kWh × 3,500đ)", quantity:75, unitPrice:3500, amount:262500 },
      { label:"Nước (6 m³ × 15,000đ)", quantity:6, unitPrice:15000, amount:90000 },
    ],
    totalAmount:5552500, paidAmount:0, status:"overdue"
  },
  {
    id:"inv06", roomId:"r12", tenantId:"u12", contractId:"c08", type:"monthly", month:"2026-03",
    issueDate:"2026-03-01", dueDate:"2026-03-10",
    items:[
      { label:"Tiền thuê tháng 3/2026", quantity:1, unitPrice:15000000, amount:15000000 },
      { label:"Điện (145 kWh × 3,500đ)", quantity:145, unitPrice:3500, amount:507500 },
      { label:"Nước (11 m³ × 15,000đ)", quantity:11, unitPrice:15000, amount:165000 },
      { label:"Internet", quantity:1, unitPrice:200000, amount:200000 },
      { label:"Gửi ô tô", quantity:1, unitPrice:1500000, amount:1500000 },
    ],
    totalAmount:17372500, paidAmount:17372500, status:"paid"
  },
  // Feb invoices
  {
    id:"inv07", roomId:"r01", tenantId:"u05", contractId:"c01", type:"monthly", month:"2026-02",
    issueDate:"2026-02-01", dueDate:"2026-02-10",
    items:[
      { label:"Tiền thuê tháng 2/2026", quantity:1, unitPrice:3500000, amount:3500000 },
      { label:"Điện (72 kWh × 3,500đ)", quantity:72, unitPrice:3500, amount:252000 },
      { label:"Nước (5 m³ × 15,000đ)", quantity:5, unitPrice:15000, amount:75000 },
    ],
    totalAmount:3827000, paidAmount:3827000, status:"paid"
  },
];

// ─── Payments ─────────────────────────────────────────────────────────────────
export const payments: Payment[] = [
  { id:"pay01", invoiceId:"inv01", roomId:"r01", tenantId:"u05", amount:4227000, method:"transfer", paidAt:"2026-03-05 09:15", receivedBy:"u02", transactionRef:"FT26030512345" },
  { id:"pay02", invoiceId:"inv03", roomId:"r05", tenantId:"u07", amount:7148000, method:"momo",     paidAt:"2026-03-03 14:22", receivedBy:"u01", transactionRef:"MM26030398765" },
  { id:"pay03", invoiceId:"inv04", roomId:"r06", tenantId:"u08", amount:3000000, method:"cash",     paidAt:"2026-03-08 10:00", receivedBy:"u02", note:"Trả một phần, còn lại 3,909,500đ" },
  { id:"pay04", invoiceId:"inv06", roomId:"r12", tenantId:"u12", amount:17372500,method:"transfer", paidAt:"2026-03-02 08:30", receivedBy:"u01", transactionRef:"FT26030211111" },
  { id:"pay05", invoiceId:"inv07", roomId:"r01", tenantId:"u05", amount:3827000, method:"transfer", paidAt:"2026-02-06 11:00", receivedBy:"u02", transactionRef:"FT26020612345" },
  { id:"pay06", invoiceId:"sr01",  roomId:"r05", tenantId:"u07", amount:350000,  method:"cash",     paidAt:"2026-03-12 16:45", receivedBy:"u03", note:"Thanh toán dịch vụ sửa điều hòa" },
  { id:"pay07", invoiceId:"inv02", roomId:"r02", tenantId:"u06", amount:4087500, method:"transfer", paidAt:"2026-03-09 09:00", receivedBy:"u02", transactionRef:"FT26030922222" },
];
