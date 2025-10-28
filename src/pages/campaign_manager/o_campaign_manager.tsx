import {Box, List} from "@mui/material"
import {useEffect, useState} from "react";
import CampaignCard from "../../components/campaign_card.tsx";
import {useAuth} from "../../services/auth_service.tsx";
import {getCampaignIDs} from "../../services/campaign_service.ts";

function O_CampaignManager() {
    const { user } = useAuth()
    const [ids, setIds] = useState<number[] | null>(null)

    useEffect(() => {
        if (!user) return;

        async function get_campaign_ids() {
            if (!user || !user.id) return;
            try {
                const response = await getCampaignIDs(undefined ,user.id);
                setIds(response.data);
            } catch (error) {
                console.log(error);
                setIds([]);
            }
        }

        get_campaign_ids();
    }, [user?.id]);

    if (!ids) return null
    
    if (ids.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant={'h5'}>No campaigns found for your organization.</Typography>
                <Typography variant={'body2'}>Create a new campaign to get started.</Typography>
            </Box>
        )
    }
    
    const campaign = ids.map((id) => (
        <CampaignCard key={id} id={id} hide_description={true} hide_org={true}/>
    ))
    return (
        <Box sx={{

        }}>
            <List>
                {campaign}
            </List>
        </Box>
    )
}
export default O_CampaignManager