const search = document.querySelector('#searchBox');
const button = document.querySelector('#SubmitButton');
const searchContainer = document.querySelector('.searchContainer');
const display = document.querySelector('.display');
const cityHolder = document.querySelector('.city')
const tempHolder = document.querySelector('.temp')
const imageHolder = document.querySelector('.img')
const statusHolder = document.querySelector('.status')
const error = document.querySelector('.error');
const WEATHER_API_KEY = '5eedfea57abcb50264a373e71cd7b178';

button.onclick = () => {

	let input = search.value
	if(input == ""){
		error.innerText = "Please enter a City Name"
	} else {
		error.innerText = "Enter a Valid City Name"
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WEATHER_API_KEY}&units=metric`)
	.then(res => {
			return res.json()
	})
	.then(data => {
		console.log(data)
		var city = data['name']
		var temperature = Math.floor(data['main']['temp'])
		var image = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data['weather'][0]["icon"]}.svg`
		var status = data['weather'][0]['description']
		error.style.display = "none"
		display.style.display = "block"
		cityHolder.innerHTML = city;
		tempHolder.innerText = temperature +'℃';
		imageHolder.src = image;
		statusHolder.innerText = status;
	})
	.catch(() => {
		display.style.display = "none"
		error.style.display = "block"
	})
}
