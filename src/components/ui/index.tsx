import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { initials, avatarColor } from "../../utils";
import { BRAND } from "../../constants";

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarColor(name), color: "#fff", flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 700, letterSpacing: "0.03em",
    }}>
      {initials(name)}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  color: string;
  bg: string;
  dot?: string;
  size?: "sm" | "md";
}
export function Badge({ label, color, bg, dot, size = "md" }: BadgeProps) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: size === "sm" ? "2px 7px" : "3px 10px",
      borderRadius: 20, background: bg, color,
      fontSize: size === "sm" ? 10 : 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flexShrink: 0 }} />}
      {label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({
  children, style, padding = "20px 22px",
}: { children: ReactNode; style?: CSSProperties; padding?: string }) {
  return (
    <div style={{
      background: BRAND.surface, borderRadius: 14,
      border: `1px solid ${BRAND.border}`,
      padding, ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
export function SectionHeader({
  title, subtitle, action,
}: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: BRAND.text }}>{title}</h2>
        {subtitle && <p style={{ margin: "3px 0 0", fontSize: 12, color: BRAND.textMuted }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
interface ColDef<T> {
  key: string;
  label: string;
  width?: number | string;
  render: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
}
interface TableProps<T> {
  columns: ColDef<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyText?: string;
}
export function Table<T>({ columns, data, rowKey, emptyText = "Không có dữ liệu" }: TableProps<T>) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${BRAND.border}` }}>
            {columns.map(col => (
              <th key={col.key} style={{
                padding: "9px 12px", textAlign: col.align || "left",
                fontSize: 10, fontWeight: 700, color: BRAND.textMuted,
                textTransform: "uppercase", letterSpacing: "0.06em",
                width: col.width,
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: "40px 12px", textAlign: "center", color: BRAND.textLight, fontSize: 13 }}>{emptyText}</td></tr>
          ) : data.map(row => (
            <tr key={rowKey(row)} style={{ borderBottom: `1px solid ${BRAND.surfaceAlt}` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BRAND.surfaceAlt}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ""}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: "10px 12px", textAlign: col.align || "left", verticalAlign: "middle" }}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md";
  disabled?: boolean;
  style?: CSSProperties;
}
export function Button({ children, onClick, variant = "primary", size = "md", disabled, style }: ButtonProps) {
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 6,
    border: "none", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600, fontFamily: "inherit", opacity: disabled ? 0.5 : 1,
    padding: size === "sm" ? "5px 12px" : "8px 16px",
    fontSize: size === "sm" ? 12 : 13,
    transition: "opacity 0.15s",
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: BRAND.primary, color: "#fff" },
    ghost:   { background: "transparent", color: BRAND.textMuted, border: `1px solid ${BRAND.border}` },
    danger:  { background: "#fee2e2", color: "#991b1b" },
    outline: { background: "transparent", color: BRAND.accent, border: `1.5px solid ${BRAND.accent}` },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={disabled ? undefined : onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  style?: CSSProperties;
}
export function Input({ label, value, onChange, placeholder, type = "text", style }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: BRAND.textMuted }}>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "8px 12px", borderRadius: 8, border: `1px solid ${BRAND.border}`,
          fontSize: 13, color: BRAND.text, background: BRAND.surface,
          outline: "none", fontFamily: "inherit", ...style,
        }}
      />
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  style?: CSSProperties;
}
export function Select({ label, value, onChange, options, style }: SelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: BRAND.textMuted }}>{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "8px 12px", borderRadius: 8, border: `1px solid ${BRAND.border}`,
          fontSize: 13, color: BRAND.text, background: BRAND.surface,
          outline: "none", fontFamily: "inherit", cursor: "pointer", ...style,
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;
}
export function Modal({ open, onClose, title, children, width = 520 }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;
  return (
    <div
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{
        background: BRAND.surface, borderRadius: 16,
        width: "100%", maxWidth: width, maxHeight: "85vh",
        overflow: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 22px", borderBottom: `1px solid ${BRAND.border}`,
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: BRAND.text }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 20, color: BRAND.textMuted, lineHeight: 1, padding: "0 4px",
          }}>×</button>
        </div>
        <div style={{ padding: "20px 22px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Search bar ───────────────────────────────────────────────────────────────
export function SearchBar({
  value, onChange, placeholder = "Tìm kiếm...",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
        color: BRAND.textMuted, fontSize: 14, pointerEvents: "none",
      }}>⌕</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "8px 12px 8px 30px", borderRadius: 8,
          border: `1px solid ${BRAND.border}`, fontSize: 13,
          color: BRAND.text, background: BRAND.surface,
          outline: "none", fontFamily: "inherit", width: 220,
        }}
      />
    </div>
  );
}

// ─── Stat mini card ───────────────────────────────────────────────────────────
export function StatMini({
  label, value, icon, color, bg, sub,
}: { label: string; value: string | number; icon: string; color: string; bg: string; sub?: string }) {
  return (
    <Card style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 11, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: BRAND.text, marginTop: 1 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: BRAND.textLight, marginTop: 1 }}>{sub}</div>}
      </div>
    </Card>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 0", color: BRAND.textLight }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 13 }}>{message}</div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div style={{ display: "flex", gap: 4, background: BRAND.surfaceAlt, padding: 4, borderRadius: 10, width: "fit-content", marginBottom: 20 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer",
          fontSize: 12, fontWeight: 600, fontFamily: "inherit",
          background: active === t.id ? BRAND.surface : "transparent",
          color: active === t.id ? BRAND.text : BRAND.textMuted,
          boxShadow: active === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.15s",
        }}>{t.label}</button>
      ))}
    </div>
  );
}

// ─── Status dot ───────────────────────────────────────────────────────────────
export function StatusDot({ color }: { color: string }) {
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />;
}

// ─── Filter pill ──────────────────────────────────────────────────────────────
interface FilterPillProps {
  options: { value: string; label: string; count?: number }[];
  value: string;
  onChange: (v: string) => void;
}
export function FilterPills({ options, value, onChange }: FilterPillProps) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "5px 12px", borderRadius: 20,
          border: `1.5px solid ${value === opt.value ? BRAND.accent : BRAND.border}`,
          background: value === opt.value ? BRAND.accentSoft : BRAND.surface,
          color: value === opt.value ? BRAND.accent : BRAND.textMuted,
          fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          transition: "all 0.12s",
        }}>
          {opt.label}
          {opt.count !== undefined && (
            <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.75 }}>{opt.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// re-export useState to help pages
export { useState };
