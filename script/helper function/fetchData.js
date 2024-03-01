import { loadWidget } from './loadContent.js';

export function getMyLocation() {
  function onSuccessLocation(position) {
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=11a8f32145f0e588bbdc9065c191a241`;
    localStorage.setItem('defaultLink', link);
    loadWidget(link);
  }

  function onErrorLocation(err) {
    console.log('err', err);
  }

  navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation);
}

export function setDefaultLink() {
  if (localStorage.getItem('defaultLink')) {
    return localStorage.getItem('defaultLink');
  } else {
    return 'https://api.openweathermap.org/data/2.5/weather?lat=51.51&lon=-0.13&units=metric&appid=11a8f32145f0e588bbdc9065c191a241';
  }
}

export async function fetchWeather(link) {
  const res = await fetch(link, {
    method: 'GET',
  });
  return res.json();
}
