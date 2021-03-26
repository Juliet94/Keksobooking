const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const defineType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const showAdvert = (adverts) => {

  const removeFeature = (features) => {
    const featureList = advertElement.querySelector('.popup__features');

    if (!features.includes('wifi')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--wifi'))
    }

    if (!features.includes('dishwasher')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--dishwasher'))
    }

    if (!features.includes('parking')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--parking'))
    }

    if (!features.includes('washer')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--washer'))
    }

    if (!features.includes('elevator')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--elevator'))
    }

    if (!features.includes('conditioner')) {
      featureList.removeChild(featureList.querySelector('.popup__feature--conditioner'))
    }
  }

  const getPhoto = (photos) => {
    const photoElement = advertElement.querySelector('.popup__photos').querySelector('.popup__photo');

    advertElement.querySelector('.popup__photos').removeChild(photoElement);

    photos.forEach((value, index) => {
      advertElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', `<img src="${photos[index]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }

  const advertElement = cardTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();

  advertElement.querySelector('.popup__title').textContent = adverts.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = adverts.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = adverts.offer.price + '₽/ночь';
  advertElement.querySelector('.popup__type').textContent = defineType(adverts.offer.type);
  advertElement.querySelector('.popup__text--capacity').textContent = `${adverts.offer.rooms} комнаты для ${adverts.offer.guests} гостей`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${adverts.offer.checkin}, выезд до ${adverts.offer.checkout}`;
  removeFeature(adverts.offer.features);
  advertElement.querySelector('.popup__description').textContent = adverts.offer.description;
  if (adverts.offer.photos.length > 1) {
    getPhoto(adverts.offer.photos);
  } else {
    advertElement.querySelector('.popup__photos').querySelector('.popup__photo').src = adverts.offer.photos;
  }
  advertElement.querySelector('.popup__avatar').src = adverts.author.avatar;

  return(fragment.appendChild(advertElement));
}

export {showAdvert};
