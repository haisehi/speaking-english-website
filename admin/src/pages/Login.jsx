import { useState } from "react";
import { useLocation } from "wouter";
import { login } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
const res = await login({ email, password });

// 👉 LOG DEBUG (rất nên giữ khi test)
console.log("LOGIN RESPONSE:", res.data);

const {
  access_token,
  id_user,
  role,
  full_name_user
} = res.data;

if (role !== "ADMIN") {
  setError("Tài khoản không có quyền Admin");
  return;
}

localStorage.setItem("access_token", access_token);
localStorage.setItem("id_user", id_user);
localStorage.setItem(
  "admin_info",
  JSON.stringify({
    email,
    full_name: full_name_user,
    role,
  })
);

setLocation("/");

    } catch {
      setError("Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-[360px] p-6 rounded-xl border bg-card">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <div className="space-y-4">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
      </form>
    </div>
  );
}
