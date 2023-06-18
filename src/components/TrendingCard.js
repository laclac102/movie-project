import {
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
  "&:hover": { transform: "scale3d(1.2, 1.2, 1.2)" },
}));
function TrendingCard({ items }) {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  return (
    <Carousel sx={{ maxWidth: "400px" }}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Grid key={item.id}>
            <Card onClick={() => navigate(`/movie/${item.id}`)}>
              <CardActionArea>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${IMG_URL}${item.backdrop_path}`}
                    onMouseOver={() => setShowTitle(true)}
                    onMouseOut={() => setShowTitle(false)}
                  />{" "}
                  {showTitle && <Typography>{item.title}</Typography>}{" "}
                </StyledCard>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Carousel>
  );
}

export default TrendingCard;
