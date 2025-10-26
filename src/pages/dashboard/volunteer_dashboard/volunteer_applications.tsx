import {Box, List, Paper, Typography} from "@mui/material"
import {useContext, useEffect, useState} from "react";
import ApplicationCard from "../../../components/application_card.tsx";
import Carousel from "../../../components/carousel.tsx";
import {mobile_context} from "../../../mobile_context.ts";
import {useAuth} from "../../../services/auth_service.tsx";
import {getApplicationIDs} from "../../../services/volunteer_application_service.ts";

function VolunteerApplications() {
    const { user } = useAuth()
    const is_mobile = useContext(mobile_context)
    const [ids, setIds] = useState<string[] | null>(null)

    useEffect(() => {
        async function get_application_ids() {
            try {
                const response = await getApplicationIDs(user?.id)
                setIds(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        get_application_ids()
    }, [])

    if (!ids) return null
    const applications = ids.map((id) => (
        <ApplicationCard key={id} id={id} />
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
                Volunteer Applications
            </Typography>
            <Carousel _items={applications} />
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
                Volunteer Applications
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
                    {applications}
                </List>
            </Box>
        </Paper>
}
export default VolunteerApplications