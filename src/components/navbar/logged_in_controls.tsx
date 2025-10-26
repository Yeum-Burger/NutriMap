import {LogoutOutlined, MenuOutlined, PersonOutlined} from "@mui/icons-material";
import {Box, Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {mobile_context} from "../../mobile_context";
import {PATHS, USER_TYPES} from "../../PATHS.ts";
import {useAuth} from "../../services/auth_service.tsx";
import theme from "../../theme.ts";

interface Props {
    user_name: string | null
}
function LoggedInControls({user_name}: Props) {
    const navigate = useNavigate();
    const is_mobile = useContext(mobile_context)
    const {user, log_out, user_type} = useAuth()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log(`logged out: ${user}`);
        log_out()
        navigate(PATHS.HOME)
    }

    return (
        is_mobile
            // MOBILE
            ? <>
                <IconButton onClick={handleClick} sx={{
                    color: theme.palette.primary.contrastText,
                }}>
                    <MenuOutlined />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                >
                    <MenuItem>
                        <Typography variant="body1">
                            <PersonOutlined />
                            {user_type === USER_TYPES.ADMIN
                                ? 'admin'
                                : user_name
                            }
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(); handleLogout()}}>
                        <LogoutOutlined />
                        Log Out
                    </MenuItem>
                </Menu>
            </>
            // DESKTOP
            : <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <Typography variant={'button'}>
                    <PersonOutlined />
                    {user_type === USER_TYPES.ADMIN
                        ? 'admin'
                        : user_name
                    }
                </Typography>
                <Button
                    disableElevation
                    endIcon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
            </Box>
    )
}
export default LoggedInControls