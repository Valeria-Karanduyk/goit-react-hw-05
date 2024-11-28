import { useState, useEffect } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { searchMovies } from "../../services/api";
import s from "./MoviePage.module.css";
import { MdSearch } from "react-icons/md";

const MoviePage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const location = useLocation();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    console.log("Current search query:", searchQuery);
    if (searchQuery) {
      searchMovies(searchQuery).then(setMovies);
    }
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchMovies(query);
      setMovies(response);
      setSearchParams({ query });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setQuery("");
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className={s.box}>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.input}
            type="text"
            value={query}
            onChange={onChange}
          />
          <button type="submit">
            <MdSearch className={s.btn} />
          </button>
        </form>
      </div>
      {movies.length > 0 && (
        <ul className={s.list}>
          {movies.map(({ id, title, poster }) => (
            <li className={s.item} key={id}>
              <Link
                className={s.link}
                to={`/movies/${id}`}
                state={{ from: location }}
              >
                <img className={s.img} src={poster} alt={title} />
                <div className={s.container}>
                  <h3>{title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviePage;
