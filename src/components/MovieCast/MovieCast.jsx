import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError("Failed to fetch movie cast.");
      } finally {
        setLoader(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loader) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(({ id, name, profile_path }) => (
          <li key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
            />
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
