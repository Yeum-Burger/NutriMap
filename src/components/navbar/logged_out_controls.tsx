import {LoginOutlined, MenuOutlined} from "@mui/icons-material";
import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {mobile_context} from "../../main.tsx";
import {PATHS} from "../../PATHS.ts";
import theme from "../../theme.ts";

function LoggedOutControls() {
    const is_mobile = useContext(mobile_context)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogin = () => {
        navigate(PATHS.LOGIN);
    }
    return (
        is_mobile
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
                    <MenuItem onClick={() => {handleClose(); handleLogin()}}>
                        <LoginOutlined />
                        Log In
                    </MenuItem>
                </Menu>
            </>
            // DESKTOP
            : <>
                <Button
                    disableElevation
                    startIcon={<LoginOutlined />}
                    onClick={handleLogin}
                >
                    Log In
                </Button>
            </>
    )
}
export default LoggedOutControls