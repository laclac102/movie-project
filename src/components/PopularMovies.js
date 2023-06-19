import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../api/config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "@emotion/styled";

const style = {
  swiper: {
    padding: "10px",
    maxWidth: "100%",
    minHeight: "150px",
  },
  title: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    // bgcolor: "rgba(0, 0, 0, 0.54)",
    color: "white",
    padding: "10px",
  },
};
function PopularMovie({ items }) {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  console.log(showTitle);
  return (
    <>
      <Typography>Popular Movies</Typography>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
        pagination={{ clickable: true }}
        navigation
        style={style.swiper}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <SwiperSlide>
              <Card
                onClick={() => navigate(`/movie/${item.id}`)}
                className="netflix-container"
                onMouseOver={() => setShowTitle(true)}
                onMouseOut={() => setShowTitle(false)}>
                <CardMedia
                  className="netflix-items"
                  sx={{ position: "absolute" }}
                  component="img"
                  image={`${IMG_URL}${item.backdrop_path}`}
                />
                {showTitle && (
                  <Box style={style.title}>
                    <Typography key={item.id} sx={{ color: "white" }}>
                      {item.title ? item.title : item.name}
                    </Typography>
                  </Box>
                )}{" "}
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default PopularMovie;
