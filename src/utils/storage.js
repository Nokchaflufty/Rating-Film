const STORAGE_KEY = 'movie_ratings';

export const saveRating = (movieId, rating) => {
  const ratings = getRatings();
  ratings[movieId] = {
    rating,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
};

export const getRating = (movieId) => {
  const ratings = getRatings();
  return ratings[movieId]?.rating || null;
};

export const getRatings = () => {
  const ratings = localStorage.getItem(STORAGE_KEY);
  return ratings ? JSON.parse(ratings) : {};
};

export const deleteRating = (movieId) => {
  const ratings = getRatings();
  delete ratings[movieId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
};