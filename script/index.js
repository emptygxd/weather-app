import { CITIES } from './constants.js';
import { setDefaultLink, getMyLocation } from './helper function/fetchData.js';
import { loadWidget } from './helper function/loadContent.js';
import { autocomplete } from './autocomplete.js';
import {} from './saveCity.js';
import {} from './slider.js';

const myLocationButton = document.getElementById('myLocation');

let link = setDefaultLink();
autocomplete(CITIES);

window.addEventListener('DOMContentLoaded', loadWidget(link));
myLocationButton.addEventListener('click', getMyLocation);
