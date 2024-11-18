import axios from "axios";

// const API_KEY = "c53bc2a5df376f1e6a1bd1e8c9c3b4c1";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNiYzJhNWRmMzc2ZjFlNmExYmQxZThjOWMzYjRjMSIsIm5iZiI6MTczMTk1NTkyOS41NTcwODYsInN1YiI6IjY3M2EwZTM2NTg1OWY5ODFlZWRmYzAzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2RtUvcs-hpPfqV6tAp2f6iyAO0dHRTymgGMNKIFRUk";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
  },
};

const searchMovie = async (query, page = 1) => {
  if (!query) return console.log("Query is empty!");
  const response = await axios(`search/movie`, {
    ...options,
    params: { ...options.params, include_adult: false, query, page },
  });
  return response.data;
};
const trendingMovie = async (page = 1) => {
  const response = await axios(`trending/movie/day`, {
    ...options,
    params: {
      ...options.params,
      include_adult: false,
      page,
    },
  });
  return response.data;
};
const detailsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}`, options);
  return response.data;
};
const reviewsMovie = async (movieId, page = 1) => {
  const response = await axios(`movie/${movieId}/reviews`, {
    ...options,
    params: { ...options.params, page },
  });
  return response.data;
};
const creditsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}/credits`, options);
  return response.data;
};
export { searchMovie, trendingMovie, detailsMovie, reviewsMovie, creditsMovie };
