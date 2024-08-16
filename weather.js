// ----- Today
let todayName= document.getElementById('today_date_day_name')
let todayNum= document.getElementById('today_date_day_number')
let todayMonth= document.getElementById('today_date_month')
let todayLocation= document.getElementById('today_location')
let todayTemp= document.getElementById('today_temp')
let todayConditionText= document.getElementById('today_condition_text')
let todayConditionImg= document.getElementById('today_condition_img')
let wind= document.getElementById('wind')
let windDirec= document.getElementById('wind_direction')
let humidaty= document.getElementById('humidity')


// ----- next day
let nextDay =  document.getElementsByClassName('next_day_name')
let nextMaxTemp =  document.getElementsByClassName('next_max_temp')
let nextMinTemp =  document.getElementsByClassName('next_min_temp')
let nextConditionText =  document.getElementsByClassName('next_condition_text')
let nextConditionImg =  document.getElementsByClassName('next_condition_img')


let search = document.getElementById('search')

console.log(search)


async function displayWeather(city){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f6f7b7b3cff94fc6bd730046241404&q=${city}&days=3`)
    let weatherDate = await weatherResponse.json()
    return weatherDate;
}


async function startApp(city='cairo'){
    let weatherData = await displayWeather(city)
    if(!weatherData.error){
        weatherToday(weatherData)
        weatherNextDays(weatherData)

    }
}


startApp()

search.addEventListener('input',function() {
    startApp(search.value)
})


function weatherToday(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString('en-US', { weekday: 'long' });
    todayNum.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString('en-US', { month: 'long' });
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionText.innerHTML = data.current.condition.text;
    todayConditionImg.setAttribute('src', `https:${data.current.condition.icon}`);
    wind.innerHTML = data.current.wind_kph + ' km/h';
    windDirec.innerHTML = data.current.wind_dir;
    humidaty.innerHTML = data.current.humidity + '%';
  }
  

function weatherNextDays(data){

    let forecastDate = data.forecast.forecastday
    for (let i = 0; i < 2 ; i++) {
        let nextDate = new Date(forecastDate[i+1].date)
        nextDay[i].innerHTML=nextDate.toLocaleDateString('en-Us',{weekday:'long'})
        nextMaxTemp[i].innerHTML=forecastDate[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML=forecastDate[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = forecastDate[i+1].day.condition.text
        nextConditionImg[i].setAttribute('src',`https:${forecastDate[i+1].day.condition.icon}`)
                }

}

