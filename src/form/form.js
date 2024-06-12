import apiArticles from '../api/api-articles.js';
import { formData, formIsValid } from '../assets/js/utils.js';

const form = document.querySelector('#form');
const elBtnCancel = form.querySelector('#delete_btn');
const divError = form.querySelector('#div-error');
const inputTitle = document.querySelector('input[id="title"]');
const inputAuthor = document.querySelector('input[id="author"]');
const inputCategory = document.querySelector('input[id="category"]');
const inputContent = document.querySelector('textarea[id="content"]');
const inputs = [inputTitle, inputAuthor, inputCategory, inputContent];

const id = new URLSearchParams(location.search).get('id');

if (id) {
  getArticle(id);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let messageError = document.querySelector('#message-error');

  const object = formData(form);

  if (formIsValid(object)) {
    const json = JSON.stringify(object);

    if (id) {
      apiArticles.updateArticle(json, id);
    } else {
      apiArticles.sendArticle(json);
    }

    if (messageError) {
      messageError.remove();
    }
    
    location.assign('../index.html');
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

elBtnCancel.addEventListener('click', () => {
  inputs.forEach((input) => (input.value = ''));
});

async function getArticle(id) {
  const article = await apiArticles.getArticle(id);
  console.log(article);
  inputTitle.value = article.title;
  inputAuthor.value = article.author;
  inputCategory.value = article.category;
  inputContent.value = article.content;
}
