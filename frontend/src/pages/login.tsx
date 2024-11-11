import { useState, FormEvent } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      router.push("/books");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
