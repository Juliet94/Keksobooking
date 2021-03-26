import {closeOnEsc, closeOnClick} from './utility.js';

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
}

const showErrorMessageSend = () => {
  errorMessage.querySelector('.error__message').textContent = 'Ошибка размещения объявления';
  errorMessage.querySelector('.error__button').textContent = 'Попробовать снова';
  document.body.appendChild(errorMessage);
}

/* Успех */

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const successMessage = successTemplate.cloneNode(true);

const showSuccessMessageSend = () => {
  document.body.appendChild(successMessage);
}

/* Обработчики событий */

closeOnEsc(errorMessage);
closeOnClick(errorMessage, closeErrorButton);
closeOnClick(errorMessage, errorMessage);

closeOnEsc(successMessage);
closeOnClick(successMessage, successMessage);

export {showErrorMessageGet, showErrorMessageSend, showSuccessMessageSend}
