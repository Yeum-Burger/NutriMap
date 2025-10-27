import {LocationOnOutlined, MailOutline} from "@mui/icons-material";
import {Box, Typography} from "@mui/material"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Organization} from "../../interfaces/interfaces.ts";
import {getUserByID} from "../../services/user_service.ts";

function A_OrganizationInfo () {
    const {id} = useParams<{ id: string }>();
    const [organization, setOrganization] = useState<Organization>()
    const [loading, setLoading] = useState<boolean>(true)

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
            </Box>
        </Box>
    )
}
export default A_OrganizationInfo