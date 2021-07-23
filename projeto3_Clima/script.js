// https://openweathermap.org/current
const API_KEY = '0ba8d4049fb3a0a7dc1882ffde2b98d8';

document.querySelector(".busca").addEventListener('submit', async (event)=>{
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;
  
  if(input.trim() !== ''){
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${API_KEY}&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();
    //console.log(json);

    if(json.cod === 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    }
    else{
      clearInfo();
      showWarning('Não encontramos essa localização!');
    }
  }
  else
    clearInfo();

});

function showInfo(json){
  console.log(json);
  showWarning('');

  // set dados
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

  // set image
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

  // show resultado
  document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}