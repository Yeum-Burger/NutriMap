// src/components/carousel.tsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowForwardIosOutlined, ArrowBackIosOutlined } from "@mui/icons-material";

interface ArrowButtonProps {
    onClick?: () => void;
    direction: "left" | "right";
}

// Custom ArrowButton Component (Reusable)
function ArrowButton({ onClick, direction }: ArrowButtonProps) {
    const isRight = direction === "right";

    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                [isRight ? "right" : "left"]: -16,
                transform: "translateY(-50%)",
                color: "black",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "none",
                zIndex: 2,
                '&: hover': {
                    backgroundColor: "transparent",
                }
            }}
        >
            {isRight ? <ArrowForwardIosOutlined /> : <ArrowBackIosOutlined />}
        </IconButton>
    );
}

// React Slick wrapper
interface CarouselProps {
    _items: React.ReactNode[],
}

function Carousel({ _items }: CarouselProps) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <ArrowButton direction="right" />,
        prevArrow: <ArrowButton direction="left" />,
    }
    const items = _items.map((item, i) => (
        <Box key={i} sx={{
            px: 2
        }}>
            {item}
        </Box>
    ))

    return (
        <Box sx={{
            position: "relative",
            width: "100%",
            maxWidth: '90vw' }}>
            <Slider {...settings}>
                {items}
            </Slider>
        </Box>
    );
}

export default Carousel;
