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

	fetch('./travel_recommendation_api.json')
		.then(response => response.json())
		.then(data => {
			const country = data.countries.find(item => item.name.toLowerCase() === input);

			if (country) {
                resultDiv.classList.add('visible');
                resultDiv.innerHTML = `<h1>Results for ${country.name}</h1>`

                data.countries.forEach(function(country) {
                    resultDiv.innerHTML += `<img src="${country.imgUrl}" />`;
                    resultDiv.innerHTML += `<h3>${country.name}</h3>`;
                    resultDiv.innerHTML += `<p>${country.description}</p>`;
                });
			} else {
				resultDiv.innerHTML = `Sorry, that country isn't in our list of destinations.`;
			}
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
