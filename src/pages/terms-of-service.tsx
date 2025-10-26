import { Box, Container, Typography } from "@mui/material";

function TermsOfService() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Terms of Service
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
                Last Updated: October 26, 2025
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    1. Acceptance of Terms
                </Typography>
                <Typography paragraph>
                    By accessing and using NutriMap, you accept and agree to be bound by the terms and provision of this agreement.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    2. Use License
                </Typography>
                <Typography paragraph>
                    Permission is granted to temporarily access the materials on NutriMap for personal, non-commercial transitory viewing only.
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software contained on NutriMap</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    3. Disclaimer
                </Typography>
                <Typography paragraph>
                    The materials on NutriMap are provided on an 'as is' basis. NutriMap makes no warranties, expressed or implied,
                    and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions
                    of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    4. Limitations
                </Typography>
                <Typography paragraph>
                    In no event shall NutriMap or its suppliers be liable for any damages (including, without limitation, damages for loss of data
                    or profit, or due to business interruption) arising out of the use or inability to use the materials on NutriMap.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    5. Accuracy of Materials
                </Typography>
                <Typography paragraph>
                    The materials appearing on NutriMap could include technical, typographical, or photographic errors. NutriMap does not warrant
                    that any of the materials on its website are accurate, complete or current.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    6. Links
                </Typography>
                <Typography paragraph>
                    NutriMap has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
                    The inclusion of any link does not imply endorsement by NutriMap of the site. Use of any such linked website is at the user's own risk.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    7. Modifications
                </Typography>
                <Typography paragraph>
                    NutriMap may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by
                    the then current version of these terms of service.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    8. Governing Law
                </Typography>
                <Typography paragraph>
                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the
                    exclusive jurisdiction of the courts in that location.
                </Typography>
            </Box>
        </Container>
    );
}

export default TermsOfService;
