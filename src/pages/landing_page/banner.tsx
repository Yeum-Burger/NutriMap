import {ArrowForwardIosOutlined} from "@mui/icons-material";
import {Box, Button, Typography} from "@mui/material";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import banner from "../../assets/banner.jpg";
import {mobile_context} from "../../mobile_context";
import {PATHS} from "../../PATHS.ts";
import theme from "../../theme.ts";

function Banner() {
    const is_mobile = useContext(mobile_context);
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: "center",
        }}>
            <img src={banner} alt={'banner'} style={{
                width: "100%",
                filter: "brightness(50%)",
                display: "block",
                objectFit: "cover",
            }}/>
            <Box sx={{
                height: "100%",
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
                <Typography variant={'h1'} sx={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "bold",
                }}>
                    Zero Hunger Starts Here
                </Typography>
                <Button endIcon={<ArrowForwardIosOutlined />}
                        onClick={() => navigate(PATHS.JOIN)}
                        sx={{
                            width: "fit-content",
                            p: is_mobile ? 1 : 2
                        }}>
                    Start Making a Difference
                </Button>
            </Box>
        </Box>
    )
}
export default Banner