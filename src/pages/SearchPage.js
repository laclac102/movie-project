import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import MovieList from "../components/MovieList";

import { Link as RouterLink } from "react-router-dom";

function SearchPage() {
  let params = useParams();
  const [loading, setLoading] = useState();
  const [result, setResult] = useState();
  console.log("params: ", params);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        // Fetch results
        if (params.q) {
          const results = await apiService.get(
            `/search/keyword?query=${params.q}&page=1?language=en-US&api_key=${API_KEY}`
          );
          const result = results.data.results;
          setResult(result);
        } else if (params.genre) {
          const results = await apiService.get(
            `/discover/movie?with_genres=${params.genre}&api_key=${API_KEY}`
          );
          const result = results.data.results;
          setResult(result);
        } else {
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
          console.log("fav", favList);
          setResult(favList);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [params]);
  console.log("rwsultsLL ", result);
  return (
    <>
      {result ? (
        <Grid container spacing={3} mt={1} sx={{ padding: "5px" }}>
          {result.map((item, index) => (
            <Grid key={item.id} item xs={6} md={4} lg={3}>
              <MovieList id={item.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Container
          sx={{ display: "flex", height: "100%", alignItems: "center" }}>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography
              variant="h4"
              paragraph
              sx={{ color: "primary.contrastText" }}>
              There is no movies avaible!
            </Typography>
            <Button to="/" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </Container>
      )}
      =
    </>
  );
}

export default SearchPage;
