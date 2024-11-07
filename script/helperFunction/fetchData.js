import { loadWidget } from './loadContent.js';

export function getMyLocation() {
  function onSuccessLocation(position) {
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=11a8f32145f0e588bbdc9065c191a241`;
    localStorage.setItem('defaultLink', link);
    loadWidget(link);
  }

  function onErrorLocation(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        console.log('Ошибка: доступ к геолокации запрещён пользователем.');
        break;
      case err.POSITION_UNAVAILABLE:
        console.log('Ошибка: данные о местоположении недоступны.');
        break;
      case err.TIMEOUT:
        console.log(
          'Ошибка: время ожидания ответа от службы геолокации истекло.'
        );
        break;
      default:
        console.log(
          'Ошибка: неизвестная ошибка при получении геолокации.',
          err.message
        );
        break;
    }
  }

  navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation);
}

export function setDefaultLink() {
  const defaultLink = localStorage.getItem('defaultLink');
  if (defaultLink) {
    return defaultLink;
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
