import { AVATAR_PALETTE } from "../constants";

export const fmt = {
  currency: (n: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n),
  number: (n: number) => new Intl.NumberFormat("vi-VN").format(n),
  date: (s: string) => {
    const d = new Date(s);
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  },
  month: (s: string) => {
    const [y, m] = s.split("-");
    return `Tháng ${m}/${y}`;
  },
  datetime: (s: string) => {
    const d = new Date(s);
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  },
};

export function initials(name: string): string {
  return name.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase();
}

export function avatarColor(name: string): string {
  return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length];
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
