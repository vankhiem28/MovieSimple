export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const keyApi = "b8cc1f2a76c54c51545b0078bdde8a3c";
const urlDB = "https://api.themoviedb.org/3/movie";
export const movieDB = {
  getMovieList: (type) => `${urlDB}/${type}?api_key=${keyApi}`,
  getMovieDetails: (movieID) => `${urlDB}/${movieID}?api_key=${keyApi}`,
  getMovieCredits: (movieID) => `${urlDB}/${movieID}/credits?api_key=${keyApi}`,
  getMovieTrailer: (movieID) => `${urlDB}/${movieID}/videos?api_key=${keyApi}`,
  getMovieSimilar: (movieID) => `${urlDB}/${movieID}/similar?api_key=${keyApi}`,
  getMoviesPage: () => `${urlDB}/popular?api_key=${keyApi}`,
};
