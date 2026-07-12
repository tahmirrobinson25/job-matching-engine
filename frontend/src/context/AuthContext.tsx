import {
    useEffect,
    useState,
    createContext,
    type ReactNode,
} from "react";

type AuthUser = {
    id: number;
    email: string;
    createdAt: string;
};

type AuthContextType = {
    currentUser: AuthUser | null;
    loading: boolean;
    login: (user: AuthUser) => void;
    logout: () => void;
};

export const AuthContext =
    createContext<AuthContextType | null>(null);
export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [currentUser, setCurrentUser] =
        useState<AuthUser | null>(null);

    const [loading, setLoading] =
        useState(true);

    const login = (user: AuthUser) => {
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Authentication failed.");
            }

            const user: AuthUser = await response.json();

            setCurrentUser(user);
        } catch (error) {
            console.error(error);

            localStorage.removeItem("token");
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 