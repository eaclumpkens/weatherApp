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
        
        // RENDER CITY
        $("#city-name").text(`${response.city.name}, ${response.city.country}`);

        // RENDER DATE

        $("#todays-date").text(`${moment().format('LL')}`);

        var tempCel = `${Math.round(response.list[0].main.temp)}`;
        var tempFah =  `${Math.round((tempCel * (9/5)) + 32)}`;

        // RENDER TEMP
        $("#temp").text(`Temperature : ${tempCel} ºC / ${tempFah} ºF`);
        
        // RENDER HUMIDITY
        $("#humidity").text(`Humidity : ${response.list[0].main.humidity}%`)

        // RENDER WIND SPEED
        $("#wind").text(`Wind Speed : ${response.list[0].wind.speed}`)
      
        // RENDER IMAGE
        $("#icon").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
    

        console.log(response);
    })  
    

})
