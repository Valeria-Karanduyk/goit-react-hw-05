import s from "./MovieList.module.css";
import { IMAGE_BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";
const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <ul>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>
            <img
              src={`${IMAGE_BASE_URL}${poster_path}`}
              alt={title}
              width="100"
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
