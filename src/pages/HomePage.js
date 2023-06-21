import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import TrendingCard from "../components/TrendingCard";
import MovieSwiper from "../components/MovieSwiper";
import GenresSwiper from "../components/GenresSwiper";
function HomePage() {
  const auth = useAuth();
  const [trending, setTrending] = useState();
  const [movieList, setMovieList] = useState();
  const [topRated, setTopRated] = useState();
  const [upcoming, setUpcoming] = useState();
  const [genres, setGenres] = useState();
  const [loading, setLoading] = useState(true);
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
          `/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
        );
        const ratedList = rated.data.results;
        setTopRated(ratedList);
        // Fetch upcoming movies
        const upcomin = await apiService.get(
          `/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
        );
        const upcomingList = upcomin.data.results;
        setUpcoming(upcomingList);
        // Fetch all genres
        const genresList = await apiService.get(
          `/genre/movie/list?language=en&api_key=${API_KEY}`
        );
        const genresLists = genresList.data.genres;
        console.log("genreslist", genresLists);
        setGenres(genresLists);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, []);
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
        padding: "3%",
      }}>
      <TrendingCard items={trending} style={{ maxWidth: "100%" }} />
      <GenresSwiper items={genres} style={{ maxWidth: "100%" }} />
      <MovieSwiper
        name="Popular"
        items={movieList}
        style={{ maxWidth: "100%" }}
      />
      <MovieSwiper
        name="Top Rated"
        items={topRated}
        style={{ maxWidth: "100%" }}
      />
      <MovieSwiper
        name="Upcoming"
        items={upcoming}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

export default HomePage;
