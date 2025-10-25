import {Paper, Typography, Box, Button} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CampaignCard from "../../../components/campaign_card.tsx";
import {mobile_context} from "../../../main.tsx";
import {PATHS} from "../../../PATHS.ts";
import {useAuth} from "../../../services/auth_service.tsx";
import {getCampaignIDs} from "../../../services/campaign_service.ts";

function OrganizationTools () {
    const is_mobile = useContext(mobile_context)
    const { user } = useAuth()
    const [ids, setIds] = useState<string[] | null>(null)
    const navigate = useNavigate();
    const handle_click = (path: string) => {
        navigate(path)
    }

    useEffect(() => {
        if (!user) return;

        async function get_campaign_ids() {
            if (!user || !user.id) return;
            try {
                const response = await getCampaignIDs(1, user.id);
                setIds(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        get_campaign_ids();
    }, [user?.id]);

    if (!ids) return null
    const campaign = ids.map((id) => (
        <CampaignCard key={id} id={id} />
    ))

    return (
        <Paper sx={{
            p: 1,
            display: 'flex',
            flexDirection: is_mobile ? 'column-reverse' : 'column',
            alignItems: 'stretch',
            gap: 2
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: is_mobile ? 'center' : 'stretch',
                gap: 1
            }}>
                <Typography variant="h3">Recent Campaign</Typography>
                <Box>
                    {campaign}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Button onClick={() => {handle_click(PATHS.CREATE_CAMPAIGN)}}
                >
                    Create a New Campaign
                </Button>
                <Button onClick={() => {handle_click(PATHS.CAMPAIGN_MANAGER)}}
                >
                    Campaign Manager
                </Button>
            </Box>
        </Paper>
    )
}
export default OrganizationTools