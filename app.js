const key = "6e1a3eda9fa53b82169bd49471c74f36";
const input = document.getElementById("input");
const button = document.getElementById("submit");
const ulList = document.querySelector(".ulList");
const explanation = document.querySelector(".explain");
const body = document.querySelector("body");
console.log(ulList);

//? Api'den sorgu yapmak için gerekli
const getResult = (city) => {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`;

  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { name, main, weather, sys } = data;
      ulList.innerHTML += `
      <li>
        <div class="city">${name.replace("Province", "")}
        <span class="country">${sys.country}</span> 
      </div>
        <div class="temp">${Math.round(main.temp)}°C</div>
        <div class="icon"><img src="http://openweathermap.org/img/w/${
          weather[0].icon
        }.png" alt=""></div>
        <div class="description">${weather[0].description.toUpperCase()}</div>
      </li>`;

        if (weather[0].description == "açık") {
          body.className = "sunny";
        } else if (
          weather[0].description == "az bulutlu" ||
          weather[0].description == "kapalı" ||
          weather[0].description == "parçalı bulutlu" ||
          weather[0].description == "parçalı az bulutlu" ||
          weather[0].description == "sisli"
        ) {
          body.className = "cloudy";
        } else if (
          weather[0].description == "sağanak yağmur" ||
          weather[0].description == "kısa süreli hafif yoğunluklu yağmur" ||
          weather[0].description == "kısa süreli yağmur" ||
          weather[0].description == "yağmurlu" ||
          weather[0].description == "fırtına"
        ) {
          body.className = "rainy";
        } else if (weather[0].description == "kar") {
          body.className = "snowy";
        }
    });
  input.value = "";
};

let citiesArray = [];
//? Submit butonuna basınca sorgu çalışsın
button.addEventListener("click", () => {
  if (!input.value) {
    explanation.innerText = "Please enter a city name";
  } else {
    explanation.innerText = "";
    console.log(citiesArray);
    if (citiesArray.includes(input.value.toLowerCase())) {
      explanation.innerText = `You already know the weather for 😉 ${input.value.toUpperCase()}. Please enter different city.`;
      input.value = "";
    } else {
      citiesArray.push(input.value.toLowerCase());
      return getResult(input.value);
    }
  }
});

//? Enter tuşu ile input girişi aktif olsun
input.addEventListener("keydown", (e) => {
  e.key === "Enter" && button.click();
});

//? açılınca ve refresh olunca input aktif olsun
// window.addEventListener("load", () => {
//   input.focus();
// });

//* kısa kullanım
window.onload = () =>  input.focus();
