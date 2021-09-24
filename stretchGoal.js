// / Make an api call to the search/person endpoint
// Access actor/id 

const cast = {};

cast.discoverUrl = 'https://api.themoviedb.org/3/discover/movie'
cast.castApiUrl = `https://api.themoviedb.org/3/search/person`;
cast.apiKey = `e70332005f91b878abd0a2a43b066814`;

cast.getCastId = function(userInput) {
    const url = new URL(cast.castApiUrl);
    url.search = new URLSearchParams({
        api_key: cast.apiKey,
        query: userInput
    })
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData.results[0].id);
            cast.getMovies(jsonData.results[0].id);
        });
};

cast.getMovies = function(query) {
    const url = new URL(cast.discoverUrl);
    // const userEndYear = userYearSelection + 9
    url.search = new URLSearchParams({
        api_key: cast.apiKey,
        with_original_language: "en",
        // with_genres: userGenreSelection,
        with_cast: `${query}`
        // sort_by: 'vote_average.desc',
        // "vote_count.gte": 100,
        // "primary_release_date.gte": `${userYearSelection}-01-01`,
        // "primary_release_date.lte": `${userEndYear}-12-31`
        // release date keys need to be in quotes because of the dot notation
    })
    // console.log(url.search);
        fetch(url)
            .then(function(apiResponse){
            return apiResponse.json();
            })
            .then(function (jsonData) {
            console.log(jsonData.results);
            cast.displayCastMovie(jsonData.results);
        })
        };

cast.displayCastMovie = function(movies) {
    movies.forEach(function(movieItem) {

        const liElements = document.createElement('li');
            
            const movieTitle = document.createElement('h2');
            movieTitle.innerText = movieItem.original_title;
            
            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`;
            moviePoster.alt = movieItem.title;
            
            const movieOverview = document.createElement('p');
            movieOverview.innerText = movieItem.overview;
            
            liElements.append(movieTitle, moviePoster, movieOverview);
            
            const ulElement = document.querySelector('.printMovies');
            ulElement.appendChild(liElements);
    })
}

cast.cast = document.querySelector('#userQuerySearch');

cast.formEl = document.querySelector('form');
cast.formEl.addEventListener('submit', function(event) {
    document.querySelector('.printMovies').innerHTML = '';
    event.preventDefault();

    console.log(cast.cast.value);
    cast.getCastId(cast.cast.value);
})