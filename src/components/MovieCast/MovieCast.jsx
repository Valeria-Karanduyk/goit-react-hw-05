import { fetchMovieCast } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCasts(data);
      } catch (err) {
        setError("Failed to fetch cast details.");
        console.error(err);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  return (
    <div className={s.box}>
      {casts.length > 0 ? (
        <ul className={s.list}>
          {casts.map(({ id, name, character, photo }) => (
            <li className={s.item} key={id}>
              <img className={s.img} src={photo} alt={name} />
              <div className={s.container}>
                <h3 className={s.title}>{name}</h3>
                <p className={s.description}>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.message}>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
