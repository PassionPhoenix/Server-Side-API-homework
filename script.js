var rightNow = moment().format("MMM D, YYYY");
var Day1 = moment().add(1, 'day');
var Day2 = moment().add(2, 'day');
var Day3 = moment().add(3, 'day');
var Day4 = moment().add(4, 'day');
var Day5 = moment().add(5, 'day');

var PreButton = $('.State');
var Jumbo = $('.Jumbotron');
var where = $('.Where');
var Search = $('#State-search');
var Content = $('#Weather-station');
var TodayTemp = $('#TdTemp');
var TodayWind = $('#TdWind');
var TodayHumid = $('#TdHumid');
var TodayUV = $('#TdUV');

function displayDate(){
    $('#Current').html(rightNow);
    $('#Current1').html(Day1.format('MMM D, YYYY'));
    $('#Current2').html(Day2.format('MMM D, YYYY'));
    $('#Current3').html(Day3.format('MMM D, YYYY'));
    $('#Current4').html(Day4.format('MMM D, YYYY'));
    $('#Current5').html(Day5.format('MMM D, YYYY'));
}

function Weather(lat, lon){
    var statequery = 'https://api.openweathermap.org/data/2.5/onecall?';
    
    statequery = statequery + 'lat=' + lat + '&lon='+ lon + '&exclude=minutely,hourly,alerts&appid=b16f1aea6c8a8adc1ebc2fd17697b89a';

    fetch(statequery)
        .then(function(response){
            if(!response.ok){                
                console.log('No');
            }
            else{
            return response.json();
            };
        })
        .then(function (locRes) {
            var TrueTemp = Math.round((locRes.current.temp - 273.15) * 9/5 + 32);
            var weather = locRes.current.weather[0].main;

            Icon(weather);

            TodayTemp.text('Temp:' + TrueTemp + '°F');
            TodayWind.text('Wind:' + locRes.current.wind_speed);
            TodayHumid.text('Humidity:' + locRes.current.humidity);
            TodayUV.text('UV Index:' + locRes.current.uvi);
        });

};

function Icon(weather){
   
    if(weather == 'Clouds'){
        $('#wonder').removeClass('fas fa-sun fa-smog fa-snowflake fa-cloud0rain');
        $('#wonder').addClass('fas fa-cloud-sun');
    }else if(weather == 'Clear'){
        $('#wonder').removeClass('fas fa-cloud-sun fa-smog fa-snowflake fa-poo-storm');
        $('#wonder').addClass('fas fa-sun');
    }else if(weather == 'Atmosphere'){
        $('#wonder').removeClass('fas fa-cloud-sun fa-sun fa-snowflake fa-poo-storm');
        $('#wonder').addClass('fas fa-smog');
    }else if(weather == 'Snow'){
        $('#wonder').removeClass('fas fa-cloud-sun fa-smog fa-sun fa-poo-storm');
        $('#wonder').addClass('fas fa-snowflake');
    }else if(weather == 'Rain' || weather == 'Drizzle' || weather == 'Thunderstorm' ){
        $('#wonder').removeClass('fas fa-cloud-sun fa-sun fa-smog fa-snowflake');
        $('#wonder').addClass('fas fa-poo-storm');
    }else{
        return;
    };
};

function Scout(Event){
    City = Event.currentTarget.textContent;
    Daily(City);
};

function Daily(City){
    $('.Where').text(City);

    MultiDay();
};

function MultiDay(){
    var Forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + City + '&appid=b16f1aea6c8a8adc1ebc2fd17697b89a';

    fetch(Forecast)
        .then(function(response){
            if(!response.ok){    
                alert('No good');       
                console.log('No');
                return Austin();
            }
            else{
            return response.json();
            }
        })
        .then(function (locRes) {
            var lon = locRes.city.coord.lon;
            var lat = locRes.city.coord.lat;
            Weather(lat, lon);

            console.log(locRes);

            for(i = 0; i < 5; i++){
                var weather2 = locRes.list[i].weather[0].main;
                var wind = locRes.list[i].wind.speed;
                var Temp = locRes.list[i].main.temp;
                var humidity = locRes.list[i].main.humidity;

                var TrueTemp2 = Math.round((Temp - 273.15) * 9/5 + 32);
                console.log(Temp, weather2, wind, humidity, TrueTemp2);
                prediction(weather2);
                
                if(i === 0){
                    $('#wonder1').removeClass(notWeather);
                    $('#wonder1').addClass(wethar);
                    $('#Wind1').html('Wind: ' + wind);
                    $('#Temp1').html('Temp: ' + TrueTemp2 + '°F');
                    $('#Humid1').html('Humidity: ' + humidity);
                }else if(i === 1){
                    $('#wonder2').removeClass(notWeather);
                    $('#wonder2').addClass(wethar);
                    $('#Wind2').html('Wind: ' + wind);
                    $('#Temp2').html('Temp: ' + TrueTemp2 + '°F');
                    $('#Humid2').html('Humidity: ' + humidity);
                }else if(i === 2){
                    $('#wonder3').removeClass(notWeather);
                    $('#wonder3').addClass(wethar);
                    $('#Wind3').html('Wind: ' + wind);
                    $('#Temp3').html('Temp: ' + TrueTemp2 + '°F');
                    $('#Humid3').html('Humidity: ' + humidity);
                }else if(i === 3){
                    $('#wonder4').removeClass(notWeather);
                    $('#wonder4').addClass(wethar);
                    $('#Wind4').html('Wind: ' + wind);
                    $('#Temp4').html('Temp: ' + TrueTemp2 + '°F');
                    $('#Humid4').html('Humidity: ' + humidity);
                }else if(i === 4){
                    $('#wonder5').removeClass(notWeather);
                    $('#wonder5').addClass(wethar);
                    $('#Wind5').html('Wind: ' + wind);
                    $('#Temp5').html('Temp: ' + TrueTemp2 + '°F');
                    $('#Humid5').html('Humidity: ' + humidity);
                }else{
                    return;
                };
            };
        });

    
        
};

function NewCity(){
    $('.New').removeClass('Hide')
    $('.New').addClass('Show')
    var Changes = $('#State-search').val();

    City = Changes;
    $('.Where').text(City);

    MultiDay();

    $('#State-search').val('');
    $('.New').html(City);
};

function Austin(){
    City = 'Austin';
    Daily(City);
};

function prediction(weather2){
    if(weather2 == 'Clouds'){
        notWeather = 'fas fa-sun fa-smog fa-snowflake fa-cloud0rain';
        wethar = 'fas fa-cloud-sun';
    }else if(weather2 == 'Clear'){
        notWeather = 'fas fa-cloud-sun fa-smog fa-snowflake fa-poo-storm';
        wethar = 'fas fa-sun';
    }else if(weather2 == 'Atmosphere'){
        notWeather = 'fas fa-cloud-sun fa-sun fa-snowflake fa-poo-storm';
        wethar = 'fas fa-smog';
    }else if(weather2 == 'Snow'){
        notWeather = 'fas fa-cloud-sun fa-smog fa-sun fa-poo-storm';
        wethar = 'fas fa-snowflake';
    }else if(weather2 == 'Rain' || weather == 'Drizzle' || weather == 'Thunderstorm' ){
        notWeather = 'fas fa-cloud-sun fa-sun fa-smog fa-snowflake';
        wethar = 'fas fa-poo-storm';
    }else{
        return;
    };
};

Austin();
MultiDay();
$('#search').on('click', NewCity);
PreButton.on('click', Scout);

setInterval(displayDate, 1000);
