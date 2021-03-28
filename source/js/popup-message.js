import {closeOnEsc, closeOnClick, closeOnClickButton} from './utility.js';

/* Обработчики событий */

const onShowError = () => {
  errorMessage.addEventListener('keydown',closeOnEsc);
  errorMessage.addEventListener('click',closeOnClick);
  closeErrorButton.addEventListener('click', closeOnClickButton);
}

const onShowSuccess = () => {
  successMessage.addEventListener('keydown',closeOnEsc);
  successMessage.addEventListener('click',closeOnClick);
}

/* Ошибка */

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const errorMessage = errorTemplate.cloneNode(true);
const closeErrorButton = errorMessage.querySelector('.error__button');

const showErrorMessageGet = () => {
  errorMessage.querySelector('.error__message').textContent = 'Ошибка загрузки данных похожих объявлений';
  errorMessage.querySelector('.error__button').textContent = 'OK';
  document.body.appendChild(errorMessage);
  onShowError();
}

const showErrorMessageSend = () => {
  errorMessage.querySelector('.error__message').textContent = 'Ошибка размещения объявления';
  errorMessage.querySelector('.error__button').textContent = 'Попробовать снова';
  document.body.appendChild(errorMessage);
  onShowError();
}

/* Успех */

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplate.cloneNode(true);

const showSuccessMessageSend = () => {
  document.body.appendChild(successMessage);
  onShowSuccess();
}

export {showErrorMessageGet, showErrorMessageSend, showSuccessMessageSend}
