import axios from "axios";
import noPhoto from "../components/image/no-image-icon-23485.png";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "c53bc2a5df376f1e6a1bd1e8c9c3b4c1",
  include_adult: false,
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchTrendingMovies = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(`/trending/all/day`);
    return results.map(({ id, title, name, poster_path: poster }) => ({
      id,
      title: title || name || "Untitled",
      poster: poster ? IMAGE_BASE_URL + poster : noPhoto,
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    throw new Error("Failed to fetch trending movies.");
  }
};

export const searchMovies = async (query) => {
  try {
    const {
      data: { results },
    } = await axios.get(`/search/movie`, {
      params: { query },
    });
    return results.map(({ id, title, poster_path: poster }) => ({
      id,
      title: title || "Untitled",
      poster: poster ? IMAGE_BASE_URL + poster : noPhoto,
    }));
  } catch (error) {
    console.error("Error searching movies:", error.message);
    throw new Error("Failed to search movies.");
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const {
      data: {
        id,
        poster_path: poster,
        title,
        release_date: releaseYear,
        vote_average: userScore,
        overview,
        genres,
      },
    } = await axios.get(`/movie/${movieId}`);
    return {
      id,
      poster: poster ? IMAGE_BASE_URL + poster : noPhoto,
      title: title || "Untitled",
      releaseYear: releaseYear ? new Date(releaseYear).getFullYear() : "N/A",
      userScore: userScore ? Math.round(userScore * 10) : "N/A",
      overview: overview || "No overview available.",
      genres: genres || [],
    };
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw new Error("Failed to fetch movie details.");
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const {
      data: { cast },
    } = await axios.get(`/movie/${movieId}/credits`);
    return cast.map(({ id, name, character, profile_path: photo }) => ({
      id,
      name: name || "Unknown",
      character: character || "Unknown",
      photo: photo ? IMAGE_BASE_URL + photo : noPhoto,
    }));
  } catch (error) {
    console.error("Error fetching movie cast:", error.message);
    throw new Error("Failed to fetch movie cast.");
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const {
      data: { results },
    } = await axios.get(`/movie/${movieId}/reviews`);
    return results.map(({ id, author, content }) => ({
      id,
      author: author || "Anonymous",
      content: content || "No review content.",
    }));
  } catch (error) {
    console.error("Error fetching movie reviews:", error.message);
    throw new Error("Failed to fetch movie reviews.");
  }
};
