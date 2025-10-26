import {Box, Link} from "@mui/material"
import {useContext} from "react";
import {mobile_context} from "../../mobile_context";

function Footer() {
    const is_mobile = useContext(mobile_context)
    return (
        <footer>
            <Box sx={{
                backgroundColor: '#d9d9d9',
                display: "flex",
                flexDirection: "column",
                alignItems: is_mobile ? "center" : "start",
                justifyContent: "space-around",
                px: '2.5%',
                py: is_mobile ? '5%' : '2.5%',
                marginTop: '5%',
                gap: 1,
            }}>
                <Link href={'/terms-of-service'}
                      variant={'body2'}
                      underline={'hover'}
                      color={'black'}
                >
                    Terms of Service
                </Link>
                <Link href={'/privacy-statement'}
                      variant={'body2'}
                      underline={'hover'}
                      color={'black'}
                >
                    Privacy Statement
                </Link>
                <Link href={'/legal-notice'}
                      variant={'body2'}
                      underline={'hover'}
                      color={'black'}
                >
                    Legal Notice
                </Link>
                <Link href={'/'}
                      variant={'body2'}
                      underline={'hover'}
                      color={'black'}
                >
                    NutriMap
                </Link>
            </Box>
        </footer>
    )
}
export default Footer