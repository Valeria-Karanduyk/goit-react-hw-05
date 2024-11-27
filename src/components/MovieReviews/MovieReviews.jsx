import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import s from "./MovieReviews.module.css";
import { MdPerson } from "react-icons/md";

const MovieReview = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError("Failed to fetch movie reviews.");
      } finally {
        setLoader(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loader) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <>
      {loader && <Loader />}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
      {reviews &&
        (reviews.results.length ? (
          <ul>
            {reviews.results.map((review) => (
              <li key={review.id} className={s.review}>
                <p>
                  <MdPerson />
                  &nbsp;
                  {review.author}
                </p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.notFound}>No reviews...</div>
        ))}
    </>
  );
};

export default MovieReview;
