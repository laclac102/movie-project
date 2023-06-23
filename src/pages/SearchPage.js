import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Grid } from "@mui/material";
import MovieList from "../components/MovieList";

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
        }
        if (params.genre) {
          const results = await apiService.get(
            `/discover/movie?with_genres=${params.genre}&api_key=${API_KEY}`
          );
          const result = results.data.results;
          setResult(result);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [params]);
  return (
    <>
      <Grid container spacing={3} mt={1}>
        {result &&
          result.map((item, index) => (
            <Grid key={item.id} item xs={6} md={4} lg={3}>
              <MovieList id={item.id} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default SearchPage;
