const SERVER = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(`${SERVER}/data`)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      onFail();
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
}

export {getData, sendData}
