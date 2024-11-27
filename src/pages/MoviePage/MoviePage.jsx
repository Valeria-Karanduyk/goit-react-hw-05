import s from "./MoviePage.module.css";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../services/api";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      setError("Failed to fetch movies.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loader && <Loader />}
      {error && <Error message={error} />}
      {!loader && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviePage;
