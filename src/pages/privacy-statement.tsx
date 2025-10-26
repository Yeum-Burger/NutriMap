import { Box, Container, Typography } from "@mui/material";

function PrivacyStatement() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Privacy Statement
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
                Last Updated: October 26, 2025
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    1. Information We Collect
                </Typography>
                <Typography paragraph>
                    We collect information that you provide directly to us, including when you create an account, participate in campaigns,
                    or contact us for support. This may include:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>Name and contact information</li>
                        <li>Account credentials</li>
                        <li>Profile information</li>
                        <li>Campaign participation data</li>
                        <li>Communication preferences</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    2. How We Use Your Information
                </Typography>
                <Typography paragraph>
                    We use the information we collect to:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process and complete transactions</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, prevent, and address technical issues</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    3. Information Sharing
                </Typography>
                <Typography paragraph>
                    We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described
                    in this privacy statement. We may share your information with:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>Service providers who assist in our operations</li>
                        <li>Legal authorities when required by law</li>
                        <li>Other parties with your consent</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    4. Data Security
                </Typography>
                <Typography paragraph>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized
                    or unlawful processing, accidental loss, destruction, or damage.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    5. Your Rights
                </Typography>
                <Typography paragraph>
                    You have the right to:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your information</li>
                        <li>Object to processing of your information</li>
                        <li>Request transfer of your information</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    6. Cookies and Tracking
                </Typography>
                <Typography paragraph>
                    We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    7. Children's Privacy
                </Typography>
                <Typography paragraph>
                    Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information
                    from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal
                    information, please contact us.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    8. Changes to This Privacy Statement
                </Typography>
                <Typography paragraph>
                    We may update our Privacy Statement from time to time. We will notify you of any changes by posting the new Privacy Statement
                    on this page and updating the "Last Updated" date.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    9. Contact Us
                </Typography>
                <Typography paragraph>
                    If you have any questions about this Privacy Statement, please contact us through the NutriMap platform.
                </Typography>
            </Box>
        </Container>
    );
}

export default PrivacyStatement;
