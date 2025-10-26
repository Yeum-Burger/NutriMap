import {Box, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import CampaignCard from "../../components/campaign_card.tsx";
import Carousel from "../../components/carousel.tsx";
import {mobile_context} from "../../mobile_context";
import {getApprovedCampaignIDs} from "../../services/campaign_service.ts";

function LatestCampaigns() {
    const is_mobile = useContext(mobile_context)
    const [ids, setIds] = useState<string[] | null>(null)

    useEffect(() => {
        async function get_campaign_ids() {
            try {
                const response = await getApprovedCampaignIDs(3)
                setIds(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        get_campaign_ids()
    }, [])

    // ARRAY OF CAMPAIGN CARDS
    if (!ids) return null
    const campaigns = ids.map((id) => (
        <Box key={id} sx={{ flex: '1 1 0', minWidth: 0, display: 'flex' }}>
            <CampaignCard id={id} hide_status={true} hide_button={true} />
        </Box>
    ))

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'stretch',
            gap: 2,
        }}>
            <Typography variant={'h3'}>Latest Campaigns</Typography>
            {is_mobile
                ? <Carousel _items={campaigns} />
                : <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    px: '2.5%',
                    width: '100%',
                    alignItems: 'stretch'
                }}>
                    {campaigns}
                </Box>
            }
        </Box>
    )
}
export default LatestCampaigns