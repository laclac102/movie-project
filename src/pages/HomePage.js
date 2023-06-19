import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import TrendingCard from "../components/TrendingCard";
import { Pagination } from "@mui/material";
import PopularMovie from "../components/PopularMovies";
function HomePage() {
  const auth = useAuth();
  let navigate = useNavigate();
  const [trending, setTrending] = useState();
  const [movieList, setMovieList] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetch = async () => {
      try {
        const trend = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const trending = trend.data.results;
        setTrending([...trending].slice(0, 5));
        const list = await apiService.get(
          `/trending/all/day?page=${page}&api_key=${API_KEY}`
        );
        const listItems = list.data.results;
        setMovieList(listItems);
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <TrendingCard items={trending} />
      <PopularMovie items={movieList} style={{ maxWidth: "100%" }} />
      {/* <Pagination
        count="10"
        variant="text"
        color="secondary"
        sx={{
          padding: "10px",
        }}
        onChange={(e, v) => setPage(v)}
      /> */}
    </div>
  );
}

export default HomePage;
