import { SAVED_CITIES, CITIES } from './constants.js';
import { loadWidget } from './helperFunction/loadContent.js';

SAVED_CITIES.addEventListener('click', e => {
  let hoveredCity = e.target;
  if (!hoveredCity.id) {
    let savedLat = CITIES[hoveredCity.innerText].lat;
    let savedLon = CITIES[hoveredCity.innerText].lon;
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${savedLat}&lon=${savedLon}&units=metric&appid=11a8f32145f0e588bbdc9065c191a241`;
    localStorage.setItem('defaultLink', link);
    loadWidget(link);
  } else {
    let parent = e.target.parentNode;
    deleteSavedCity(parent);
  }
});

function deleteSavedCity(parent) {
  let oldSavedCities = JSON.parse(localStorage.getItem('savedCities'));
  let id = oldSavedCities.indexOf(parent.innerText);

  oldSavedCities.splice(id, 1);
  localStorage.setItem('savedCities', JSON.stringify(oldSavedCities));

  loadWidget(localStorage.getItem('defaultLink'));
}
