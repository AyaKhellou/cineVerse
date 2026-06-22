const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
    const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&include_adult=false`
    );

    const data = await response.json();

    return data.results;
}

export async function getGenres() {
    const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );

    const data = await response.json();

    return data.genres;
}

export async function getMovies() {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false`
    );

    const data = await response.json();

    return data.results;
}

export async function getMovie(id) {
    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );

    return response.json();
}

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );

    const data = await response.json();

    return data.results;
}

export async function getMoviesByGenres(genreIds) {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}`
    );

    const data = await response.json();

    return data.results;
}