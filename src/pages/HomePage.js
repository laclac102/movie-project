import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import TrendingCard from "../components/TrendingCard";
import MovieSwiper from "../components/MovieSwiper";
import GenresSwiper from "../components/GenresSwiper";
import { Pagination } from "@mui/material";

function HomePage() {
  const auth = useAuth();
  const [trending, setTrending] = useState();
  const [movieList, setMovieList] = useState();
  const [topRated, setTopRated] = useState();
  const [upcoming, setUpcoming] = useState();
  const [genres, setGenres] = useState();
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        // Fetch top 5 trending movies
        const trend = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const trending = trend.data.results;
        setTrending([...trending].slice(0, 5));
        // Fetch all trending movies
        setMovieList(trending);
        // Fetch top rated movies
        const rated = await apiService.get(
          `/movie/top_rated?language=en-US&page=${page}&api_key=${API_KEY}`
        );
        const ratedList = rated.data.results;
        setTopRated(ratedList);
        // Fetch upcoming movies
        const upcomin = await apiService.get(
          `/movie/upcoming?language=en-US&page=${page}&api_key=${API_KEY}`
        );
        const upcomingList = upcomin.data.results;
        setUpcoming(upcomingList);
        // Fetch all genres
        const genresList = await apiService.get(
          `/genre/movie/list?language=en&api_key=${API_KEY}`
        );
        const genresLists = genresList.data.genres;
        setGenres(genresLists);
        //Fetch favorite list
        const favorite = await apiService.get(
          `/account/20024063/favorite/movies?language=en-USpage=${page}`,
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
        setFav(favList);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [page]);
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "5px",
      }}>
      <TrendingCard items={trending} style={{ maxWidth: "100%" }} />
      <GenresSwiper items={genres} style={{ maxWidth: "100%" }} />
      {fav && fav.length > 0 && (
        <MovieSwiper
          name="You Favorite"
          items={fav}
          style={{
            width: "100%",
            minHeight: "150px",
            backgroundColor: "#111111ff",
          }}
        />
      )}

      <MovieSwiper
        name="Popular"
        items={movieList}
        style={{
          maxWidth: "100%",
          minHeight: "150px",
          backgroundColor: "#111111ff",
        }}
      />
      <MovieSwiper
        name="Top Rated"
        items={topRated}
        style={{
          maxWidth: "100%",
          minHeight: "150px",
          backgroundColor: "#111111ff",
        }}
      />
      <MovieSwiper
        name="Upcoming"
        items={upcoming}
        style={{
          maxWidth: "100%",
          minHeight: "150px",
          backgroundColor: "#111111ff",
        }}
      />
      <Pagination
        count={10}
        variant="text"
        color="primary"
        sx={{
          padding: "10px",
          color: "white",
        }}
        onChange={(e, v) => setPage(v)}
      />
    </div>
  );
}

export default HomePage;
