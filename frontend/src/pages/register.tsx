import { useState, FormEvent } from "react";
import { registerUser } from "../services/api";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
