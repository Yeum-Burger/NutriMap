import {Box, Typography, Card} from "@mui/material"
import theme from "../../theme.ts";
import Banner from "./banner.tsx";
import LatestCampaigns from "./latest_campaigns.tsx";

function LandingPage() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5
        }}>
            <Banner />
            <LatestCampaigns />
            <Box sx={{
                px: '7.5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 4,
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.primary.main}`,
                }}>
                    <Typography variant={'h4'}>What is Nutrimap</Typography>
                    <Typography variant={'body1'} sx={{
                        textAlign: "center",
                    }}>
                        NutriMap is a community-driven platform dedicated to achieving UN Sustainable Development Goal 2: Zero Hunger.
                        Here in Dumaguete City, we connect volunteers with non-government organizations (NGOs) leading campaigns to fight hunger and malnutrition. NGOs can start new initiatives, which are reviewed and approved by the City Nutrition Council, ensuring transparency and community impact.

                        Together, we make it easier to organize, volunteer, and create lasting change — one campaign at a time.
                    </Typography>
                </Card>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 4,
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.primary.main}`,
                }}>
                    <Typography variant={'h4'}>Our Mission</Typography>
                    <Typography variant={'body1'} sx={{
                        textAlign: "center",
                    }}>
                        To eliminate hunger and malnutrition in Dumaguete City by empowering communities, connecting volunteers, and supporting organizations that provide food and nutrition assistance.
                    </Typography>
                </Card>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 4,
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.primary.main}`,
                }}>
                    <Typography variant={'h4'}>Our Vision</Typography>
                    <Typography variant={'body1'} sx={{
                        textAlign: "center",
                    }}>
                        A hunger-free Dumaguete where every citizen has access to nutritious food and the opportunity to contribute to a healthier, more sustainable future.
                    </Typography>
                </Card>
            </Box>
        </Box>
    )
}
export default LandingPage;