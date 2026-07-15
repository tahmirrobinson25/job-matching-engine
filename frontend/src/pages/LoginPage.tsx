import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { API_URL } from "../config/api";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError (data.error || "Incorrect email or password");
                return;
            }

            localStorage.setItem("token", data.token);

            const userResponse = await fetch(
                `${API_URL}/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            if (!userResponse.ok) {
                throw new Error ("Unable to fetch user");
            }

            const user = await userResponse.json();

            login(user);

            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mt-16 max-w-md rounded-lg border p-8 shadow">
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold">
                    Sign-in
                </h1>

                <p className="mt-2 text-gray-600">
                    Login to your Account
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <div>
                    <label className="mb-1 block font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full rounded border p-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Password
                    </label>
                    
                    <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full rounded border p-2 pr-10"
                        required
                    />
                    <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => 
                        setShowPassword(!showPassword)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    >
                        {
                            showPassword
                            ? <EyeOff size={20} />
                            : <Eye size={20} />
                        }
                    </button>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-violet-600 p-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-medium text-violet-600 hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>
    );
};