import {renderSimilarAdverts, clearMarkers} from './map.js';

const SIMILAR_ADVERTS_COUNT = 10;
const DEFAULT = 'any';

const filter = document.querySelector('.map__filters');
const selects = document.querySelectorAll('fieldset, select');

const housingType = document.querySelector('#housing-type');

/* Неактивное состояние фильтра */

filter.classList.add('map__filters--disabled');
selects.forEach((value) => {
  value.setAttribute('disabled', 'disabled')
});

/* Активное состояние фильтра */

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled')
  selects.forEach((value) => {
    value.removeAttribute('disabled')
  });
}

/* Фильтрация */

const filterData = (data) => {
  if ((data.offer.type === housingType.value || housingType.value === DEFAULT)) {
    return data;
  }
  return false;
}

const onDataSuccess = (adverts) => {
  activateFilter();
  renderSimilarAdverts(adverts);

  filter.addEventListener('change', () => {
    clearMarkers();

    const similarAdverts = adverts.filter(filterData).slice(0, SIMILAR_ADVERTS_COUNT);
    renderSimilarAdverts(similarAdverts)
  })
}

export {onDataSuccess};
