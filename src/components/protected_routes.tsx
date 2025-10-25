import type {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/auth_service";
import {PATHS, USER_TYPES} from "../PATHS";

// Protected Route - Must be logged in
export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { logged_in } = useAuth();

    if (!logged_in) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    return <>{children}</>;
}

// Role-based Route - Must be specific user type
export function RoleBasedRoute({
   children,
   allowedType
}: {
    children: ReactNode;
    allowedType: typeof USER_TYPES.VOLUNTEER | typeof USER_TYPES.ORGANIZATION | typeof USER_TYPES.ADMIN;
}) {
    const { user_type, logged_in } = useAuth();

    if (!logged_in) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    if (user_type !== allowedType) {
        // Redirect to appropriate dashboard based on user type
        return <Navigate to={PATHS.DASHBOARD} replace />;
    }

    return <>{children}</>;
}

// Public Only Route - Redirect to dashboard if logged in
export function PublicOnlyRoute({ children }: { children: ReactNode }) {
    const { logged_in } = useAuth();

    if (logged_in) {
        return <Navigate to={PATHS.DASHBOARD} replace />;
    }

    return <>{children}</>;
}