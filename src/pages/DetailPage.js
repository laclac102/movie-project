import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY, IMG_URL } from "../api/config";
import { Movie } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Button } from "@mui/base";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Stack } from "@mui/system";
function DetailPage() {
  let params = useParams();
  const [loading, setLoading] = useState();
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        // Fetch top 5 trending movies
        const data = await apiService.get(
          `/movie/${params.id}?language=en-US&api_key=${API_KEY}`
        );
        const movies = data.data;
        setMovie(movies);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, []);
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
      }}>
      <Card sx={{ backgroundColor: "transparent", position: "relative" }}>
        <CardMedia
          sx={{ maxHeight: "50vh", maxWidth: "100vh" }}
          component="img"
          image={movie && `${IMG_URL}${movie.backdrop_path}`}
        />

        <CardActions sx={{ position: "absolute", bottom: 0 }}>
          <IconButton>
            <PlayCircleIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <AddCircleIcon color="secondary" />
          </IconButton>
          <IconButton aria-label="like">
            <ThumbUpIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
      <Typography variant="h2" color="secondary.contrastText">
        {movie && movie.original_title}
      </Typography>
      <Stack direction="row" spacing={2}>
        {movie &&
          movie.genres &&
          movie.genres.length > 0 &&
          movie.genres.map((item, index) => (
            <Chip
              key={item.id}
              variant="filled"
              label={item.name}
              color="secondary"
            />
          ))}
      </Stack>
      <CardContent sx={{ maxWidth: "100vh" }}>
        <Typography variant="body" color="secondary.contrastText">
          {movie && movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DetailPage;
