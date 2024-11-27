import { fetchMovieCast } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams("movieId");
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCredits);
  }, [movieId]);

  return (
    <div className={s.box}>
      {credits.length > 0 && (
        <ul className={s.list}>
          {credits.map(({ id, name, character, profile_path }) => {
            return (
              <li className={s.item} key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={name}
                />
                <div className={s.container}>
                  <h3 className={s.title}>{name}</h3>
                  <p className={s.description}>Character: {character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
