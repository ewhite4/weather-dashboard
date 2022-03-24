var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#cityName');
var citiesContainerEl = document.querySelector('#cities-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = nameInputEl.value.trim();

    if (cityName) {
        getCityRepos(cityName);

        citiesContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter a city name');
    }
}

var getCityRepos = function(user) {

    // weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}' + user + '/city';
    // make a request to url
    fetch(apiUrl)
        .then(function(response) {
            // if request successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayCities(data, user);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to City Weather');
        });
};

var displayCities = function(cities, searchTerm) {
    if (cities.length === 0) {
        citiesContainerEl.textContent = 'No cities found.';
        return;
    }
citySearchTerm.textContent = searchTerm;

    // loop over cities
    for (var i = 0; i < cities.length; i++) {
        var cityName = cities[i].owner.login + '/' + cities[i].name;

        var cityEl = document.createElement('div');
        cityEl.classList = 'list-item flex-row justify-space-between align-center';

        var titleEl = document.createElement('span');
        titleEl.textContent = cityName;

        cityEl.appendChild(titleEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row alight-center';

        // check if current City has issues or not

        if (cities[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        cityEl.appendChild(statusEl);

        citiesContainerEl.appendChild(cityEl);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);