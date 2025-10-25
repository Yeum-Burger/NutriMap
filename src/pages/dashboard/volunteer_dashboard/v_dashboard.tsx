import {useContext} from "react";
import {mobile_context} from "../../../main.tsx";
import {Box} from "@mui/material"
import ActiveCampaigns from "./active_campaigns.tsx";
import VolunteerApplications from "./volunteer_applications.tsx";

function VolunteerDashboard() {
    const is_mobile = useContext(mobile_context)

    return (
        <Box sx={{
            display: "flex",
            flexDirection: is_mobile ? "column" : "row",
            gap: 2
        }}>
            <Box sx={{
                flexGrow: 3,
                width: is_mobile ? '100%' : "66%"
            }}>
                <ActiveCampaigns />
            </Box>
            <Box sx={{
                flexGrow: 1,
                width: is_mobile ? '100%' : "33%"
            }}>
                <VolunteerApplications />
            </Box>
        </Box>
    )
}
export default VolunteerDashboard