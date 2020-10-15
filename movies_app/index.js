const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_TERM = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="; 

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
const logo = document.getElementById('logo');

getMovies(API_URL);

async function getMovies(url) {
    const movies = await (await fetch(url)).json().then(data => {
        return data.results;
    });

    showMovies(movies);
}

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${IMG_PATH + movie.poster_path}">
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <span>${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview: </h4>
                ${movie.overview}
            </div>
        `

        main.appendChild(movieEl);
    });
}

logo.addEventListener("click", () => {
    getMovies(API_URL);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_TERM + searchTerm);

        search.value = '';
    }
});