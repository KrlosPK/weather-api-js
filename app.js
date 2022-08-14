const userInput = document.querySelector(".buscador").value;
let weather = {
    apiKey: "56aed0144718ee0e48b6c07948f9b636",
    fetchWeather: function (ciudad) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                ciudad +
                "&appid=" +
                this.apiKey +
                "&units=metric&lang=es"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        if (name) {
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector(".ciudad").innerText = "Clima en " + name;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".icono").src =
                "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".descripcion").innerText = description;
            document.querySelector(".humedad").innerText =
                "Humedad: " + humidity + "%";
            document.querySelector(".viento").innerText =
                "Velocidad del viento: " + speed + " km/h";
            document.body.style.backgroundImage =
                "url('https://source.unsplash.com/1600x900/?" + name + "')";
        } else {
            document.querySelector(".ciudad").innerText =
                "Ciudad no encontrada";
            document.querySelector(".temp").innerText = "";
            document.querySelector(".icono").src = "";
            document.querySelector(".descripcion").innerText = "";
            document.querySelector(".humedad").innerText = "";
            document.querySelector(".viento").innerText = "";
            document.body.style.backgroundImage =
                "url('https://source.unsplash.com/1600x900/?404&not&found')";
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".buscador").value);
    },
};

document
    .querySelector(".buscador-container button")
    .addEventListener("click", function (e) {
        e.preventDefault();
        weather.search();
        clearSearchBar();
    });

function clearSearchBar() {
    document.querySelector(".buscador").value = "";
}
