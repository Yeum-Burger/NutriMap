import {Box} from "@mui/material"
import Banner from "./banner.tsx";
import LatestCampaigns from "./latest_campaigns.tsx";

function LandingPage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5
        }}>
            <Banner />
            <LatestCampaigns />
        </Box>
    )
}
export default LandingPage;