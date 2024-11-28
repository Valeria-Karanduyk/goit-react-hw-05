import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/api";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className={s.box}>
      <h1 className={s.title}>Trending today</h1>
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
    </div>
  );
};

export default HomePage;
