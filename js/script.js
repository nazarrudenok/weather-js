const URL = 'https://api.weatherapi.com/v1/forecast.json?key=e43642ed5f89487c97c143549230706&q=Lviv&lang=uk&days=5';

const xhr = new XMLHttpRequest();

xhr.open('GET', URL);

const today = new Date();
const dayName = today.toLocaleString("uk", { weekday: "long" });
const capitalizedDayName = dayName[0].toUpperCase() + dayName.slice(1);
var date = document.getElementsByClassName('date-container')[0];
var js_date = new Date();
var day = js_date.getDate();
var month = js_date.getMonth() + 1;

if (day < 10) {
    day = '0' + day;
}if (month < 10) {
    month = '0' + month;
}

var fullDate = day + '.' + month;

date.innerHTML = `<p class="date">${capitalizedDayName} ${fullDate}</p>`;

xhr.onload = () => {
    let response = JSON.parse(xhr.response);

    var statusImg = document.getElementsByClassName('status-img-container')[0];

    var js_date = new Date();
    var day = js_date.getDate();
    var month = js_date.getMonth() + 1;
    var year = js_date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var fullDate = day + '.' + month + '.' + year;

    var status = response['current']['condition']['text'].toLowerCase();
    if (status.includes("хмарність") || status.includes("хмарно")) {
        statusImg.innerHTML = `<img src="styles/images/weather-icons/cloudy.png" class="status-img">`;
    } else if (status.includes("дощ") || status.includes("злива")) {
        statusImg.innerHTML = `<img src="styles/images/weather-icons/rain.png" class="status-img">`;
    } else if (status.includes("сонячно") || status.includes("ясно")) {
        statusImg.innerHTML = `<img src="styles/images/weather-icons/sun.png" class="status-img">`;
    } else {
        statusImg.innerHTML = `<img src="styles/images/weather-icons/cloudy.png" class="status-img">`;
    }


    var temp = document.getElementsByClassName('temp-container')[0];
    temp.innerHTML = `<p class="temp">${response['current']['condition']['text']} ${Math.round(response['current']['temp_c'])}°</p>`;

    var temp = document.getElementsByClassName('uv-container')[0];
    temp.innerHTML = `<p class="uv">УФ: ${response['forecast']['forecastday'][0]['day']['uv']}</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[0];
    otherData.innerHTML = `<p class="other-data-status">${response['current']['humidity']}%</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[1];
    otherData.innerHTML = `<p class="other-data-status">${Math.round(response['current']['feelslike_c'])}°</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[2];
    otherData.innerHTML = `<p class="other-data-status">${Math.round(response['forecast']['forecastday'][0]['day']['daily_chance_of_rain'])}%</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[3];
    otherData.innerHTML = `<p class="other-data-status">${Math.round(response['current']['wind_kph'])} км/год</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[4];
    otherData.innerHTML = `<p class="other-data-status">${response['forecast']['forecastday'][0]['astro']['sunrise'].replace("AM", "")}</p>`;

    var otherData = document.getElementsByClassName('other-data-status-container')[5];
    var sunsetTime = response['forecast']['forecastday'][0]['astro']['sunset'];
    var timeComponents = sunsetTime.split(' ')[0].split(':');
    var hours = parseInt(timeComponents[0]);
    var minutes = parseInt(timeComponents[1]);
    if (sunsetTime.includes('PM') && hours < 12) {
      hours += 12;
    }
    var formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    otherData.innerHTML = `<p class="other-data-status">${formattedTime}</p>`;

    const today = new Date();
    const dayNames = ["понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота", "неділя"];
    
    const shortDayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
    
    for (let i = 0; i < 3; i++) {
        const dayName = shortDayNames[(today.getDay() + i) % 7];

        // document.querySelector(".forecast-days").innerHTML += `<div class="forecast-day"><img src="" class="forecast-day-img"><p class="forecast-day-name">${dayName}</p></div>`;

        var status = response['forecast']['forecastday'][i]['day']['condition']['text'].toLowerCase();
        var statusFor = response['forecast']['forecastday'][i]['day']['condition']['text'];
        var maxTemp = Math.round(response['forecast']['forecastday'][i]['day']['maxtemp_c']);
        var minTemp = Math.round(response['forecast']['forecastday'][i]['day']['mintemp_c']);
        var maxMinTemp = maxTemp + '° / ' + minTemp + '°';
        console.log(maxMinTemp);


        var statusImg = document.getElementsByClassName('forecast-day-img');
        if (status.includes("хмарність") || status.includes("хмарно")) {
            document.querySelector(".forecast-days").innerHTML += `<div class="forecast-day"><img src="styles/images/weather-icons/cloudy.png" class="forecast-day-img"><p class="forecast-day-name">${dayName}</p><p class="forecast-day-status">${statusFor}</p><p class="forecast-day-temp">${maxMinTemp}</p></div>`;
        } else if (status.includes("дощ") || status.includes("злива")) {
            document.querySelector(".forecast-days").innerHTML += `<div class="forecast-day"><img src="styles/images/weather-icons/rain.png" class="forecast-day-img"><p class="forecast-day-name">${dayName}</p><p class="forecast-day-status">${statusFor}</p><p class="forecast-day-temp">${maxMinTemp}</p></div>`;
        } else if (status.includes("сонячно") || status.includes("ясно")) {statusFor
            document.querySelector(".forecast-days").innerHTML += `<div class="forecast-day"><img src="styles/images/weather-icons/sun.png" class="forecast-day-img"><p class="forecast-day-name">${dayName}</p><p class="forecast-day-status">${statusFor}</p><p class="forecast-day-temp">${maxMinTemp}</p></div>`;
        } else {
            document.querySelector(".forecast-days").innerHTML += `<div class="forecast-day"><img src="styles/images/weather-icons/cloudy.png" class="forecast-day-img"><p class="forecast-day-name">${dayName}</p><p class="forecast-day-status">${statusFor}</p><p class="forecast-day-temp">${maxMinTemp}</p></div>`;
        }
    }
}

xhr.send();