import {
    CalendarTodayOutlined,
    CorporateFareOutlined,
    LocationOnOutlined,
    RemoveRedEyeOutlined
} from "@mui/icons-material";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import type {Campaign} from "../interfaces/interfaces.ts";
import {PATHS, USER_TYPES} from "../PATHS.ts";
import {useAuth} from "../services/auth_service.tsx";
import {getCampaignByID} from "../services/campaign_service.ts";
import theme from "../theme.ts";

interface CardProps {
    id: string
    hide_button?: boolean
    hide_org?: boolean
    hide_location?: boolean
    hide_date?: boolean
    hide_description?: boolean
    hide_status?: boolean
}
function CampaignCard({id, hide_button, hide_org, hide_location, hide_date, hide_description, hide_status}: CardProps) {
    const {user_type} = useAuth()
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const location = useLocation()
    const handle_click = () => {
        if (user_type === USER_TYPES.VOLUNTEER) {
            navigate(`${PATHS.CAMPAIGN_INFO}/${id}`);
        } else {
            if (location.pathname === '/dashboard/campaign-manager')
                navigate(`/dashboard/campaign-manager/${id}`);
            else if (location.pathname === '/dashboard/a-campaign-manager')
                navigate(`/dashboard/a-campaign-manager/${id}`)
            else
                navigate(`${PATHS.CAMPAIGN_MANAGER}/${id}`);
        }
    };
    const chip_color = () => {
        if (campaign?.status === 'approved')
            return theme.palette.primary.main
        else if (campaign?.status === 'rejected')
            return '#ff0000'
        else if (campaign?.status === 'pending')
            return 'orange'
    }

    useEffect(() => {
        async function get_campaign() {
            try {
                const response = await getCampaignByID(id)
                setCampaign(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        get_campaign()
    }, [id])

    if (loading) {
        return (
            <Typography variant={'body1'}>
                Loading . . .
            </Typography>
        )
    }
    if (!campaign) {
        return (
            <Typography variant={'body1'}>
                No Available Campaigns
            </Typography>
        )
    }

    return (
        <Card sx={{
            m: 1,
            p: 1
        }}>
            <CardHeader title={campaign.name} />
            <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 'fit-content',
            }}>
                {/* CAMPAIGN DETAILS */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    <Typography variant={'body1'} sx={{
                        display: !hide_org ? "flex" : "none",
                    }}>
                        <CorporateFareOutlined />
                        {campaign.organization_name}
                    </Typography>
                    <Typography variant={'body1'} sx={{
                        display: !hide_location ? "flex" : "none",
                    }}>
                        <LocationOnOutlined />
                        {campaign.location}
                    </Typography>
                    <Typography variant={'body1'} sx={{
                        display: !hide_date ? "flex" : "none",
                    }}>
                        <CalendarTodayOutlined />
                        {new Date(campaign.date).toLocaleDateString()}
                    </Typography>
                    <Chip label={campaign.status.toUpperCase()} sx={{
                        my: 1,
                        width: "fit-content",
                        display: !hide_status ? "flex" : "none",
                        backgroundColor: chip_color(),
                        color: theme.palette.primary.contrastText,
                    }}/>
                </Box>
                <Typography variant={'body1'}
                            sx={{
                                display: !hide_description? "-webkit-box" : "none",
                                textAlign: "justify",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: 3
                }}>
                    {campaign.description}
                </Typography>
            </CardContent>
            <CardActions sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}>
                <Button onClick={handle_click}
                        fullWidth
                        sx={{
                            display: !hide_button ? "flex" : "none",
                            gap: 1
                }}>
                    <RemoveRedEyeOutlined />
                    View
                </Button>
            </CardActions>
        </Card>
    )
}
export default CampaignCard