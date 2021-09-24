// ===================== PSEUDO CODE =============================
// - Create a movie app object (namespace)
// - Create an init method and call it at the end of our code so it runs as soon as the page is done loading
// - Fetch genre and discover APIS
//     - Store url and key in variables for cleaner code and 
// - Use genre endpoint to access genre id and name
    // - Dynamically create option elements using the genre id/name
    // - Append in the genre select section
// - Use querySelector to get our form element and store it in a variable
// - Add an event listener to our form element so when the user selects genre and year and submits, movie items can print on page
    // - Passing user option value to the API call function to replace query parameter
    // - Upon user’s submission, make an API call, get movies based on year and genre selection
    // - Loop through the array of API data and append 10 searches on page

// ============ STRETCH GOALS 
// Fetch API URL for cast/person search endpoint
// Get user's input of actor/actress name and replace with query parameter
// Upon user submission, make an API call and print 10 movies with the actor/actress that the user has chosen

// ==================== START OF JS ===============================
// 1. 
const movieApp = {}

// 3.
movieApp.discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
movieApp.listUrl = 'https://api.themoviedb.org/3/genre/movie/list';
movieApp.apiKey = 'e70332005f91b878abd0a2a43b066814';


// =========== Getting list of genres from endpoint =================================
// store url & query info
movieApp.populateOptions = () => {
    const url = new URL(movieApp.listUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey
    });
    // console.log(url.search)

// make the api call & return the json object
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        console.log(jsonResponse)
    // call the print function while sending the json response to it
            // the array of genres is one level inside the json object, so need to say 'jsonResponse.genres'
    movieApp.printDropdowns(jsonResponse.genres)
    });
};

// function to print genres to dropdown menus
movieApp.printDropdowns = (genreData) => {
    const genreDropdown = document.querySelector('#genre'); /* select dropdown menu */
    console.log(genreDropdown)
    console.log(genreData)
    genreData.forEach((item) => {
        const dropdownItem = document.createElement('option'); /* create the new elements */
        dropdownItem.value = item.id; /* Populate each option with value code for making queries later */
        dropdownItem.innerText = item.name; /* Populate each option with name of genre for user to see */
        genreDropdown.appendChild(dropdownItem); /* place new elements inside dropdown menu */
    });
};

// 4.
movieApp.getMovies = function(userGenreSelection, userYearSelection) {
    const url = new URL(movieApp.discoverUrl);
    const userEndYear = userYearSelection + 9
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        with_original_language: "en",
        with_genres: userGenreSelection,
        sort_by: 'vote_average.desc',
        "vote_count.gte": 100,
        "primary_release_date.gte": `${userYearSelection}-01-01`,
        "primary_release_date.lte": `${userEndYear}-12-31`
        // release date keys need to be in quotes because of the dot notation

    })
        console.log(url.search)
    fetch(url)
    .then(function(apiResponse){
        return apiResponse.json();
    })
    .then(function (jsonData) {
        
        movieApp.displayMovie(jsonData.results);
    })
};

// 6.
movieApp.displayMovie = function(movies) {
    movies.forEach(function(movieItem) {
        console.log(movieItem);
        const liElements = document.createElement('li');
        
<<<<<<< HEAD
        movies.forEach(function(movieItem) {
            console.log(movieItem);
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
        });
    });
};

// 5. Call this function in the genre api call function because there are no elements to attach this to until genre options are dynamically created
movieApp.getGenreId = function() {
    document.querySelector('#genre').addEventListener('click', function() {
        movieApp.getMovies(this.value);
=======
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
>>>>>>> master
    });
};

// variables to store the user selections
movieApp.year = document.querySelector('#year');
movieApp.genre = document.querySelector('#genre')

const formEl = document.querySelector('.userSubmit');
    formEl.addEventListener('submit', function(event) {
        document.querySelector('.printMovies').innerHTML = '';
        event.preventDefault();
        console.log(movieApp.year.value)
        console.log(movieApp.genre.value)

        // get inputs from form selections and send them to the getMovies function
        movieApp.getMovies(movieApp.genre.value, Number(movieApp.year.value))
})


// initializer
movieApp.init = function() {
    // run function to populate genre dropdown
    movieApp.populateOptions();
    // movieApp.getCast();
};

movieApp.init();
