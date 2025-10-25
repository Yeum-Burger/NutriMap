import CreateCampaignForm from "../../components/forms/create_campaign_form.tsx";
import {Box} from "@mui/material"
function CreateCampaign() {
    return (
        <Box sx={{
            p: '2.5%'
        }}>
            <CreateCampaignForm />
        </Box>
    )
}
export default CreateCampaign