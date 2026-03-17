import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import type { RegisterData } from "../../context/AuthContext";

type AuthView = "login" | "register" | "forgot" | "forgot-sent";

// ─── Sub-components ───────────────────────────────────────────────────────────
function Field({
  label, type = "text", value, onChange, placeholder, error, hint, autoFocus,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; hint?: string; autoFocus?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.01em" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          autoFocus={autoFocus}
          type={isPwd && show ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", padding: isPwd ? "11px 40px 11px 14px" : "11px 14px",
            borderRadius: 10, fontSize: 14, color: "#111827",
            border: `1.5px solid ${error ? "#ef4444" : "#e5e7eb"}`,
            background: "#fff", outline: "none",
            fontFamily: "inherit", boxSizing: "border-box",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = error ? "#ef4444" : "#2563eb";
            e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? "#fee2e2" : "#dbeafe"}`;
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = error ? "#ef4444" : "#e5e7eb";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow(s => !s)} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "#9ca3af", fontSize: 16, padding: 0, lineHeight: 1,
          }}>
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error  && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>⚠ {error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: "#9ca3af" }}>{hint}</span>}
    </div>
  );
}

function SubmitBtn({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: "100%", padding: "12px", borderRadius: 10, border: "none",
      fontFamily: "inherit", fontSize: 14, fontWeight: 700,
      cursor: loading ? "not-allowed" : "pointer",
      background: loading ? "#93c5fd" : "#1e3a8a",
      color: "#fff", transition: "opacity 0.15s",
    }}>
      {loading ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{
            width: 14, height: 14, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.3)",
            borderTopColor: "#fff", display: "inline-block",
            animation: "auth-spin 0.7s linear infinite",
          }} />
          Đang xử lý...
        </span>
      ) : children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      width: "100%", padding: "11px", borderRadius: 10,
      border: "1.5px solid #e5e7eb", background: "#f9fafb",
      fontFamily: "inherit", fontSize: 14, fontWeight: 600,
      color: "#374151", cursor: "pointer",
    }}>
      {children}
    </button>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{
      padding: "10px 14px", borderRadius: 9, fontSize: 13, fontWeight: 500,
      background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca",
    }}>⚠️ {msg}</div>
  );
}

function Link({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "#2563eb", fontSize: 13, fontWeight: 600,
      fontFamily: "inherit", padding: 0,
      textDecoration: "underline", textUnderlineOffset: "2px",
    }}>
      {children}
    </button>
  );
}

export function AuthPage() {
  const { login, register, resetPassword } = useAuth();
  const [view, setView] = useState<AuthView>("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd,   setLoginPwd]   = useState("");
  const [loginErr,   setLoginErr]   = useState("");
  const [loginBusy,  setLoginBusy]  = useState(false);

  // Register form state
  const [regName,  setRegName]  = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPwd,   setRegPwd]   = useState("");
  const [regPwd2,  setRegPwd2]  = useState("");
  const [regErr,   setRegErr]   = useState("");
  const [regBusy,  setRegBusy]  = useState(false);
  const [regOk,    setRegOk]    = useState(false);

  // Forgot form state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotErr,   setForgotErr]   = useState("");
  const [forgotBusy,  setForgotBusy]  = useState(false);

  // Per-field validation errors
  const [fe, setFe] = useState<Record<string, string>>({});

  const go = (v: AuthView) => {
    setView(v);
    setLoginErr(""); setRegErr(""); setForgotErr(""); setFe({});
  };

  // ── Demo quick-fill ────────────────────────────────────────────────────────
  const DEMO = [
    { label: "Admin",     email: "admin@miniapart.vn",  pw: "admin123",  bg: "#ede9fe", color: "#7c3aed" },
    { label: "Nhân viên", email: "staff1@miniapart.vn", pw: "staff123",  bg: "#dbeafe", color: "#1d4ed8" },
    { label: "Cư dân",    email: "an.nguyen@gmail.com", pw: "tenant123", bg: "#d1fae5", color: "#065f46" },
  ];

  // ── Login handler ──────────────────────────────────────────────────────────
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!loginEmail.trim()) errs.email = "Vui lòng nhập email";
    if (!loginPwd)          errs.pwd   = "Vui lòng nhập mật khẩu";
    if (Object.keys(errs).length) { setFe(errs); return; }
    setFe({}); setLoginErr(""); setLoginBusy(true);
    await new Promise(r => setTimeout(r, 750));           // simulate network
    const res = login(loginEmail.trim(), loginPwd);
    setLoginBusy(false);
    if (!res.ok) setLoginErr(res.error ?? "Đăng nhập thất bại.");
    // on success: login() sets user → AppShell renders dashboard automatically
  };

  // ── Register handler ───────────────────────────────────────────────────────
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!regName.trim())  errs.name  = "Vui lòng nhập họ tên";
    if (!regEmail.trim()) errs.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errs.email = "Email không hợp lệ";
    if (!regPhone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
    if (!regPwd)          errs.pwd   = "Vui lòng nhập mật khẩu";
    else if (regPwd.length < 6) errs.pwd = "Mật khẩu tối thiểu 6 ký tự";
    if (regPwd !== regPwd2) errs.pwd2 = "Mật khẩu xác nhận không khớp";
    if (Object.keys(errs).length) { setFe(errs); return; }

    setFe({}); setRegErr(""); setRegBusy(true);
    await new Promise(r => setTimeout(r, 900));
    const data: RegisterData = { fullName: regName.trim(), email: regEmail.trim(), phone: regPhone.trim(), password: regPwd };
    const res = register(data);
    setRegBusy(false);
    if (res.ok) {
      setRegOk(true);
      setTimeout(() => { setRegOk(false); go("login"); }, 1800);
    } else {
      setRegErr(res.error ?? "Đăng ký thất bại.");
    }
  };

  // ── Forgot handler ─────────────────────────────────────────────────────────
  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) { setFe({ forgotEmail: "Vui lòng nhập email" }); return; }
    setFe({}); setForgotErr(""); setForgotBusy(true);
    await new Promise(r => setTimeout(r, 800));
    const res = resetPassword(forgotEmail.trim());
    setForgotBusy(false);
    if (res.ok) setView("forgot-sent");
    else setForgotErr(res.error ?? "Không thể gửi email đặt lại.");
  };

  // ── Password strength ──────────────────────────────────────────────────────
  const pwStrength = (pw: string) => {
    if (pw.length === 0) return -1;
    if (pw.length < 6)   return 0;
    if (pw.length < 8)   return 1;
    if (pw.length < 12)  return 2;
    return 3;
  };
  const STRENGTH_COLOR = ["#ef4444", "#f97316", "#22c55e", "#16a34a"];
  const STRENGTH_LABEL = ["Quá ngắn", "Yếu", "Tốt", "Mạnh"];

  return (
    <>
      <style>{`
        @keyframes auth-spin   { to { transform: rotate(360deg); } }
        @keyframes auth-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes auth-float  {
          0%,100% { transform: translateY(0)   rotate(0deg);  }
          50%     { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes auth-floatB {
          0%,100% { transform: translateY(0)  rotate(0deg);  }
          50%     { transform: translateY(-8px) rotate(-2deg);}
        }
        @keyframes auth-pulse  { 0%,100% { opacity:.5; } 50% { opacity:1; } }
        .auth-panel { animation: auth-fadeUp 0.42s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div style={{
        display: "flex", height: "100vh", overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
      }}>

        {/* ── LEFT: branding panel ─────────────────────────────────────── */}
        <div style={{
          flex: "0 0 46%", background: "#0f172a",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          padding: "52px 48px", position: "relative", overflow: "hidden",
        }}>
          {/* Floating shapes */}
          {[
            { w:300, h:300, top:"-90px", left:"-90px",  bg:"rgba(37,99,235,0.11)", rx:64, anim:"auth-float 7s ease-in-out infinite" },
            { w:200, h:200, top:undefined, left:undefined, bottom:"-60px", right:"-60px", bg:"rgba(37,99,235,0.07)", rx:48, anim:"auth-floatB 9s ease-in-out infinite 1s" },
            { w:110, h:110, top:"46%", right:"-28px", left:undefined, bottom:undefined, bg:"rgba(56,189,248,0.06)", rx:28, anim:"auth-float 11s ease-in-out infinite 2s" },
            { w:72,  h:72,  top:"18%", left:"8%",  right:undefined, bottom:undefined, bg:"rgba(99,102,241,0.10)", rx:18, anim:"auth-floatB 8s ease-in-out infinite 0.5s" },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute", width: s.w, height: s.h,
              top: s.top, bottom: s.bottom, left: s.left, right: s.right,
              background: s.bg, borderRadius: s.rx, animation: s.anim,
            }} />
          ))}
          {/* dot grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 380 }}>
            <div style={{
              width: 70, height: 70, borderRadius: 20, margin: "0 auto 26px",
              background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 30, boxShadow: "0 8px 32px rgba(37,99,235,0.45)",
            }}>🏢</div>

            <h1 style={{ color:"#fff", fontSize:32, fontWeight:900, margin:"0 0 8px", letterSpacing:"-0.03em", lineHeight:1.1 }}>
              CC-BCK
            </h1>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 40px", lineHeight:1.65 }}>
              Hệ thống quản lý chung cư mini<br />toàn diện và hiện đại
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:13, textAlign:"left" }}>
              {[
                ["🏠", "Quản lý phòng & hợp đồng thuê"],
                ["⚡", "Theo dõi điện, nước, dịch vụ"],
                ["💰", "Hóa đơn & lịch sử thanh toán"],
                ["👥", "Quản lý người thuê & tài khoản"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{
                    width:36, height:36, borderRadius:10, flexShrink:0,
                    background:"rgba(255,255,255,0.07)",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
                  }}>{icon}</div>
                  <span style={{ color:"rgba(255,255,255,0.68)", fontSize:13, fontWeight:500 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop:38, padding:"9px 18px", borderRadius:12, display:"inline-flex",
              alignItems:"center", gap:8,
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)",
            }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"auth-pulse 2s infinite" }} />
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:12 }}>Demo · Dữ liệu mẫu</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: form panel ────────────────────────────────────────── */}
        <div style={{
          flex:1, background:"#f8f9fb",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          padding:"32px 24px", overflowY:"auto",
        }}>
          <div className="auth-panel" key={view} style={{ width:"100%", maxWidth:420 }}>

            {/* Title */}
            <div style={{ marginBottom:26 }}>
              <h2 style={{ margin:"0 0 5px", fontSize:25, fontWeight:900, color:"#0f172a", letterSpacing:"-0.03em" }}>
                {{ login:"Đăng nhập", register:"Tạo tài khoản", forgot:"Quên mật khẩu", "forgot-sent":"Kiểm tra email" }[view]}
              </h2>
              <p style={{ margin:0, fontSize:14, color:"#6b7280" }}>
                {view==="login"       && "Chào mừng trở lại! Đăng nhập để tiếp tục."}
                {view==="register"    && "Điền thông tin để tạo tài khoản mới."}
                {view==="forgot"      && "Nhập email để nhận liên kết đặt lại mật khẩu."}
                {view==="forgot-sent" && "Hướng dẫn đặt lại đã được gửi đến email của bạn."}
              </p>
            </div>

            {/* ══ LOGIN ══════════════════════════════════════════════════ */}
            {view === "login" && (
              <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>

                {/* Demo quick-fill */}
                <div style={{ padding:"11px 14px", borderRadius:11, background:"#eff6ff", border:"1px solid #bfdbfe" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#1d4ed8", marginBottom:8 }}>
                    🔑 Tài khoản demo — click để điền tự động
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    {DEMO.map(d => (
                      <button key={d.email} type="button"
                        onClick={() => { setLoginEmail(d.email); setLoginPwd(d.pw); setLoginErr(""); setFe({}); }}
                        style={{
                          padding:"4px 10px", borderRadius:7, border:"none", cursor:"pointer",
                          background:d.bg, color:d.color, fontSize:11, fontWeight:700, fontFamily:"inherit",
                        }}>{d.label}</button>
                    ))}
                  </div>
                </div>

                {loginErr && <ErrorBox msg={loginErr} />}

                <Field label="Email" type="email" value={loginEmail} onChange={setLoginEmail}
                  placeholder="your@email.com" error={fe.email} autoFocus />

                <Field label="Mật khẩu" type="password" value={loginPwd} onChange={setLoginPwd}
                  placeholder="Nhập mật khẩu" error={fe.pwd} />

                <div style={{ textAlign:"right", marginTop:-8 }}>
                  <Link onClick={() => go("forgot")}>Quên mật khẩu?</Link>
                </div>

                <SubmitBtn loading={loginBusy}>🔐 Đăng nhập</SubmitBtn>

                <p style={{ margin:0, textAlign:"center", fontSize:13, color:"#6b7280" }}>
                  Chưa có tài khoản?{" "}
                  <Link onClick={() => go("register")}>Đăng ký ngay</Link>
                </p>
              </form>
            )}

            {/* ══ REGISTER ═══════════════════════════════════════════════ */}
            {view === "register" && (
              <form onSubmit={handleRegister} style={{ display:"flex", flexDirection:"column", gap:14 }}>

                {regErr && <ErrorBox msg={regErr} />}

                {regOk && (
                  <div style={{ padding:"10px 14px", borderRadius:9, background:"#f0fdf4", color:"#166534", border:"1px solid #bbf7d0", fontSize:13 }}>
                    ✅ Đăng ký thành công! Đang chuyển về đăng nhập...
                  </div>
                )}

                <Field label="Họ và tên *" value={regName} onChange={setRegName}
                  placeholder="Nguyễn Văn A" error={fe.name} autoFocus />

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <Field label="Email *" type="email" value={regEmail} onChange={setRegEmail}
                    placeholder="your@email.com" error={fe.email} />
                  <Field label="Số điện thoại *" value={regPhone} onChange={setRegPhone}
                    placeholder="09xxxxxxxx" error={fe.phone} />
                </div>

                <Field label="Mật khẩu *" type="password" value={regPwd} onChange={setRegPwd}
                  placeholder="Ít nhất 6 ký tự" error={fe.pwd} />

                {/* Password strength meter */}
                {(() => {
                  const s = pwStrength(regPwd);
                  if (s < 0) return null;
                  return (
                    <div style={{ marginTop:-6 }}>
                      <div style={{ display:"flex", gap:3, marginBottom:4 }}>
                        {[0,1,2,3].map(i => (
                          <div key={i} style={{
                            flex:1, height:3, borderRadius:2,
                            background: i <= s ? STRENGTH_COLOR[s] : "#e5e7eb",
                            transition:"background 0.25s",
                          }} />
                        ))}
                      </div>
                      <span style={{ fontSize:11, color:STRENGTH_COLOR[s] }}>{STRENGTH_LABEL[s]}</span>
                    </div>
                  );
                })()}

                <Field label="Xác nhận mật khẩu *" type="password" value={regPwd2} onChange={setRegPwd2}
                  placeholder="Nhập lại mật khẩu" error={fe.pwd2} />

                <p style={{ margin:0, fontSize:12, color:"#9ca3af", lineHeight:1.6 }}>
                  Bằng cách đăng ký, bạn đồng ý với{" "}
                  <span style={{ color:"#2563eb", cursor:"pointer" }}>Điều khoản dịch vụ</span>
                  {" "}và{" "}
                  <span style={{ color:"#2563eb", cursor:"pointer" }}>Chính sách bảo mật</span>.
                </p>

                <SubmitBtn loading={regBusy}>✨ Tạo tài khoản</SubmitBtn>

                <p style={{ margin:0, textAlign:"center", fontSize:13, color:"#6b7280" }}>
                  Đã có tài khoản?{" "}
                  <Link onClick={() => go("login")}>Đăng nhập</Link>
                </p>
              </form>
            )}

            {/* ══ FORGOT ═════════════════════════════════════════════════ */}
            {view === "forgot" && (
              <form onSubmit={handleForgot} style={{ display:"flex", flexDirection:"column", gap:16 }}>

                {forgotErr && <ErrorBox msg={forgotErr} />}

                <div style={{ padding:"13px 14px", borderRadius:11, background:"#fffbeb", border:"1px solid #fde68a", fontSize:13, color:"#92400e" }}>
                  💡 Nhập email bạn đã đăng ký. Chúng tôi sẽ gửi liên kết đặt lại mật khẩu ngay lập tức.
                </div>

                <Field label="Email đã đăng ký" type="email" value={forgotEmail} onChange={setForgotEmail}
                  placeholder="your@email.com" error={fe.forgotEmail} autoFocus />

                <SubmitBtn loading={forgotBusy}>📧 Gửi email đặt lại</SubmitBtn>

                <p style={{ margin:0, textAlign:"center", fontSize:13, color:"#6b7280" }}>
                  <Link onClick={() => go("login")}>← Quay lại đăng nhập</Link>
                </p>
              </form>
            )}

            {/* ══ FORGOT-SENT ════════════════════════════════════════════ */}
            {view === "forgot-sent" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20, textAlign:"center" }}>
                <div style={{
                  width:72, height:72, borderRadius:"50%", background:"#d1fae5",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:32, margin:"0 auto",
                }}>📬</div>

                <div>
                  <p style={{ margin:"0 0 8px", fontSize:14, color:"#374151", lineHeight:1.6 }}>
                    Đã gửi hướng dẫn đặt lại mật khẩu đến:
                  </p>
                  <div style={{
                    padding:"8px 16px", background:"#f0fdf4", borderRadius:8,
                    fontSize:14, fontWeight:700, color:"#166534", display:"inline-block",
                  }}>{forgotEmail}</div>
                </div>

                <div style={{ padding:"12px 16px", borderRadius:10, background:"#f8f9fb", border:"1px solid #e5e7eb", fontSize:13, color:"#6b7280", lineHeight:1.6 }}>
                  Kiểm tra hộp thư đến và thư mục <strong>Spam</strong>.<br />
                  Liên kết có hiệu lực trong <strong>15 phút</strong>.
                </div>

                <GhostBtn onClick={() => { setForgotEmail(""); go("forgot"); }}>
                  🔄 Gửi lại email
                </GhostBtn>
                <Link onClick={() => go("login")}>← Quay lại đăng nhập</Link>
              </div>
            )}

          </div>

          <div style={{ marginTop:28, fontSize:12, color:"#9ca3af", textAlign:"center" }}>
            © 2026 MiniApart · Hệ thống quản lý chung cư
          </div>
        </div>
      </div>
    </>
  );
}
