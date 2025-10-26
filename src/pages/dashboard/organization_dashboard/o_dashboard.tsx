import {Box} from "@mui/material"
import {useContext} from "react";
import {mobile_context} from "../../../mobile_context.ts";
import O_Heatmap from "./o_heatmap.tsx";
import OrganizationTools from "./o_tools.tsx";

function OrganizationDashboard() {
    const is_mobile = useContext(mobile_context)
    return (
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
                <OrganizationTools />
            </Box>
        </Box>
    )
}
export default OrganizationDashboard