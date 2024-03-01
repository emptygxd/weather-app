import { loadWidget } from './helper function/loadContent.js';

export function autocomplete(data) {
  let inputs = document.querySelectorAll('#autocomplete');

  function upperSearch(inputCity, dataCity) {
    return dataCity.toUpperCase().search(inputCity.toUpperCase());
  }

  inputs.forEach(input => {
    input.classList.add('autocomplete-input');
    let wrap = document.createElement('div');
    wrap.className = 'autocomplete-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    let list = document.createElement('div');
    list.className = 'autocomplete-list';
    wrap.appendChild(list);

    let matches = [];
    let listItems = [];
    let focusedItem = -1;

    function setActive(active) {
      if (active) wrap.classList.add('active');
      else wrap.classList.remove('active');
    }

    function selectItem(data, index) {
      if (!listItems[index]) return false;

      input.value = listItems[index].innerText;
      setActive(false);

      const city = listItems[index].innerText;
      const lat = data[city].lat;
      const lon = data[city].lon;
      let oldSavedCities = [];

      let link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=11a8f32145f0e588bbdc9065c191a241`;
      localStorage.setItem('defaultLink', link);

      if (localStorage.getItem('savedCities')) {
        oldSavedCities = JSON.parse(localStorage.getItem('savedCities'));
      }

      if (!oldSavedCities.includes(city)) {
        oldSavedCities.push(city);

        oldSavedCities.sort();
        localStorage.setItem('savedCities', JSON.stringify(oldSavedCities));
      }

      loadWidget(link);
    }

    input.addEventListener('input', () => {
      let value = input.value;
      if (!value) return setActive(false);

      list.innerHTML = '';
      listItems = [];

      Object.keys(data).forEach((element, index) => {
        let search = upperSearch(value, element);
        if (search === -1) return false;
        matches.push(index);

        let parts = [
          element.substr(0, search),
          element.substr(search, value.length),
          element.substr(
            search + value.length,
            element.length - search - value.length
          ),
        ];

        let item = document.createElement('button');
        item.className = 'autocomplete-item';
        item.innerHTML =
          parts[0] + '<strong>' + parts[1] + '</strong>' + parts[2];
        list.appendChild(item);
        listItems.push(item);

        item.addEventListener('click', () => {
          selectItem(data, listItems.indexOf(item));
        });
      });

      if (listItems.length > 0) setActive(true);
      else setActive(false);
    });

    input.addEventListener('keydown', e => {
      let keyCode = e.keyCode;

      if (keyCode === 27) {
        setActive(false);
      } else if (keyCode === 13) {
        selectItem(data, focusedItem);
      }
    });

    document.body.addEventListener('click', e => {
      if (!wrap.contains(e.target)) setActive(false);
    });
  });
}
