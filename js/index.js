const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

async function retrieveWeather(){
    const city = document.querySelector('.search-box input').value
    const apiKey = 'ec2ad8dd74cd486d210cc61de0f07af5'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    if(city === '') 
        return

    try{
        const response = await fetch(url)

        if(!response.ok){
            console.log(`Error: ${response.status}`)
            
            if(response.status === 404){
                container.style.height = '400px'
                weatherBox.style.display = 'none'
                weatherDetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
            }
            return
        }

        error404.style.display = 'none'
        error404.classList.remove('fadeIn')

        const jsonResponse = await response.json()

        displayData(jsonResponse)
    }
    catch(err){
        console.log(err)
    }
}

const displayData = json => {
    const image = document.querySelector('.weather-box img')
    const temperature = document.querySelector('.weather-box .temperature')
    const description = document.querySelector('.weather-box .description')
    const humidity = document.querySelector('.weather-details .humidity span')
    const wind = document.querySelector('.weather-details .wind span')

    switch(json.weather[0].main){
        case 'Clear':
            image.src = 'images/clear.png'
            break

        case 'Rain':
            image.src = 'images/rain.png'
            break

        case 'Snow':
            image.src = 'images/snow.png'
            break

        case 'Clouds':
            image.src = 'images/cloud.png'
            break

        case 'Haze':
        image.src = 'images/mist.png'
        break

        default:
            image.src = ''
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
    description.innerHTML = `${json.weather[0].description}`
    humidity.innerHTML = `${json.main.humidity}%`
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

    weatherBox.style.display = ''
    weatherDetails.style.display = ''
    weatherBox.classList.add('fadeIn')
    weatherDetails.classList.add('fadeIn')
    container.style.height = '590px'
}

search.addEventListener('click', () => {retrieveWeather()})