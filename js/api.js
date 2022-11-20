const GET_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_URL = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSucess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((images) => {
      onSucess(images);
    })
    .catch(onFail);
};

const sendData = (onSucess, onFail, body) => {
  fetch(SEND_URL,
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
