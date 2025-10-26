import { Box, Container, Typography } from "@mui/material";

function LegalNotice() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Legal Notice
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
                Last Updated: October 26, 2025
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    1. General Information
                </Typography>
                <Typography paragraph>
                    NutriMap is a platform designed to facilitate nutrition awareness and community engagement through campaigns
                    and educational initiatives.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    2. Copyright Notice
                </Typography>
                <Typography paragraph>
                    All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads,
                    and software, is the property of NutriMap or its content suppliers and is protected by international copyright laws.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    3. Trademark Information
                </Typography>
                <Typography paragraph>
                    NutriMap and related logos are trademarks of NutriMap. All other trademarks appearing on this website are the property
                    of their respective owners.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    4. User-Generated Content
                </Typography>
                <Typography paragraph>
                    By submitting content to NutriMap, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
                    modify, adapt, publish, and distribute such content in connection with the service.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    5. Prohibited Uses
                </Typography>
                <Typography paragraph>
                    You may not use this website:
                </Typography>
                <Typography component="div" sx={{ pl: 2 }}>
                    <ul>
                        <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                        <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                        <li>To infringe upon or violate our intellectual property rights or the rights of others</li>
                        <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                        <li>To submit false or misleading information</li>
                        <li>To upload or transmit viruses or any other type of malicious code</li>
                        <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    </ul>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    6. Indemnification
                </Typography>
                <Typography paragraph>
                    You agree to defend, indemnify, and hold harmless NutriMap and its licensee and licensors, and their employees,
                    contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses,
                    liabilities, costs or debt, and expenses arising from your use of and access to the service.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    7. Limitation of Liability
                </Typography>
                <Typography paragraph>
                    In no event shall NutriMap, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    8. Disclaimer
                </Typography>
                <Typography paragraph>
                    Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis.
                    The service is provided without warranties of any kind, whether express or implied.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    9. Governing Law
                </Typography>
                <Typography paragraph>
                    These terms shall be governed and construed in accordance with applicable laws, without regard to its conflict
                    of law provisions.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    10. Severability
                </Typography>
                <Typography paragraph>
                    If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted
                    to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining
                    provisions will continue in full force and effect.
                </Typography>

                <Typography variant="h5" gutterBottom>
                    11. Contact Information
                </Typography>
                <Typography paragraph>
                    For any questions regarding this legal notice, please contact us through the NutriMap platform.
                </Typography>
            </Box>
        </Container>
    );
}

export default LegalNotice;
