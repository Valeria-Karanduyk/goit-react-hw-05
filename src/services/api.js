import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNiYzJhNWRmMzc2ZjFlNmExYmQxZThjOWMzYjRjMSIsIm5iZiI6MTczMTk1NTkyOS41NTcwODYsInN1YiI6IjY3M2EwZTM2NTg1OWY5ODFlZWRmYzAzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2RtUvcs-hpPfqV6tAp2f6iyAO0dHRTymgGMNKIFRUk";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query },
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data.results;
};

const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
};

const fetchMovieCast = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data.cast;
};

const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data.results;
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  IMAGE_BASE_URL,
};
