/* Обработчики событий */

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closeOnEsc = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      popup.remove();
    }
  })
}

const closeOnClick = (popup, button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.remove();
  })
}

/* Функция debounce из библиотеки lodash */

const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export {
  closeOnEsc,
  closeOnClick,
  debounce
};
