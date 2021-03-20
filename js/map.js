/* global L:readonly */

import {showAdvert} from './card-advert.js';
import {activateForm} from './form.js';

/* Создание карты */

const centerTokyo =
  {
    lat: 35.65951,
    lng: 139.72165,
  }

const map = L.map('map-canvas')
  .on('load', activateForm)
  .setView({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/* Главная метка */

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const address = document.querySelector('#address');
address.value = `${centerTokyo.lat}, ${centerTokyo.lng}`;
const getCoordinates = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

mainPinMarker.addTo(map);
mainPinMarker.on('drag', (evt) => {
  getCoordinates(evt.target.getLatLng());
});

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  });
  map.setView({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  }, 12);
  address.value = `${centerTokyo.lat}, ${centerTokyo.lng}`
}

/* Обычные метки */

const markers = L.layerGroup();

const usualPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const renderSimilarAdverts = (adverts) => {

  adverts.forEach((advert) => {

    const usualPinMarker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: usualPinIcon,
      },
    )

    markers.addLayer(usualPinMarker)

    usualPinMarker
      .bindPopup(
        showAdvert(advert),
        {
          keepInView: true,
        },
      );
  })
  markers.addTo(map);
}

const clearMarkers = () => {
  map.closePopup();
  markers.clearLayers();
}

export {resetMap, renderSimilarAdverts, clearMarkers};
