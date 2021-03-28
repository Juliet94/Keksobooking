import {showErrorMessageSend, showSuccessMessageSend} from './popup-message.js';
import {sendData} from './server.js';
import {resetMap} from './map.js';
import {showPreview} from './preview.js';

const DEFAULT_IMG = 'img/muffin-grey.svg'
const TypePrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
}

const form = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const fieldsets = form.querySelectorAll('fieldset');
const resetButton = form.querySelector('.ad-form__reset');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const room = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const avatarInput  = form.querySelector('#avatar');
const photoInput = form.querySelector('#images');
const avatarPreview = form.querySelector('.ad-form-header__preview img')
const photoPreview = form.querySelector('.ad-form__photo img');

/* Неактивное состояние формы */

form.classList.add('ad-form--disabled');
fieldsets.forEach((fieldset) => {
  fieldset.setAttribute('disabled', 'disabled')
});

/* Активное состояние формы */

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled')
  });
}

/* Валидация формы */

const onSelectType = () => {
  price.value = '';

  switch (type.value) {
    case 'flat':
      return [price.placeholder = TypePrice.FLAT] [price.min = TypePrice.FLAT];
    case 'bungalow':
      return [price.placeholder = TypePrice.BUNGALOW] [price.min = TypePrice.BUNGALOW];
    case 'house':
      return [price.placeholder = TypePrice.HOUSE] [price.min = TypePrice.HOUSE];
    case 'palace':
      return [price.placeholder = TypePrice.PALACE] [price.min = TypePrice.PALACE];
  }
}

const onSelectCheckInOut = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
}

const onSelectRoom = () => {
  if ((room.value === '100' && capacity.value !== '0') || (room.value !== '100' && capacity.value === '0')) {
    room.setCustomValidity('Значению "100 комнат" должно соответствовать "Не для гостей"');
    capacity.setCustomValidity('Значению "100 комнат" должно соответствовать "Не для гостей"');
  } else if (room.value < capacity.value) {
    room.setCustomValidity('');
    capacity.setCustomValidity('Гостей не должно быть больше, чем комнат');
  } else if (room.value === capacity.value || ((room.value === '100') && capacity.value === '0')) {
    room.setCustomValidity('');
    capacity.setCustomValidity('');
  } else {
    room.setCustomValidity('');
    capacity.setCustomValidity('');
  }
}

const validateForm = () => {
  type.addEventListener('change', onSelectType);
  timeIn.addEventListener('change', onSelectCheckInOut);
  timeOut.addEventListener('change', onSelectCheckInOut);
  room.addEventListener('change', onSelectRoom);
  capacity.addEventListener('change', onSelectRoom);
}

showPreview(avatarInput, avatarPreview);
showPreview(photoInput, photoPreview);

/* Отправка и сброс формы */

const resetImg = () => {
  avatarPreview.src = DEFAULT_IMG;
  photoPreview.src = DEFAULT_IMG;
}

const resetForm = () => {
  form.reset();
  filter.reset();
  resetMap();
  resetImg();
}

const handleSuccess = () => {
  resetForm();
  showSuccessMessageSend();
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(handleSuccess, showErrorMessageSend, formData);
  resetImg();
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm()
})

export {activateForm, validateForm};
