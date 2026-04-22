import axios from 'axios';

const API_KEY = 'd7bb74c0ed86d5f4db07e7a05da94784';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'id-ID',
  },
});

export const movieAPI = {
  getPopularMovies: async (page = 1) => {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data;
  },

  searchMovies: async (query, page = 1) => {
    const response = await api.get('/search/movie', { 
      params: { query, page } 
    });
    return response.data;
  },

  getMovieDetails: async (movieId) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  getMoviesByGenre: async (genreId, page = 1) => {
    const response = await api.get('/discover/movie', {
      params: { with_genres: genreId, page },
    });
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get('/genre/movie/list');
    return response.data;
  },

  getMovieCredits: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  },
};

export { IMAGE_BASE_URL };