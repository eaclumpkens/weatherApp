$(document).ready(function() {


    $("main").hide();

    $(".search-button").on("click", function () {

        $("main").show();

        var cityName = `${$("input").val()}`;
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

                // SEARCH HISTORY

                var newButton = $("<button>");
                newButton.text(`${city}`);
                newButton.attr("type", "button");
                newButton.attr("data-city", `${city}`);
                newButton.attr("data-country", `${country}`);
                newButton.addClass("search col-md-2 btn btn-light btn-sm");

                $("#search-buttons").append(newButton);

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
                $("#wind").text(`${data.current.wind_speed}`)
            
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
                    } else if (uvData > 7 && uvData < 11) {
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
        

    })

});
