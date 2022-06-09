export const getWeatherByCity = city => {
    let apiKey = '49ed068a2b669484d6e6e17bbfdccbb4';
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
    .then(response => response.json())
    .then(data => data);
}
