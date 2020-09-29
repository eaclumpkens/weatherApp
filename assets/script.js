$(document).ready(function() {

    $("main").hide();

    $("input").on("keyup", function() {
        $(".main-button").attr("value", `${$(this).val()}`);
    });

    function searchWeather(cityName) {

        $("main").show();

        var apiKey = "73f419ace0f37e311e27cdd095f41f82";
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            console.log(response);

            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            var dataURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

            $.ajax({
                url: dataURL,
                method: "GET"
            }).then(function(data){

                console.log(data);

                var city = response.city.name;
                var country = response.city.country;

                // // RENDER CITY
                $("#city-name").text(`${city}, ${country}`);

                // // RENDER DATE

                $("#todays-date").text(`${moment().format('LL')}`);

                function toFah(cel) {
                    return (Math.round((cel * (9/5)) + 32));
                }

                var tempCel = `${Math.round(data.current.temp)}`;

                // // RENDER TEMP
                $("#temp").text(`${tempCel} ºC | ${toFah(tempCel)} ºF`);
                
                // // RENDER HUMIDITY
                $("#humidity").text(`${data.current.humidity}%`)

                // // RENDER WIND SPEED
                $("#wind").text(`${Math.round((data.current.wind_speed)*2.237)} mph`)
            
                // // RENDER IMAGE
                $("#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
            
                // RENDER UV INDEX
                $("#uv").text(`${data.current.uvi}`);

                function uvCondition(uvData) {

                    if (uvData < 3) {
                        return $("#uv").attr("style", "color:#68b070; font-weight: 500;");
                    } else if (uvData >= 3 && uvData < 6) {
                        return $("#uv").attr("style", "color:#ffb400; font-weight: 500;");
                    } else if (uvData > 5 && uvData < 8) {
                        return $("#uv").attr("style", "color:#ff8d00; font-weight: 500;");
                    } else if (uvData > 7 && uvData < 10) {
                        return $("#uv").attr("style", "color:#ec6e4c; font-weight: 500;");
                    } else {
                        return $("#uv").attr("style", "color:#cb79d3; font-weight: 500;");
                    }

                }

                uvCondition(data.current.uvi);

                // FUTRE FORECASTS

                $("#icon-1").attr("src", `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`); 
                
                $("#temp-min-1").text(`${Math.round(data.daily[0].temp.min)}ºC | ${toFah(data.daily[0].temp.min)}ºF`);
                $("#temp-max-1").text(`${Math.round(data.daily[0].temp.max)}ºC | ${toFah(data.daily[0].temp.max)}ºF`);
                $("#hum-1").text(`${data.daily[0].humidity}%`);

                $("#icon-2").attr("src", `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`);
                $("#date-2").text(`${moment().add(2, 'days').format('MMM Do')}`);
                $("#temp-min-2").text(`${Math.round(data.daily[1].temp.min)}ºC | ${toFah(data.daily[1].temp.min)}ºF`);
                $("#temp-max-2").text(`${Math.round(data.daily[1].temp.max)}ºC | ${toFah(data.daily[1].temp.max)}ºF`);
                $("#hum-2").text(`${data.daily[1].humidity}%`);

                $("#icon-3").attr("src", `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`);
                $("#date-3").text(`${moment().add(3, 'days').format('MMM Do')}`);
                $("#temp-min-3").text(`${Math.round(data.daily[2].temp.min)}ºC | ${toFah(data.daily[2].temp.min)}ºF`);
                $("#temp-max-3").text(`${Math.round(data.daily[2].temp.max)}ºC | ${toFah(data.daily[2].temp.max)}ºF`);
                $("#hum-3").text(`${data.daily[2].humidity}%`);

                $("#icon-4").attr("src", `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`);
                $("#date-4").text(`${moment().add(4, 'days').format('MMM Do')}`);
                $("#temp-min-4").text(`${Math.round(data.daily[3].temp.min)}ºC | ${toFah(data.daily[3].temp.min)}ºF`);
                $("#temp-max-4").text(`${Math.round(data.daily[3].temp.max)}ºC | ${toFah(data.daily[3].temp.max)}ºF`);
                $("#hum-4").text(`${data.daily[3].humidity}%`);
            })
        }) 
    }

    $(".main-button").on("click", function (event) {
        inputValue = $(this).val();

        event.preventDefault();
        searchWeather(inputValue);

        var newButton = $("<button>");
        newButton.text(`${inputValue}`);
        newButton.attr("type", "button");
        newButton.attr("value", `${inputValue}`);
        newButton.addClass("new-button col-md-2 btn btn-light btn-sm");

        $("#search-buttons").append(newButton);

        $(".new-button").on("click", function(event) {
            event.preventDefault();
            searchWeather($(this).val());
        })

    });

});

    




