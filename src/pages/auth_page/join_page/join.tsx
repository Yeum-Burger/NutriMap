import {Box, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useContext, useState} from "react";
import OrganizationForm from "../../../components/forms/organization_form.tsx";
import VolunteerForm from "../../../components/forms/volunteer_form.tsx";
import {mobile_context} from "../../../mobile_context";
import {USER_TYPES} from "../../../PATHS.ts";

function Join () {
    const is_mobile = useContext(mobile_context)
    const [form, setForm] = useState<string>(USER_TYPES.VOLUNTEER)
    const handleForm = (
        _e: React.MouseEvent<HTMLElement>,
        new_value: string) => {
        setForm(new_value)
    }
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            my: '10%'
        }}>
            <Typography variant={'h2'}>
                NutriMap
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: is_mobile ? "65%" : "40%",

            }}>
                <Typography variant={'subtitle1'} sx={{
                    m: 'auto'
                }}>Are you a ...</Typography>
                <ToggleButtonGroup
                    value={form}
                    exclusive={true}
                    onChange={handleForm}
                    color={"primary"}
                    sx={{
                        m: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        width: '100%',
                    }}
                >
                    <ToggleButton value={USER_TYPES.VOLUNTEER} sx={{
                        width: '100%',
                        borderRadius: 4
                    }}>
                        Volunteer
                    </ToggleButton>
                    <ToggleButton value={USER_TYPES.ORGANIZATION} sx={{
                        width: '100%',
                        borderRadius: 4
                    }}>
                        Organization
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {form === USER_TYPES.VOLUNTEER
                ? <VolunteerForm />
                : <OrganizationForm />
            }
        </Box>
    )
}
export default Join