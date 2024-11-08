import {
  WEATHER_CONDITION_CODES,
  SAVED_CITIES,
  DAY_STRING,
  MONTH_STRING,
} from '../constants.js';
import { fetchWeather } from './fetchData.js';
import { rollSlider } from '../slider.js';

const root = document.querySelector('.weather__widget');
const main = document.querySelector('main');
const sun = document.getElementById('weatherAnimation');

class getTime {
  constructor(timezone) {
    this.timezone = timezone;
  }
  get getDate() {
    return new Date();
  }
  get year() {
    let currentTime = this.getDate;
    const currYear = String(currentTime.getFullYear());
    return `‘${currYear[2]}${currYear[3]}`;
  }
  get month() {
    let currentTime = this.getDate;
    return MONTH_STRING[currentTime.getMonth()];
  }
  get day() {
    let currentTime = this.getDate;
    return currentTime.getDate();
  }
  get dayName() {
    let currentTime = this.getDate;

    return DAY_STRING[currentTime.getDay()];
  }

  get hour() {
    let currentTime = this.getDate;
    return currentTime.getHours() < 10
      ? '0' + currentTime.getHours()
      : currentTime.getHours();
  }

  get min() {
    let currentTime = this.getDate;

    return currentTime.getMinutes() < 10
      ? '0' + currentTime.getMinutes()
      : currentTime.getMinutes();
  }

  get sec() {
    let currentTime = this.getDate;

    return currentTime.getSeconds() < 10
      ? '0' + currentTime.getSeconds()
      : currentTime.getSeconds();
  }
}

function loadDate() {
  const getDate = new getTime();
  return `<p class="weather__date">${getDate.hour}:${getDate.min} - ${getDate.dayName}, ${getDate.day} ${getDate.month} ${getDate.year}</p>`;
}

export function loadMenu(data) {
  const details = {
    'Temp max': Math.round(data.main.temp_max) + '°',
    'Temp min': Math.round(data.main.temp_min) + '°',
    Humidity: data.main.humidity + '%',
    Clouds: data.clouds.all + '%',
    Wind: Math.round(data.wind.speed) + ' km/h',
  };

  const weatherCondition = WEATHER_CONDITION_CODES[data.weather[0].id];

  if (weatherCondition.includes('snow')) {
    main.removeAttribute('class');
    main.classList.add('snowblock');
    localStorage.setItem('slide', 0);
    rollSlider();
  } else if (weatherCondition.includes('rain')) {
    main.removeAttribute('class');
    main.classList.add('rainblock');

    sun.removeAttribute('class');

    localStorage.setItem('slide', 2);
    rollSlider();
  } else {
    main.removeAttribute('class');

    sun.removeAttribute('class');
    sun.classList.add('sun');

    localStorage.setItem('slide', 1);
    rollSlider();
  }

  const detailsRoot = document.querySelector('.menu__details');
  detailsRoot.innerHTML = '';
  detailsRoot.insertAdjacentHTML(
    'afterbegin',
    `<h3>${WEATHER_CONDITION_CODES[data.weather[0].id]}</h3>`
  );

  for (const key in details) {
    detailsRoot.insertAdjacentHTML(
      'beforeend',
      `<div class="weather-condition">
      <p>${key}</p>
    <div>
      <p>${details[key]}</p>
      <img src="./assets/weather-condition-icons/${key}.svg" alt="${key}" />
    </div>
    </div>`
    );
  }

  let citiesArray = JSON.parse(localStorage.getItem('savedCities'));
  SAVED_CITIES.innerHTML = '';
  if (citiesArray) {
    citiesArray.forEach(element => {
      SAVED_CITIES.insertAdjacentHTML(
        'beforeend',
        `<div>
        <p class="saved__city">${element}</p>
        <img id="trash" src="./assets/icons/trash.png" alt="trash" />
      </div>`
      );
    });
  }
}

export async function loadWidget(link) {
  const weatherData = await fetchWeather(link);
  console.log(weatherData);
  loadMenu(weatherData);

  root.innerHTML = '';
  root.insertAdjacentHTML(
    'afterbegin',
    `<h1 class="weather__temp">${Math.round(weatherData.main.temp)}°</h1>
    <div class="weather__info">
    <h2 class="weather__city">${weatherData.name}</h2>
    ${loadDate()}
    </div>
    <img class="weather__icon" src="https://openweathermap.org/img/wn/${
      weatherData.weather[0].icon
    }@2x.png" alt="icon" />`
  );
}

function setDate() {
  const getDate = new getTime();
  const parent = document.querySelector('.weather__info');

  const weatherDate = document.querySelector('.weather__date');
  if (weatherDate) {
    parent.removeChild(weatherDate);
  }

  const minutes = getDate.min;
  const seconds = getDate.sec;
  if (minutes === '00' && seconds === '00') {
    let link = localStorage.getItem('defaultLink');
    loadWidget(link);
  } else {
    parent.insertAdjacentHTML(
      'beforeend',
      `<p class="weather__date">${getDate.hour}:${getDate.min} - ${getDate.dayName}, ${getDate.day} ${getDate.month} ${getDate.year}</p>`
    );
  }
}

setInterval(() => {
  setDate();
}, 1000);
