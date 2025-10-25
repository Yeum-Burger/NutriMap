import {Box} from "@mui/material";
import {useContext} from "react";
import {mobile_context} from "../../../main.tsx";
import O_Heatmap from "../organization_dashboard/o_heatmap.tsx";
import AdminTools from "./a_tools.tsx";

function AdminDashboard() {
    const is_mobile = useContext(mobile_context)
    return (
        <>
            <Box sx={{
                p: '2.5%',
                display: "flex",
                flexDirection: is_mobile ? "column" : "row",
                gap: 2
            }}>
                <Box sx={{
                    flexGrow: 3,
                    width: is_mobile ? '100%' : "66%"
                }}>
                    <O_Heatmap />
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    width: is_mobile ? '100%' : "33%"
                }}>
                    <AdminTools />
                </Box>
            </Box>
        </>
    )
}
export default AdminDashboard