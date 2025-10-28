import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {LogInFormData, User} from "../interfaces/interfaces.ts";
import {USER_TYPES} from "../PATHS.ts";
import {supabase} from "./supabase_client.ts";

interface Auth {
    user: User | null
    logged_in: boolean
    user_type: string | null
    log_in: (log_in_data: LogInFormData) => Promise<void>
    log_out: () => Promise<void>
}
const AuthContext = createContext<Auth>({
    user: null,
    logged_in: false,
    user_type: null,
    log_in: async (_log_in_data:LogInFormData) => {},
    log_out: async () => {}
});
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [logged_in, setLoggedIn] = useState(false);
    const [user_type, setUserType] = useState<string | null>(null);

    useEffect(() => {
        // Check for existing session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                loadUserProfile(session.user.email!);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                loadUserProfile(session.user.email!);
            } else {
                setUser(null);
                setLoggedIn(false);
                setUserType(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadUserProfile = async (email: string) => {
        // Check if user is a volunteer
        const { data: volunteer } = await supabase
            .from('Volunteer')
            .select('*')
            .eq('email', email)
            .single();

        if (volunteer) {
            setUser({ id: volunteer.id, email: volunteer.email });
            setUserType(USER_TYPES.VOLUNTEER);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify({ id: volunteer.id, email: volunteer.email }));
            localStorage.setItem('user_type', JSON.stringify(USER_TYPES.VOLUNTEER));
            return;
        }

        // Check if user is an organization
        const { data: organization } = await supabase
            .from('Organization')
            .select('*')
            .eq('email', email)
            .single();

        if (organization) {
            setUser({ id: organization.id, email: organization.email });
            setUserType(USER_TYPES.ORGANIZATION);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify({ id: organization.id, email: organization.email }));
            localStorage.setItem('user_type', JSON.stringify(USER_TYPES.ORGANIZATION));
            return;
        }
    };

    const log_in = async (log_in_data: LogInFormData) => {
        // Check if email exists in volunteers table
        const { data: volunteer } = await supabase
            .from('Volunteer')
            .select('*')
            .eq('email', log_in_data.email)
            .single();

        if (volunteer) {
            setUser({ id: volunteer.id, email: volunteer.email });
            setUserType(USER_TYPES.VOLUNTEER);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify({ id: volunteer.id, email: volunteer.email }));
            localStorage.setItem('user_type', JSON.stringify(USER_TYPES.VOLUNTEER));
            return;
        }

        // Check if email exists in organizations table
        const { data: organization } = await supabase
            .from('Organization')
            .select('*')
            .eq('email', log_in_data.email)
            .single();

        if (organization) {
            setUser({ id: organization.id, email: organization.email });
            setUserType(USER_TYPES.ORGANIZATION);
            setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify({ id: organization.id, email: organization.email }));
            localStorage.setItem('user_type', JSON.stringify(USER_TYPES.ORGANIZATION));
            return;
        }

        throw new Error('Email not found in system');
    };

    const log_out = async () => {
        await supabase.auth.signOut();
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
