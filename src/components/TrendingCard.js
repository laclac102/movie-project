import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../api/config";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1.02)" },
}));
const style = {
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
function TrendingCard({ items }) {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  return (
    <>
      <Typography variant="h4">Top Trending</Typography>
      <Carousel sx={{ maxWidth: "400px" }}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Card onClick={() => navigate(`/movie/${item.id}`)}>
              <CardActionArea>
                <StyledCard sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${IMG_URL}${item.backdrop_path}`}
                    onMouseOver={() => setShowTitle(true)}
                    onMouseOut={() => setShowTitle(false)}
                  />
                  {showTitle && (
                    <Box style={style.title}>
                      <Typography variant="h5">{item.title}</Typography>
                    </Box>
                  )}{" "}
                </StyledCard>
              </CardActionArea>
            </Card>
          ))}
      </Carousel>
    </>
  );
}

export default TrendingCard;
