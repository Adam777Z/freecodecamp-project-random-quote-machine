const projectName = 'random-quote-machine';
localStorage.setItem('example_project', 'Random Quote Machine');

var quotes;

document.addEventListener('DOMContentLoaded', (event) => {
	fetch('./assets/json/quotes.json', {
		'method': 'GET'
	})
	.then((response) => {
		if (response['ok']) {
			return response.json();
		} else {
			throw 'Error';
		}
	})
	.then((data) => {
		quotes = data;
		getQuote();
	})
	.catch((error) => {
		console.log(error);
	});

	document.querySelector('#new-quote').addEventListener('click', (event2) => {
		getQuote();
	});
});

function getQuote() {
	let i = randomIntFromInterval(0, quotes.length);
	let quote = quotes[i]['text'];
	let author = quotes[i]['author'];
	let tweetText = '"' + quote + '" - ' + author;

	document.querySelector('#text').textContent = quote;
	document.querySelector('#author').textContent = author
	document.querySelector('#author').setAttribute('title', author);
	document.querySelector('#tweet-quote').setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText));
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}