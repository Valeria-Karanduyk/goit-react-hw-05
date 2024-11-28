import { useState, useEffect } from "react";
import s from "./MovieDetailsPage.module.css";
import {
  useParams,
  Outlet,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = location.state?.from ?? "/movies";

  const { poster, title, releaseYear, userScore, overview, genres } =
    movie ?? {};

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const backToMovies = () => {
    navigate(goBack);
  };

  return (
    <div>
      <button className={s.btn} type="button" onClick={backToMovies}>
        Back to movies
      </button>
      {movie && (
        <div>
          <div className={s.container}>
            <img className={s.img} src={poster} alt={title} />
            <div className={s.info}>
              <h2 className={s.title}>
                {title} ({releaseYear})
              </h2>
              <p>User Score: {userScore}%</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genres.map(({ name }) => name).join(" ")}</p>
            </div>
          </div>

          <h2 className={s.addInfo}>Additional information</h2>

          <ul className={s.list}>
            <li>
              <Link
                className={s.link}
                to={"cast"}
                state={{ from: location?.state?.from }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={s.link}
                to={"reviews"}
                state={{ from: location?.state?.from }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
