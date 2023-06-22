import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../api/config";
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const style = {
  title: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    zIndex: 2,
  },
};
function MovieSwiper({ name, items, ...others }) {
  const navigate = useNavigate();
  return (
    <>
      <Typography sx={{ color: "#FB2576", marginTop: "10px" }} variant="h3">
        {name} Movies
      </Typography>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
        navigation
        centeredSlides={true}
        loop={true}
        {...others}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <SwiperSlide style={{ padding: "5px" }}>
              <Card
                onClick={() => navigate(`/movie/${item.id}`)}
                className="netflix-container">
                <CardMedia
                  className="netflix-items"
                  sx={{
                    position: "absolute",
                    maxHeight: "500px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  component="img"
                  id={item.id}
                  image={`${IMG_URL}${item.backdrop_path}`}
                />
                <Box className="hide" style={style.title}>
                  <Typography>{item.title ? item.title : item.name}</Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default MovieSwiper;
