import { Link, useLocation } from "react-router-dom";
const MovieList = ({ list }) => {
  const location = useLocation();
  if (!list || list.length === 0) {
    return <p>No movies available</p>;
  }
  return (
    <>
      <ul className={s.list}>
        {list.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={s.item}
            >
              <img
                src={
                  movie.photo
                    ? `https://image.tmdb.org/t/p/w500${movie.photo}`
                    : "default-image-path.jpg"
                }
                alt={`${movie.title} poster`}
              />
              <div className={s.details}>
                <p>{movie.title}</p>
                <p>{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
