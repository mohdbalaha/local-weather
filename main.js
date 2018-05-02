window.onload = function () {

    //     http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=7b27657025fef7c005ac2ec1431f3061
    let urlByGeo = '';
    const url = "http://api.openweathermap.org/"
    const api = '7b27657025fef7c005ac2ec1431f3061';
    let celsius = 0;
    let fahrenheit = 0;
    let temp=0;
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
                //T(°C) = T(K) - 273.15
                celsius = Math.round(kelvin - 273.15);
                //T(°F) = T(K) × 9/5 - 459.67
                fahrenheit = Math.round((kelvin * 9 / 5) - 459.67);
                temp=celsius;

                document.getElementById("form").innerHTML =
                    '<p>' + country + ' , ' + city + '</p>' +
                    '<p>' + '<span id="temp0">'+temp+'</span>' + '<a id="temp" href="#">°C</a></p>' +
                    '<p>' + main + '</p>' +
                    '<img src="http://openweathermap.org/img/w/' + icon + '.png">';
                    
                    document.getElementById("temp").onclick = function () {
                        if(temp===celsius){
                            temp=fahrenheit;
                            document.getElementById("temp0").innerHTML=temp;
                            document.getElementById("temp").innerHTML='°F';
                        }else if(temp===fahrenheit){
                            temp=celsius
                            document.getElementById("temp0").innerHTML=temp;
                            document.getElementById("temp").innerHTML='°C';
                        }
                    }

            }
        }
        xhr.open('GET', urlByGeo, true);
        xhr.send();
    }


}