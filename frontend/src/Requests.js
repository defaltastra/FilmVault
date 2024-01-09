const key = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = 'http://127.0.0.1:8000'; // Update with your Laravel API URL

const requests = {
  requestPopular: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `${baseUrl}/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `${baseUrl}/movies/trending?api_key=${key}&language=en-US&page=1`,
  requestHorror: `${baseUrl}/search-movies/horror?api_key=${key}&language=en-US&page=1&include_adult=false`,
  requestUpcoming: `${baseUrl}/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export default requests;
