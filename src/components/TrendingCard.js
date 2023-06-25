import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
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
    bgcolor: "rgba(0, 0, 0, 0.54)",
    color: "white",
    padding: "10px",
  },
};
function TrendingCard({ items }) {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  return (
    <Carousel sx={{ width: "80%" }}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Card>
            <CardActionArea>
              <StyledCard sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={`${IMG_URL}${item.backdrop_path}`}
                  onMouseOver={() => setShowTitle(true)}
                  onMouseOut={() => setShowTitle(false)}
                  onClick={() => navigate(`/movie/${item.id}`)}
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
  );
}

export default TrendingCard;
