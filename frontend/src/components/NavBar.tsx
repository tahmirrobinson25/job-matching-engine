import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const NavBar = () => {
    const navigate = useNavigate();

    const {currentUser, logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
    <nav
    className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm"
    >
        <Link
        to="/"
        className="flex flex-col"
        >
            <span className="text-xl font-bold text-violet-600">
            Job Matching Engine
            </span>

            <span className="text-sm text-zinc-500">
            Smarter Job Matching
            </span>

        </Link>
        {currentUser ? (
            <div className="flex items-center gap-4">

                <p className="text-sm text-zinc-700">
                   👤 {currentUser.email}
                </p>
                <button
                className="rounded bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        ) : (
            <div className="flex items-center gap-4">
                
                <Link
                to="/login"
                className="text-sm font-medium text-zinc-700 hover:text-violet-600"
                >
                    Login
                </Link>

                <Link
                className="text-sm font-medium text-zinc-700 hover:text-violet-600"
                to="/register">
                    Register
                </Link>
            
        </div>
        )}

    </nav>
    )
};