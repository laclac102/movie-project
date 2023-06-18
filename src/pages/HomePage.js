import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import TrendingCard from "../components/TrendingCard";
import { Pagination } from "@mui/material";

function HomePage() {
  const auth = useAuth();
  let navigate = useNavigate();
  const [trending, setTrending] = useState();
  const [movieList, setMovieList] = useState();
  const [page, setPage] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiService.get(
          `/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrending([...result].slice(0, 5));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, [page]);
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <TrendingCard items={trending} />
      <Pagination
        count="10"
        variant="text"
        color="secondary"
        sx={{
          padding: "10px",
        }}
        onChange={(e, v) => setPage(v)}
      />
    </div>
  );
}

export default HomePage;
