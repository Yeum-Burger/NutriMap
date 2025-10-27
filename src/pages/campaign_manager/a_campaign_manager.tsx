import {Box, List, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import CampaignCard from "../../components/campaign_card.tsx";
import {getCampaignByID, getCampaignIDs} from "../../services/campaign_service.ts";

function A_CampaignManager() {
    const [sortedIds, setSortedIds] = useState<string[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function get_and_sort_campaigns() {
            try {
                const response = await getCampaignIDs();
                const ids = response.data;

                // Fetch all campaign details
                const campaignPromises = ids.map(id => getCampaignByID(id));
                const campaigns = await Promise.all(campaignPromises);

                // Sort campaigns by date
                const sorted = campaigns
                    .map(c => c.data)
                    .sort((a, b) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    })
                    .map(c => c.id);

                setSortedIds(sorted);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        get_and_sort_campaigns();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>Loading campaigns...</Typography>
            </Box>
        )
    }

    if (!sortedIds || sortedIds.length === 0) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>No campaigns found</Typography>
            </Box>
        )
    }

    const campaign = sortedIds.map((id) => (
        <CampaignCard key={id} id={id} hide_description={true} hide_org={true}/>
    ))

    return (
        <Box>
            <List>
                {campaign}
            </List>
        </Box>
    )
}
export default A_CampaignManager