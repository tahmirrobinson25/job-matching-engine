import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute = ({
    children,
}: ProtectedRouteProps) => {
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <p>loading...</p>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};