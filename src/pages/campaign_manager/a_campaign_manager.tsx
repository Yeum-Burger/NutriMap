import {Box, List} from "@mui/material"
import {useEffect, useState} from "react";
import CampaignCard from "../../components/campaign_card.tsx";
import {getCampaignIDs} from "../../services/campaign_service.ts";

function A_CampaignManager() {
    const [ids, setIds] = useState<string[] | null>(null)

    useEffect(() => {
        async function get_campaign_ids() {
            try {
                const response = await getCampaignIDs();
                setIds(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        get_campaign_ids();
    }, []);

    if (!ids) return null
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
export default A_CampaignManager