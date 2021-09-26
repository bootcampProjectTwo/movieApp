// / - Create an app object
// - Create an init method and call it at the end of our js file
// - Fetch genre and discover apis
//     - Store url and key in variables for cleaner code
// - Use genre endpoint to get genre id and name
    // - Dynamically create option elements using the genre id/name
    // - Append in the genre select section
// - Use querySelector to get our form element and store it in a variable
//     - Add an event listener to our form element
// - Store user input’s value in a variable using query Selector
// - Upon user’s click, make an API call, get movies based on year and genre selection
// - Go through the array and append 10 picks on the page

// 1. movieApp.populateOptions();// Makes API call to get genre with ids
// 2. movieApp.printDropdowns(); // Creates elements and inserts genre ids in value attribute
// 3. movieApp.getCastId(); // Makes API call to get cast's id with user's input
// 4. movieApp.getMovies(); // Makes API call to get movie's list with parameters provided
// 5. movieApp.displayMovie(); // Displays movies on page
// 6. movieApp.formEl // Event listener that triggers the API call function

// 1. ==========
const movieApp = {}

// 3.
movieApp.discoverUrl = 'https://api.themoviedb.org/3/discover/movie';
movieApp.listUrl = 'https://api.themoviedb.org/3/genre/movie/list';
movieApp.castUrl = 'https://api.themoviedb.org/3/search/person'
movieApp.apiKey = 'e70332005f91b878abd0a2a43b066814';


// =========== Getting list of genres from endpoint =================================
// store url & query info
movieApp.populateOptions = () => {
    const url = new URL(movieApp.listUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey
    })
// make the Discover API call to get list of movies
    fetch(url)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
            return response.json();
            } else {
                throw Error(apiResponse.statusText);
            }
        })
        .then((jsonResponse) => {
        // call the print function while sending the json response to it
                // the array of genres is one level inside the json object, so need to say 'jsonResponse.genres'
        movieApp.printDropdowns(jsonResponse.genres)
        }).catch((error) => {
            console.log(error)
            movieApp.resultsError(error);
        });
};

// function to print genres to dropdown menus
movieApp.printDropdowns = (genreData) => {
    const genreDropdown = document.querySelector('#genre'); /* select dropdown menu */

    genreData.forEach((item) => {
        const dropdownItem = document.createElement('option'); /* create the new elements */
        dropdownItem.value = item.id; /* Populate each option with value code for making queries later */
        dropdownItem.innerText = item.name; /* Populate each option with name of genre for user to see */
        genreDropdown.appendChild(dropdownItem); /* place new elements inside dropdown menu */
    });
};

// Function to get cast id
movieApp.getCastId = function(userInput) {
    const url = new URL(movieApp.castUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        query: userInput
    })
    fetch(url)
        .then(function(response) {
            if(response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error (apiResponse.statusText);
            }

        })
        .then(function(jsonData) {
            movieApp.getMovies(movieApp.genre.value, Number(movieApp.year.value),`${jsonData.results[0].id}`)
        }).catch((error) => {
            console.log(error)
            movieApp.resultsError(error)
        })
};

