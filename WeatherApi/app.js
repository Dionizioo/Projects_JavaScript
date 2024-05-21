let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');
let horario = document.querySelector('.time');

//caso o formulario seja enviado
form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        //buscar o clima
        searchWeather();
    }
});

//Aqui será feita a busca do clima
const searchWeather = () => {
    fetch(url+'&q='+ valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //verificar se a cidade foi encontrada
            if(data.cod == 200){
                city.querySelector('figcaption').innerHTML = data.name;
                //adicionar a bandeira do pais
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                //adicionar a temperatura
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                //adicionar a descrição
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;


            //caso a cidade não seja encontrada
            }else{
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
}

//funcao para pegar a hora atual
const getTime = ()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    horario.innerText = `${hours}h:${minutes}min`;
}
getTime();
//atualizar a hora a cada 1 minuto
setInterval(getTime, 60000);

// search Default
const initApp = () => {
    valueSearch.value = 'Rio de janeiro';
    searchWeather();

}
initApp();