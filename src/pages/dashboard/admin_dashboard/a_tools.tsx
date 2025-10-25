import {Box, Button, Paper, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../../PATHS.ts";

function AdminTools () {
    const navigate = useNavigate();
    const handle_click = (path: string) => {
        navigate(path)
    }

    return (
        <Paper sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 2
        }}>
            <Typography variant="h3">Admin Tools</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Button onClick={() => {handle_click(PATHS.A_ORG_MANAGER)}}
                >
                    Organization Manager
                </Button>
                <Button onClick={() => {handle_click(PATHS.A_CAMPAIGN_MANAGER)}}
                >
                    Campaign Manager
                </Button>
            </Box>
        </Paper>
    )
}
export default AdminTools