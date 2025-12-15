import { useState } from "react";
import { signup } from "../api/auth";
import { useAuth } from "../context/AuthContent";
import { useNavigate,Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Signup() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await api.post("/auth/signup", {
                name,
                email,
                password
            });
            navigate("/", {
                state: { message: "Signup success. please login!!!" }
            });
        }
        catch (err: any) {
            state: { message: "Signup success. please login!!!" }
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button disabled={loading}>
                    {loading ? "Creating account.." : "Sign up"}
                </button>
            </form>
            <p>
                Already have an account?<Link to="/">Login</Link>
            </p>
        </div>
    )
}