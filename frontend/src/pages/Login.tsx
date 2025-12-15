import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await login({ email, password });
        setUser(res.data.user);
        navigate("/dashboard");
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? ?<Link to="/signup">Signup</Link>
                </p>

            </form>
        </div>

    )
}