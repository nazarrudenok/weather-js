function date() {
    var date = document.getElementsByClassName("date");
    for (var i = 0; i < date.length; i++) {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        
        var formattedDate = day + '.' + month + '.' + year;
    
        return date[i].innerHTML = formattedDate;
    }
}
var a = date();


function query() {
    var url = 'http://api.weatherapi.com/v1/forecast.json';
    var params = {
        key: 'e43642ed5f89487c97c143549230706',
        q: 'Lviv',
        lang: 'uk',
        days: 5
    };

    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    var fullUrl = url + '?' + queryString;

    return fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
}

query().then(data => {
    var status = data['current']['condition']['text'].toLowerCase();
    console.log(status);
    var imgHtml = document.getElementsByClassName("main-img")[0];
    if (status.includes("хмарність")) {
        imgHtml.src = "styles/images/_cloud.png"
    } else if (status.includes("хмарно")) {
        imgHtml.src = "styles/images/_cloud.png"
    } else if (status.includes("дощ")) {
        imgHtml.src = "styles/images/_rain.png"
    } else if (status.includes("злива")) {
        imgHtml.src = "styles/images/_rain.png"
    } else if (status.includes("сонячно")) {
        imgHtml.src = "styles/images/_sun.png"
    } else if (status.includes("ясно")) {
        imgHtml.src = "styles/images/_sun.png"
    } else {
        imgHtml.src = "styles/images/_cloud.png"
    }
});

query().then(data => {
    var mainTemp = Math.round(data['current']['temp_c']);
    var mainStatus = data['current']['condition']['text'];
    console.log(mainTemp);
    var tempHtml = document.getElementsByClassName("main-temp")[0];
    tempHtml.innerHTML = '<p class="main-temp">' + mainTemp + '°C ' + mainStatus + '</p>';
})

query().then(data => {
    var _info2Value = Math.round(data['current']['humidity']);
    var info2Value = document.getElementsByClassName("info2-value")[0];
    info2Value.innerHTML = '<p class="info2-value-">' + _info2Value + '%</p>'
})

query().then(data => {
    var _info2Value = Math.round(data['current']['feelslike_c']);
    var info2Value = document.getElementsByClassName("info2-value")[1];
    info2Value.innerHTML = '<p class="info2-value-">' + _info2Value + '°C</p>'
})

query().then(data => {
    var _info2Value = data['forecast']['forecastday'][0]['day']['daily_chance_of_rain'];
    console.log(_info2Value)
    var info2Value = document.getElementsByClassName("info2-value")[2];
    info2Value.innerHTML = '<p class="info2-value-">' + _info2Value + '%</p>'
})

query().then(data => {
    var _info2Value = data['forecast']['forecastday'][0]['astro']['sunrise'];
    var _info2Value = _info2Value.replace(" AM", "");
    console.log(_info2Value)
    var info2Value = document.getElementsByClassName("info2-value")[3];
    info2Value.innerHTML = '<p class="info2-value-">' + _info2Value + '</p>'
})

query().then(data => {
    var _info2Value = data['forecast']['forecastday'][0]['astro']['sunset'];
    var _info2Value = _info2Value.replace(" PM", "");
    console.log(_info2Value)
    var info2Value = document.getElementsByClassName("info2-value")[4];
    info2Value.innerHTML = '<p class="info2-value-">' + _info2Value + '</p>'
})

function month() {
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const ukrainianMonth = months[currentMonth];
    return ukrainianMonth;
}

var today = new Date();
var date__ = document.getElementsByClassName("date-")[0];
date__.innerHTML = '<p class="date--">' + month() + ' ' + today.getFullYear() + '</p>';



query().then(data => {
    var currentDate = new Date();
    var nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + 1);
    var nextTwoDays = new Date();
    nextTwoDays.setDate(currentDate.getDate() + 2);
    var nextThreeDays = new Date();
    nextThreeDays.setDate(currentDate.getDate() + 3);

    var options = { weekday: 'long' };
    var formatter = new Intl.DateTimeFormat('uk-UA', options);

    var _1 = capitalizeFirstLetter(formatter.format(nextDay));
    var _2 = capitalizeFirstLetter(formatter.format(nextTwoDays));
    var _3 = capitalizeFirstLetter(formatter.format(nextThreeDays));

    for (let i = 0; i < data['forecast']['forecastday'].length; i++) {
        var forDate = document.getElementsByClassName("for-date")[i];
        var forecastDate = data['forecast']['forecastday'][i]['date'].replace("2023-", "").replace("-", ".");

        if (i % 3 === 0) {
            forDate.innerHTML = _1 + ' ' + forecastDate;
        } else if (i % 3 === 1) {
            forDate.innerHTML = _2 + ' ' + forecastDate;
        } else {
            forDate.innerHTML = _3 + ' ' + forecastDate;
        }
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


query().then(data => {
    for (let i = 0; i < 3; i++) {
        var forStatus = data['forecast']['forecastday'][i]['day']['condition']['text'].toLowerCase();
        var imgHtml = document.getElementsByClassName("for-img")[i];
        if (forStatus.includes("хмарність")) {
            imgHtml.src = "styles/images/_cloud.png"
        } else if (forStatus.includes("хмарно")) {
            imgHtml.src = "styles/images/_cloud.png"
        } else if (forStatus.includes("дощ")) {
            imgHtml.src = "styles/images/_rain.png"
        } else if (forStatus.includes("злива")) {
            imgHtml.src = "styles/images/_rain.png"
        } else if (forStatus.includes("сонячно")) {
            imgHtml.src = "styles/images/_sun.png"
        } else if (forStatus.includes("ясно")) {
            imgHtml.src = "styles/images/_sun.png"
        } else {
            imgHtml.src = "styles/images/_cloud.png"
        }
        console.log(forStatus);
    }
})

query().then(data => {
    for (let i = 0; i < data['forecast']['forecastday'].length; i++) {
        var forStatus = data['forecast']['forecastday'][i]['day']['condition']['text'].toLowerCase();
        var imgHtml = document.getElementsByClassName("for-status")[i];
        var forStatusLength = forStatus.split(" ").length;
        if (forStatusLength >= 2) {
            imgHtml.innerHTML = '<p class="for-status-' + i + '">' + forStatus + '</p>';
        } else {
            imgHtml.innerHTML = '<p class="for-status-' + i + '">' + forStatus + '</p>';
        }
    }
})

query().then(data => {
    var forTempHtml = document.querySelectorAll(".for-temp");
    
    data['forecast']['forecastday'].forEach((forecast, i) => {
        var forTemp = Math.round(forecast['day']['maxtemp_c']);
        forTempHtml[i].innerHTML = '<p class="for-temp">' + forTemp + '°C</p>';
    });
});