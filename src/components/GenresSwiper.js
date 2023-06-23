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
  swiper: {
    padding: "10px",
    maxWidth: "100%",
    minHeight: "150px",
    backgroundColor: "#171b20",
  },
};
function GenresSwiper({ items }) {
  const navigate = useNavigate();
  console.log("genres", items);
  return (
    <>
      <Typography sx={{ color: "#FB2576" }} variant="h3">
        Genres
      </Typography>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
        navigation
        centeredSlides={true}
        loop={true}
        style={style.swiper}>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <SwiperSlide style={{ position: "relative" }}>
              <Card
                onClick={() => navigate(`/genres/${item.id}`)}
                className="netflix-container genres"
                sx={{
                  maxHeight: "200px",
                  minHeight: "100px",
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                }}>
                <CardContent
                  className="netflix-items"
                  sx={{
                    height: "100%",
                    color: "white",
                    position: "relative",
                    left: "25%",
                  }}>
                  <Typography variant="h8">
                    {item.title ? item.title : item.name}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default GenresSwiper;
