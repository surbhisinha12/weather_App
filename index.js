const apiKey = "f66071afd319397c8ae7a9a9db221c7e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        }
        const data = await response.json();
        console.log(data);
           document.querySelector(".city").innerHTML = data.name;
           document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
           document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
           document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
          console.error("Error fetching weather data:", error.message);
        if (error.message === "City not found") {
           const msg = document.createElement("div");
           msg.className = "msg_dispaly";
           msg.textContent = "City not found. Please enter a valid city name";
           document.body.appendChild(msg);
           document.querySelector(".city").innerHTML ="" ;
           document.querySelector(".temp").innerHTML = "";
           document.querySelector(".humidity").innerHTML = "";
           document.querySelector(".wind").innerHTML = "";
            setTimeout(()=>{
             msg.remove()
           },3000);
           
        }
    }
    
}
