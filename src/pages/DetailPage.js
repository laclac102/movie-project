import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY, IMG_URL } from "../api/config";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Stack } from "@mui/system";
import MovieSwiper from "../components/MovieSwiper";
import notfound from "../404image.png";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
function DetailPage() {
  let params = useParams();
  const [loading, setLoading] = useState();
  const [movie, setMovie] = useState();
  const [similar, setSimilar] = useState();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const detail = await apiService.get(
          `/movie/${params.id}?language=en-US&api_key=${API_KEY}`
        );
        const movies = detail.data;
        setMovie(movies);
        //Fetch similar movies
        const similarMovies = await apiService.get(
          `/movie/${params.id}/similar?language=en-US&api_key=${API_KEY}`
        );

        const similarList = similarMovies.data.results;
        setSimilar(similarList);
        //Fetch favorite list
        const favorite = await apiService.get(
          `/account/20024063/favorite/movies?language=en-US`,
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM",
            },
          }
        );
        const favList = favorite.data.results;
        const add = favList.find((item, index) => item.id === params.id);
        setAdded(add);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [params]);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        //Fetch favorite list
        const favorite = await apiService.get(
          `/account/20024063/favorite/movies?language=en-US`,
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM",
            },
          }
        );
        const favList = favorite.data.results;
        const add = favList.find((item, index) => item.id == params.id);
        add ? setAdded(true) : setAdded(false);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [added]);
  const addFavorite = async () => {
    try {
      if (added) {
        await apiService.post(
          `/account/20024063/favorite`,
          {
            media_type: "movie",
            media_id: `${params.id}`,
            favorite: false,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM",
            },
          }
        );
      } else {
        await apiService.post(
          `/account/20024063/favorite`,
          {
            media_type: "movie",
            media_id: `${params.id}`,
            favorite: true,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWU3MzBmZjQ5ZWEzNmU0MjcxYjA0NzkyZDg0M2IwYSIsInN1YiI6IjY0OGQ1NDYyNTU5ZDIyMDBhZDgxZDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQEI7vSospxCzaxNtKVqm9CvyjKz_pzKmkatm1LZVAM",
            },
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
    added ? setAdded(false) : setAdded(true);
  };
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        padding: "10px",
      }}>
      <Card sx={{ backgroundColor: "transparent", position: "relative" }}>
        {movie && movie.backdrop_path ? (
          <CardMedia
            sx={{ maxHeight: "50vh", maxWidth: "100vh" }}
            component="img"
            image={movie && `${IMG_URL}${movie.backdrop_path}`}
          />
        ) : (
          <CardMedia
            sx={{ maxHeight: "50vh", maxWidth: "100vh" }}
            component="img"
            image={notfound}
          />
        )}

        <CardActions sx={{ position: "absolute", bottom: 0 }}>
          <IconButton sx={{ backgroundColor: "#191825" }}>
            <PlayCircleIcon color="secondary" />
          </IconButton>
          <IconButton
            sx={{ backgroundColor: "#191825" }}
            aria-label="add to favorites">
            {added == true ? (
              <PlaylistAddCheckIcon color="secondary" onClick={addFavorite} />
            ) : (
              <PlaylistAddIcon color="secondary" onClick={addFavorite} />
            )}
          </IconButton>
          <IconButton sx={{ backgroundColor: "#191825" }} aria-label="like">
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
      {similar && similar.length > 0 ? (
        <MovieSwiper
          name="You might like these"
          items={similar}
          style={{
            maxWidth: "100vh",
            height: "20vh",
            backgroundColor: "#171b20",
          }}
        />
      ) : (
        <Typography variant="body" color="primary.contrastText">
          No similar movies found
        </Typography>
      )}
    </Card>
  );
}

export default DetailPage;
