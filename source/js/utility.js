/* Обработчики событий */

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closeOnEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    document.body.removeChild(document.body.lastChild);
    evt.target.removeEventListener('keydown', closeOnEsc)
  }
}

const closeOnClick = (evt) => {
  evt.preventDefault();
  evt.target.remove();
  evt.target.removeEventListener('click', closeOnClick)
}

const closeOnClickButton = (evt) => {
  evt.preventDefault();
  evt.target.closest('div').remove();
  evt.target.removeEventListener('click', closeOnClickButton)
}

/* Функция debounce из библиотеки lodash */

const debounce = (func, wait, immediate) => {
  let timeout;

  return (...args) => {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export {
  closeOnEsc,
  closeOnClick,
  closeOnClickButton,
  debounce
};
