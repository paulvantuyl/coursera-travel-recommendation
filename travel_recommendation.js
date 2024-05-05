const btnSearch = document.getElementById('btnSearch');
const clearSearch = document.getElementById('clearSearch');
const resultDiv = document.getElementById('searchResults');

function resetForm() {
	document.getElementById('travelSearch').value = '';
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('visible');
}

function searchResults() {
	const input = document.getElementById('travelSearch').value.toLowerCase();
	resultDiv.innerHTML = '';

	console.log("User searched for", input);

	fetch('./travel_recommendation_api.json')
		.then(response => response.json())
		.then(data => { 			
			const country = data.countries.find(item => item.name.toLowerCase() === input);
			const temples = data.temples.find(item => item.name.toLowerCase() === input);
			const beaches = data.beaches.find(item => item.name.toLowerCase() === input);
			//const cities = data.countries.cities;

			if (country) {
				console.log('I found a country');

				resultDiv.classList.add('visible');
				resultDiv.innerHTML = `<h1>Locations in ${country.name}</h1>`;
				country.cities.forEach(function (city) {
					resultDiv.innerHTML += `<img src=".${city.imageUrl}" />`;
					resultDiv.innerHTML += `<h3>${city.name}</h3>`;
					resultDiv.innerHTML += `<p>${city.description}</p>`;
				});

			} else if (input == "country" || input == "countries" || input == "locations") {
				console.log('I found the keywords for country');

				resultDiv.classList.add('visible');
				resultDiv.innerHTML = `<h1>Search results for "${input}"</h1>`;
				data.countries.forEach(function (nation) {
					resultDiv.innerHTML += `<h2>${nation.name}</h2>`;
					
					nation.cities.forEach(function (city) {
						resultDiv.innerHTML += `<img src=".${city.imageUrl}" />`;
						resultDiv.innerHTML += `<h3>${city.name}</h3>`;
						resultDiv.innerHTML += `<p>${city.description}</p>`;
					});
				});

			} else if (temples || input == "temple" || input == "temples" || input == "angkor wat" || input == "taj mahal") {
				console.log('I found a temple or the keywords for temple');

				resultDiv.classList.add('visible');
				resultDiv.innerHTML = `<h1>Search results for "${input}"</h1>`;
				data.temples.forEach(function (temple) {
					resultDiv.innerHTML += `<img src=".${temple.imageUrl}" />`;
					resultDiv.innerHTML += `<h3>${temple.name}</h3>`;
					resultDiv.innerHTML += `<p>${temple.description}</p>`;
				});
			} else if (beaches || input == "beach" || input == "beaches" || input == "bora bora" || input == "copacabana") {
				console.log("I found a beach or the keywords for a beach");

				resultDiv.classList.add('visible');
				resultDiv.innerHTML = `<h1>Search results for "${input}"</h1>`;
				data.beaches.forEach(function (beach) {
					resultDiv.innerHTML += `<img src=".${beach.imageUrl}" />`;
					resultDiv.innerHTML += `<h3>${beach.name}</h3>`;
					resultDiv.innerHTML += `<p>${beach.description}</p>`;
				});

			} else {
				console.log("Naaaahhh");

				resultDiv.classList.add('visible');
				resultDiv.innerHTML = `<h3>Sorry, no results for "${input}".</h3>`;
				resultDiv.innerHTML += `<p>Please try another search.`
			};
			
		})
		.catch((error) => {
			console.error('Error:', error);
			resultDiv.innerHTML = 'An error occurred while fetching data.';
		});
}

btnSearch.addEventListener('click', searchResults);
clearSearch.addEventListener('click', resetForm);

function thankyou() {
    alert('Thank you for contacting us!');
}
