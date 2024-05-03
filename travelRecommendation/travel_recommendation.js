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
			const temple = data.temples.find(item => item.name.toLowerCase() === input);
			const beach = data.beaches.find(item => item.name.toLowerCase() === input);

			const keywords = [
				"country", 
				"countries", 
				"australia",
				"japan",
				"cambodia",
				"india",
				"french polynesia",
				"beach",
				"beaches",
				"temple",
				"temples",
			];
			const found = keywords.find((keyword) => keyword === input);
			console.log("The item found was", found);
			
			// while (keywords == input) {
			// 	if (country) {
			// 		resultDiv.classList.add('visible');
			// 		resultDiv.innerHTML = `<h1>Results for ${country.name}</h1>`;
			// 	} else if (temple) {
			// 		resultDiv.classList.add('visible');
			// 		resultDiv.innerHTML = `<h1>Results for ${temple.name}</h1>`;
			// 	} else if (beach) {
			// 		resultDiv.classList.add('visible');
			// 		resultDiv.innerHTML = `<h1>Results for ${beach.name}</h1>`;
			// 	} else {
			// 		resultDiv.classList.add('visible');
			// 		resultDiv.innerHTML = `Sorry, that isn't in our list of destinations.`;
			// 		console.log('The user query of ' + input + " doesn't match any keywords.");
			// 	}
			// };

			// const match = keywords.forEach(function (keyword) {
			// 	if (keyword == input) {
			// 		if (country) {
            //     		resultDiv.classList.add('visible');
            //     		resultDiv.innerHTML = `<h1>Results for ${country.name}</h1>`

			// 		} else if (temple) {
			// 			resultDiv.classList.add('visible');
			// 			resultDiv.innerHTML = `<h1>Results for ${temple.name}</h1>`;

			// 		} else if (beach) {
			// 			resultDiv.classList.add('visible');
			// 			resultDiv.innerHTML = `<h1>Results for ${beach.name}</h1>`;
			// 		};

			// 		console.log("The keyword " + keyword + " matched to the search query of " + input + ".");

			// 	} else {
			// 		resultDiv.classList.add('visible');
			// 		resultDiv.innerHTML = `Sorry, that isn't in our list of destinations.`;
			// 		console.log("The user query of " + input + " doesn't match any keywords.")
			// 	}
			// });

			// if (country) {
            //     resultDiv.classList.add('visible');
            //     resultDiv.innerHTML = `<h1>Results for ${country.name}</h1>`

            //     country.cities.forEach(function(city) {
            //         resultDiv.innerHTML += `<img src=".${city.imageUrl}" />`;
            //         resultDiv.innerHTML += `<h3>${city.name}</h3>`;
            //         resultDiv.innerHTML += `<p>${city.description}</p>`;
            //     });

			// } else if (temple) {
			// 	resultDiv.classList.add('visible');
			// 	resultDiv.innerHTML = `<h1>Results for ${temple.name}</h1>`;

			// } else if (beach) {
			// 	resultDiv.classList.add('visible');
			// 	resultDiv.innerHTML = `<h1>Results for ${beach.name}</h1>`;
				
			// } else {
			// 	resultDiv.classList.add('visible');
			// 	resultDiv.innerHTML = `Sorry, that isn't in our list of destinations.`;
			// }
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
