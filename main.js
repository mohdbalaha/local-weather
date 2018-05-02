window.onload = function () {

    let urlByGeo = '';
    let newUrl = '';
    const url = "https://api.openweathermap.org/"
    const api = '7b27657025fef7c005ac2ec1431f3061';
    let celsius = 0;
    let fahrenheit = 0;
    let temp = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            urlByGeo = url + "data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + api;
            getTemp();
        });
    }

    function getTemp() {
        const xhr = new XMLHttpRequest;
        xhr.responseType = "json";
        xhr.onload = function () {
            if (xhr.status == 200) {
                let obj = xhr.response;

                let kelvin = obj.main.temp;
                let icon = obj.weather[0].icon;
                let country = obj.sys.country;
                let city = obj.name;
                let main = obj.weather[0].main;
                let desc = obj.weather[0].description;
                //T(°C) = T(K) - 273.15
                celsius = Math.round(kelvin - 273.15);
                //T(°F) = T(K) × 9/5 - 459.67
                fahrenheit = Math.round((kelvin * 9 / 5) - 459.67);
                temp = celsius;

                document.getElementById("form").innerHTML =
                    '<p class="city">' + city + ' , ' + country + '</p>' +
                    '<p>' + '<span id="temp0">' + temp + '</span>°' + '<a id="temp" href="#">C</a></p>' +
                    '<p>' + desc + '</p>';

                document.getElementById("weather-icon").innerHTML = showIcon(icon);


                document.getElementById("temp").onclick = function () {
                    if (temp === celsius) {
                        temp = fahrenheit;
                        document.getElementById("temp0").innerHTML = temp;
                        document.getElementById("temp").innerHTML = 'F';
                    } else if (temp === fahrenheit) {
                        temp = celsius
                        document.getElementById("temp0").innerHTML = temp;
                        document.getElementById("temp").innerHTML = 'C';
                    }
                }

            }
        }
        xhr.open('GET', urlByGeo, true);
        xhr.send();
    }

    function showIcon(icon) {
        switch (icon) {
            case '10d':
            case '10n':
                return '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';
                break;

            case '11d':
            case '11n':
                return '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
                break;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
            case '50d':
            case '50n':
                return '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
                break;

            case '13d':
            case '13n':
                return '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
                break;

            case '01d':
            case '01n':
                return '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
                break;

            case '09d':
            case '09n':
                return '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
                break;
        }
    }

}