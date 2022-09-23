const key = "6e1a3eda9fa53b82169bd49471c74f36";

const input = document.getElementById("input")
const button = document.getElementById("submit")

const weather = ()=> {
getResult(input.value)
}

const getResult = (city) =>{
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`;

  fetch(api).then((res) => res.json()).then((data)=>{
    console.log(data);
    //! const {login, avatar_url} = data ile destruct yapılsa
    let city = document.querySelector(".city");
    city.innerText = `${data.name}, ${data.sys.country}`;
    let temp = document.querySelector(".temp");
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    let icon = document.querySelector(".icon");
    icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">`;
    let desc = document.querySelector(".description");
    desc.innerText = `${(data.weather[0].description).toUpperCase()}`;
  })
  input.value = "" 
}




button.addEventListener("click", weather)
// {
//     if (!input.value) {
//     alert(`Enter a task`);
//     }

//       // input.value = "";
// }





//! Enter tuşu ile input girişi aktif olsun
input.addEventListener("keydown", (e) => {
  e.key === "Enter" && button.click();
});


//! açılınca ve refresh olunca input aktif olsun
window.addEventListener("load", () => {
  input.focus();
});