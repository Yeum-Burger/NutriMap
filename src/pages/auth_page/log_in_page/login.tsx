import {Box, Typography} from "@mui/material"
import LogInForm from "../../../components/forms/login_form.tsx";

function LogIn() {
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
            <LogInForm />
        </Box>
    )
}
export default LogIn