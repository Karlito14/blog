import apiArticles from '../api/api-articles.js';

const form = document.querySelector('#form');
const elDeleteBtn = form.querySelector('#delete_btn');
const divError = form.querySelector('#div-error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  let messageError = document.querySelector('#message-error');

  const object = {};

  for (const entry of formData) {
    let value = entry[1].trim();
    value = value.replaceAll('  ', ' ');
    value = value[0]?.toUpperCase() + value.slice(1);
    object[entry[0]] = value;
  }

  if (formIsValid(object)) {
    const json = JSON.stringify(object);
    apiArticles.sendArticle(json);
    if (messageError) {
      messageError.remove();
    }
    console.log(json);
    window.location = '../index.html';
  } else {
    if (!messageError) {
      messageError = document.createElement('p');
      messageError.setAttribute('class', 'text-error');
      messageError.setAttribute('id', 'message-error');
      messageError.textContent =
        'Veuillez remplir toutes les champs obligatoires';
      divError.append(messageError);
    }
  }
});

const formIsValid = (object) => {
  for (const property in object) {
    if (object[property] === 'undefined') {
      return false;
    }
  }
  return true;
};
