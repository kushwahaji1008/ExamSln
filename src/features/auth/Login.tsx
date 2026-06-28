import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });

      login(data.user, data.token);

      // redirect to dashboard
      const role = data.user.role;

      if (role === "Student") navigate("/student");
      else if (role === "Teacher") navigate("/teacher");
      else if (role === "Admin") navigate("/admin");
      else navigate("/dashboard");
          } catch (err) {
            alert("Login failed");
           }
        };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-6 border rounded w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
