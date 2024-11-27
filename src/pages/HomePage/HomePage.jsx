import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../services/api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError("Failed to fetch trending movies.");
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loader && <Loader />}
      {error && <Error message={error} />}
      {!loader && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
