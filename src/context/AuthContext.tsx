import { createContext, useContext, useState, type ReactNode } from "react";
import type { Account } from "../types";
import { accounts } from "../data/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: Account | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  register: (data: RegisterData) => { ok: boolean; error?: string };
  resetPassword: (email: string) => { ok: boolean; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Demo credentials ─────────────────────────────────────────────────────────
// Any email not listed here falls back to "password123"
const DEMO_PASSWORDS: Record<string, string> = {
  "admin@miniapart.vn":  "admin123",
  "staff1@miniapart.vn": "staff123",
  "staff2@miniapart.vn": "staff123",
  "staff3@miniapart.vn": "staff123",
  "an.nguyen@gmail.com": "tenant123",
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);

  /**
   * login — validates credentials, sets user in state.
   * When user becomes non-null, AppShell re-renders and shows the dashboard.
   */
  const login = (email: string, password: string): { ok: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const acc = accounts.find(a => a.email.toLowerCase() === trimmedEmail);

    if (!acc)
      return { ok: false, error: "Email không tồn tại trong hệ thống." };
    if (acc.status === "suspended")
      return { ok: false, error: "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên." };
    if (acc.status === "inactive")
      return { ok: false, error: "Tài khoản chưa được kích hoạt." };

    const validPwd = DEMO_PASSWORDS[trimmedEmail] ?? "password123";
    if (password !== validPwd)
      return { ok: false, error: "Mật khẩu không chính xác." };

    setUser(acc);          // ← triggers AppShell re-render → dashboard visible
    return { ok: true };
  };

  /** logout — clears user, AppShell re-renders → auth page shown again */
  const logout = () => setUser(null);

  /** register — validates & simulates account creation */
  const register = (data: RegisterData): { ok: boolean; error?: string } => {
    const trimmedEmail = data.email.trim().toLowerCase();

    if (accounts.some(a => a.email.toLowerCase() === trimmedEmail))
      return { ok: false, error: "Email này đã được đăng ký." };
    if (data.fullName.trim().length < 2)
      return { ok: false, error: "Họ tên phải có ít nhất 2 ký tự." };
    if (data.password.length < 6)
      return { ok: false, error: "Mật khẩu phải có ít nhất 6 ký tự." };

    // In production: call API, persist to DB.
    // Here we just return success; user must then log in.
    return { ok: true };
  };

  /** resetPassword — checks email exists, simulates sending reset link */
  const resetPassword = (email: string): { ok: boolean; error?: string } => {
    const exists = accounts.some(a => a.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists)
      return { ok: false, error: "Email không tồn tại trong hệ thống." };
    return { ok: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>.");
  return ctx;
}
