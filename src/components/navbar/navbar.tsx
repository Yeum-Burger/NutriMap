import {AppBar, Toolbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../PATHS.ts";
import {useAuth} from "../../services/auth_service.tsx";
import {getUserName} from "../../services/user_service.ts";
import LoggedInControls from "./logged_in_controls.tsx";
import LoggedOutControls from "./logged_out_controls.tsx";

function AccountControls() {
    const [user_name, setUserName] = useState<string | null>(null);
    const {user, logged_in, user_type} = useAuth();

    useEffect(() => {
        async function get_user_name() {
            try {
                const response = await getUserName(user?.id, user_type)
                setUserName(response ?? null);
            } catch (error) {
                console.log(error)
            }
        }
        get_user_name();
    }, [logged_in, user?.id, user_type])

    return (
        logged_in
            ? <LoggedInControls user_name={user_name}/>
            : <LoggedOutControls />
    )
}

function NavBar() {
    const navigate = useNavigate();
    const { logged_in } = useAuth();
    return (
        <header>
            <AppBar sx={{
            }}>
                <Toolbar>
                    <Typography variant={'h3'}
                                onClick={() => navigate(logged_in ? PATHS.DASHBOARD : PATHS.HOME)}
                    >
                        NutriMap
                    </Typography>
                    <span style={{flexGrow: 1}} />
                    <AccountControls/>
                </Toolbar>
            </AppBar>
        </header>
    )
}
export default NavBar