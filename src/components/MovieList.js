import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY, IMG_URL } from "../api/config";
import notfound from "../404image.png";

function MovieList({ id }) {
  const style = {
    title: {
      position: "absolute",
      width: "87%",
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
    },
  };
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        // Fetch results
        const detail = await apiService.get(
          `/movie/${id}?language=en-US&api_key=${API_KEY}`
        );
        const movies = detail.data;
        setMovie(movies);
        console.log(movies);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, [id]);
  return (
    <>
      <Card
        sx={{ position: "relative", backgroundColor: "#171b20" }}
        className="netflix-container"
        onClick={() => navigate(`/movie/${id}`)}>
        {movie && movie.backdrop_path ? (
          <CardMedia
            sx={{ borderRadius: "10px" }}
            className="netflix-items"
            height="200"
            component="img"
            image={movie && `${IMG_URL}${movie.backdrop_path}`}
          />
        ) : (
          <CardMedia
            sx={{ borderRadius: "10px" }}
            className="netflix-items"
            height="200"
            component="img"
            image={notfound}
          />
        )}
        <Box className="hide" style={style.title}>
          <Typography>{movie && movie.title && movie.title}</Typography>
        </Box>
      </Card>
    </>
  );
}

export default MovieList;
