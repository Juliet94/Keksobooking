import {renderSimilarAdverts, clearMarkers} from './map.js';
import {debounce} from './utility.js';

const SIMILAR_ADVERTS_COUNT = 10;
const DEFAULT = 'any';
const RERENDER_DELAY = 500;
const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const filter = document.querySelector('.map__filters');
const selects = document.querySelectorAll('fieldset, select');

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

/* Неактивное состояние фильтра */

filter.classList.add('map__filters--disabled');
selects.forEach((select) => {
  select.setAttribute('disabled', 'disabled')
});

/* Активное состояние фильтра */

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled')
  selects.forEach((select) => {
    select.removeAttribute('disabled')
  });
}

/* Фильтрация */

const filterPrice = (data) => {
  switch (housingPrice.value) {
    case 'low':
      return data.offer.price < Price.LOW;
    case 'middle':
      return data.offer.price >= Price.LOW && data.offer.price < Price.HIGH;
    case 'high':
      return data.offer.price >= Price.HIGH;
    case 'any':
      return true;
  }
};

const filterFeatures = (data) => {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked')

  if (checkedFeatures.length === 0) {
    return true;
  }

  for (const feature of checkedFeatures) {
    if(!data.offer.features.includes(feature.value)) {
      return false;
    }
  }

  return true;
}

const filterData = (data) => {
  if ((data.offer.type === housingType.value || housingType.value === DEFAULT) &&
    (data.offer.rooms === +housingRooms.value || housingRooms.value === DEFAULT) &&
    (data.offer.guests === +housingGuests.value || housingGuests.value === DEFAULT) &&
    (filterPrice(data)) &&
    (filterFeatures(data))
  ) {
    return data;
  }
  return false;
}

const onChangeFilter = debounce((adverts) => {
  clearMarkers();
  const similarAdverts = adverts.filter(filterData).slice(0, SIMILAR_ADVERTS_COUNT);
  renderSimilarAdverts(similarAdverts)
}, RERENDER_DELAY, false)

const onDataSuccess = (adverts) => {
  activateFilter();
  renderSimilarAdverts(adverts);

  filter.addEventListener('change', () => {
    onChangeFilter(adverts)
  })
  filter.addEventListener('reset', () => {
    onChangeFilter(adverts)
  })
}

export {onDataSuccess};
