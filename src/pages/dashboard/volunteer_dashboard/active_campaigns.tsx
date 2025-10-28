import {Box, List, Paper, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import CampaignCard from "../../../components/campaign_card.tsx";
import Carousel from "../../../components/carousel.tsx";
import {mobile_context} from "../../../mobile_context.ts";
import {getCampaignIDs} from "../../../services/campaign_service.ts";

function ActiveCampaigns() {
    const is_mobile = useContext(mobile_context)
    const [ids, setIds] = useState<number[] | null>(null)

    useEffect(() => {
        async function get_campaign_ids() {
            try {
                const response = await getCampaignIDs()
                setIds(response.data)
            } catch (error) {
                console.log(error)
                setIds([])
            }
        }
        get_campaign_ids()
    }, [])
    if (!ids) return null
    
    if (ids.length === 0) {
        return (
            <Paper sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}>
                <Typography variant={'h3'}>Active Campaigns</Typography>
                <Typography variant={'body1'}>No campaigns available at the moment.</Typography>
            </Paper>
        )
    }
    
    const campaigns = ids.map((id) => (
        <CampaignCard key={id} id={id} />
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