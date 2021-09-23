// namespace object
const movieApp = {}

// properties storing url and key
movieApp.apiUrl = 'https://api.themoviedb.org/3/genre/movie/list';
movieApp.apiKey = 'c17d6ea449ecfb7983863b0e3f6a5d7d';

// =========== Getting list of genres from endpoint =================================
// store url & query info
movieApp.populateOptions = () => {
    const url = new URL(movieApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey
    });
    console.log(url.search)

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

// initializer
movieApp.init = function() {
    // run function to populate genre dropdown
    movieApp.populateOptions();
}

movieApp.init();

