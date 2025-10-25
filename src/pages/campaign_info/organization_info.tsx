import {LocationOnOutlined, MailOutline} from "@mui/icons-material";
import {Box, Typography, Chip, Button} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Organization} from "../../interfaces/interfaces.ts";
import {getUserByID, updateOrganizationStatus} from "../../services/user_service.ts";
import theme from "../../theme.ts";

function A_OrganizationInfo () {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization>()
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)

    useEffect(() => {
        async function get_campaign() {
            try {
                const response = await getUserByID(id)
                setOrganization(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        get_campaign()
    }, [id])

    const handleApprove = async () => {
        setUpdating(true)
        try {
            await updateOrganizationStatus(id, 'approved')
            setOrganization(prev => prev ? {...prev, status: 'approved'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    const handleReject = async () => {
        setUpdating(true)
        try {
            await updateOrganizationStatus(id, 'rejected')
            setOrganization(prev => prev ? {...prev, status: 'rejected'} : prev)
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    const chip_color = () => {
        if (organization?.status === 'approved')
            return theme.palette.primary.main
        else if (organization?.status === 'rejected')
            return '#ff0000'
        else if (organization?.status === 'pending')
            return 'orange'
    }

    if (loading) {
        return (
            <Typography variant={'body1'}>
                Loading . . .
            </Typography>
        )
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            <Typography variant={'h3'}>
                {organization?.organization_name}
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
                <Typography variant={'body1'}>
                    <MailOutline />
                    {organization?.email}
                </Typography>
                <Typography variant={'body1'}>
                    <LocationOnOutlined />
                    {organization?.address}
                </Typography>
                <Chip label={organization?.status.toUpperCase()} sx={{
                    my: 1,
                    width: "fit-content",
                    backgroundColor: chip_color(),
                    color: theme.palette.primary.contrastText,
                }}/>
            </Box>

            {organization?.status === 'pending' && (
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 2
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApprove}
                        disabled={updating}
                        fullWidth
                    >
                        Approve Organization
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReject}
                        disabled={updating}
                        fullWidth
                    >
                        Reject Organization
                    </Button>
                </Box>
            )}
        </Box>
    )
}
export default A_OrganizationInfo