// 4.
movieApp.getMovies = function(userGenreSelection, userYearSelection, userInputId) {

let url = new URL(movieApp.discoverUrl);
const userEndYear = userYearSelection + 9

const SearchParams = {
    api_key: movieApp.apiKey,
    with_original_language: "en",
    sort_by: 'vote_average.desc',
    "vote_count.gte": 1000,
    with_genres: userGenreSelection,
    "primary_release_date.gte": `${userYearSelection}-01-01`,
    "primary_release_date.lte": `${userEndYear}-12-31`,
    with_cast: `${userInputId}`
    // release date keys need to be in quotes because of the dot notation
}
const deleteParams = () => {
    if (movieApp.cast.value === '') {
        delete SearchParams.with_cast
    }
    if (movieApp.year.value === '') {
        delete SearchParams["primary_release_date.gte"]
        delete SearchParams["primary_release_date.lte"]
    }
    if (movieApp.genre.value === '') {
        delete SearchParams.with_genres
    }
}

deleteParams()

url.search = new URLSearchParams(SearchParams)

    fetch(url)
    .then(function(apiResponse){
        if (apiResponse.status >= 200 && apiResponse.status <= 299) {
            return apiResponse.json();
        } else {
            throw Error(apiResponse.statusText);
        }
    })
    .then(function (jsonData) {
        movieApp.displayMovie(jsonData.results);
    }).catch((error) => {

        movieApp.resultsError(error);
    })
        // console.log(url.search)
        // fetch & error checking
    // fetch(url)
    // .then(function(apiResponse){
    //     if (apiResponse.status >= 200 && apiResponse.status <= 299) {
    //         return apiResponse.json();
    //     } else {
    //         throw Error(apiResponse.statusText);
    //     }
    // })
    // .then(function (jsonData) {
    //     // movieApp.displayMovie(jsonData.results);
    // }).catch((error) => {
    //     console.log(error)
    //     movieApp.resultsError(error);
//     })
}



// 6.
movieApp.displayMovie = function(movies) {
    if (movies.length === 0) {
        
        const noResultElement = document.createElement('p')
        const resultsSection = document.querySelector('.errors')

        noResultElement.innerText = `Oops! It doesn't look like`
        resultsSection.append(noResultElement)
        
    }
console.log(movies.length)
    movies.forEach(function(movieItem) {
        // console.log(movieItem);

        const liElements = document.createElement('li');

        const movieRecos = document.querySelector('h2');
        movieRecos.innerHTML = `Here are our recommendations!`
            
        const movieTitle = document.createElement('h3');
        movieTitle.innerText = movieItem.original_title;

        const movieRatingDiv = document.createElement('div');
        movieRatingDiv.classList.add('movieRatingPositioning');

        const movieRating = document.createElement('p');
        movieRating.innerText = movieItem.vote_average;
        
        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`;
        moviePoster.alt = movieItem.title;

        const movieOverviewDiv = document.createElement('div');
        movieOverviewDiv.classList.add('movieOverview');
        
        const movieOverviewText = document.createElement('p');
        movieOverviewText.innerText = movieItem.overview;

        movieRatingDiv.append(moviePoster, movieRating);

        movieOverviewDiv.append(movieOverviewText);

        liElements.append(movieTitle, movieRatingDiv, movieOverviewDiv);
        
        const ulElement = document.querySelector('.printMovies');
        ulElement.appendChild(liElements);

        formEl.reset();
    });
};

// variables to store the user selections
movieApp.year = document.querySelector('#year');
movieApp.genre = document.querySelector('#genre');
movieApp.cast = document.querySelector('#userQuerySearch');

movieApp.formEl = document.querySelector('.userSubmit');
movieApp.formEl.addEventListener('submit', function(event) {
    document.querySelector('.printMovies').innerHTML = ''
    document.querySelector('.errors').innerHTML = ''
    // if user doesn't provide an actor name, run without getCastId
        if (movieApp.cast.value === "") {
        console.log('uh oh')
            movieApp.getMovies(movieApp.genre.value, Number(movieApp.year.value));
    } else {
        console.log('all kewl')
        // get inputs from form selections and send them to the getMovies function
        movieApp.getMovies(movieApp.genre.value, Number(movieApp.year.value), movieApp.getCastId(movieApp.cast.value));
    };
    event.preventDefault();
    console.log(movieApp.year.value)
    console.log(movieApp.genre.value)
    console.log(movieApp.cast.value);
})

// Error printing function
movieApp.resultsError = function() {
    // console.log('error fn running')
    const resultsSection = document.querySelector('.errors')
    const errorMessage = document.createElement('p');
    errorMessage.innerText = `Ooops! It looks like we can't reach the MovieDB API right now! Try again in a few minutes!`
    resultsSection.append(errorMessage)
};

// initializer
movieApp.init = function() {
    // run function to populate genre dropdown
    movieApp.populateOptions();
};

movieApp.init();