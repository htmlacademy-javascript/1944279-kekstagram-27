const URL = 'https://27.javascript.pages.academy/kekstagram/data';
const getData = (onSucess, onFail) => {
  fetch(URL)
    .then((response) => response.json())
    .then((images) => {
      onSucess(images);
    })
    .catch(onFail);
};

const sendData = (onSucess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSucess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
