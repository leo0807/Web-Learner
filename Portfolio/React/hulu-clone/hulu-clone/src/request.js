const API_KEY = 'd3dfc6ef9d533a396f4d6e3ddac9bdc3';

export default {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&lwidth_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&width_genres=35`,
    fetchHorroMovies: `/discover/movie?api_key=${API_KEY}&width_genres=27`,
    fetchRomanceMovies: `/trending/all/week?api_key=${API_KEY}&width_genres=10749`,
    fetchMystery: `/trending/all/week?api_key=${API_KEY}&lwidth_genres=9648`,
    fetchSciFi: `/trending/all/week?api_key=${API_KEY}&width_genres=878`,
    fetchWestern: `/trending/all/week?api_key=${API_KEY}&width_genres=37`,
    fetchAnimation: `/trending/all/week?api_key=${API_KEY}&width_genres=16`,
    fetchTV: `/trending/all/week?api_key=${API_KEY}&width_genres=10770`,
    // fetchSciFi: `/trending/all/week?api_key=${API_KEY}&width_genres=878`,
}