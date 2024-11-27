import { fetchMovieReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "./MovieReviews.module.css";

const MovieReview = () => {
  const { movieId } = useParams("movieId");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <div className={s.box}>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </div>
  );
};

export default MovieReview;
