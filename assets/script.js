$(document).ready(function() {

    $("h2").hide();

    $("#search-button").on("click", function () {
        $("h2").show();

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
            
                // // RENDER CITY
                $("#city-name").text(`${response.city.name}, ${response.city.country}`);

                // // RENDER DATE

                $("#todays-date").text(`${moment().format('LL')}`);

                var tempCel = `${Math.round(data.current.temp)}`;

                function toFah(cel) {
                    return (Math.round((cel * (9/5)) + 32));
                }

                // // RENDER TEMP
                $("#temp").text(`Temperature : ${tempCel} ºC / ${toFah(tempCel)} ºF`);
                
                // // RENDER HUMIDITY
                $("#humidity").text(`Humidity : ${data.current.humidity}%`)

                // // RENDER WIND SPEED
                $("#wind").text(`Wind Speed : ${data.current.wind_speed}`)
            
                // // RENDER IMAGE
                $("#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
            
                // RENDER UV INDEX
                $("#uv").text(`UV Index : ${data.current.uvi}`);

                // TOMORROW'S FORECAST

                // +2 DAYS

                // +3 DAYS

            })
        })  
        

    })

});
