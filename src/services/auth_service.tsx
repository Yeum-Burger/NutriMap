import {createContext, type ReactNode, useContext, useState} from "react";
import type {LogInFormData, User} from "../interfaces/interfaces.ts";
import {mockAdmin, mockOrganizations, mockVolunteers} from "../interfaces/mock_data.ts";
import {USER_TYPES} from "../PATHS.ts";
import {delay} from "./global_service.ts";

interface Auth {
    user: User | null
    logged_in: boolean
    user_type: string | null
    log_in: (log_in_data: LogInFormData) => Promise<void>
    log_out: () => void
}
const AuthContext = createContext<Auth>({
    user: null,
    logged_in: false,
    user_type: null,
    log_in: async (_log_in_data:LogInFormData) => {},
    log_out: () => {}
});
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [logged_in, setLoggedIn] = useState(false);
    const [user_type, setUserType] = useState<string | null>(null);

    const log_in = async (log_in_data: LogInFormData) => {
        let u_type: string | null = null;

        // pass a callback to receive the type
        const verifiedUser = await verifyLogInData(log_in_data, (t: string) => { u_type = t; });

        if (!verifiedUser) {
            throw new Error('Incorrect account details');
        }

        setUser(verifiedUser);
        setUserType(u_type);
        setLoggedIn(true);

        // use local variable 'type' because setState is async
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        localStorage.setItem('logged_in', 'true');
        localStorage.setItem('user_type', JSON.stringify(u_type));

        console.log("User:", verifiedUser);
        console.log("type:", u_type);
    };

    const log_out = () => {
        setUser(null);
        setLoggedIn(false);
        setUserType(null);
        localStorage.removeItem('user');
        localStorage.removeItem('logged_in');
        localStorage.removeItem('user_type');
    };

    const auth_value: Auth = {
        user,
        logged_in,
        user_type,
        log_in,
        log_out,
    };

    return <AuthContext.Provider value={auth_value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}


async function verifyLogInData(
    data: LogInFormData,
    assign_type: (type: string) => void
) {
    await delay(400);

    const volunteer = mockVolunteers.find(v => v.email === data.email);
    const organization = mockOrganizations.find(o => o.email === data.email);
    const admin = mockAdmin.find(a => a.email === data.email);

    if (!volunteer && !organization && !admin) return null; // account does not exist
    if ((volunteer && volunteer.password !== data.password) ||
        (organization && organization.password !== data.password) ||
        (admin && admin.password !== data.password)) {
        return null; // incorrect password
    }

    // call callback to assign type
    volunteer ? assign_type(USER_TYPES.VOLUNTEER)
        : organization ? assign_type(USER_TYPES.ORGANIZATION)
        : assign_type(USER_TYPES.ADMIN)

    return volunteer ?? organization ?? admin;
}
