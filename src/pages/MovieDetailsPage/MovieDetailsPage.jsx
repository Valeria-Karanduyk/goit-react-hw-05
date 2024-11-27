import s from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
// import {
//   MdReviews,
//   MdRecentActors,
//   MdHome,
//   MdOutlineKeyboardArrowLeft,
//   MdNewReleases,
//   MdGrade,
// } from "react-icons/md";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoader(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loader) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
