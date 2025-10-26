import {Box, List, Paper, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import CampaignCard from "../../../components/campaign_card.tsx";
import Carousel from "../../../components/carousel.tsx";
import {mobile_context} from "../../../mobile_context.ts";
import {getApprovedCampaignIDs} from "../../../services/campaign_service.ts";

function ActiveCampaigns() {
    const is_mobile = useContext(mobile_context)
    const [ids, setIds] = useState<string[] | null>(null)

    useEffect(() => {
        async function get_approved_campaign_ids() {
            try {
                const response = await getApprovedCampaignIDs()
                setIds(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        get_approved_campaign_ids()
    }, [])
    if (!ids) return null
    const campaigns = ids.map((id) => (
        <CampaignCard key={id} id={id} hide_status={true} />
    ))
    return is_mobile
        ? <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
        }}>
            <Typography variant={'h3'} sx={{
                position: 'sticky',
                top: 0,
            }}>
                Active Campaigns
            </Typography>
            <Carousel _items={campaigns} />
        </Box>
        : <Paper sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: is_mobile ? 'center' : 'stretch',
            gap: 2,
            height: "70vh"
        }}>
            <Typography variant={'h3'} sx={{
                position: 'sticky',
                top: 0,
            }}>
                Active Campaigns
            </Typography>
            <Box sx={{
                flexGrow: 1,
                overflowY: "auto",
            }}>
                <List sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    {campaigns}
                </List>
            </Box>
        </Paper>
}
export default ActiveCampaigns