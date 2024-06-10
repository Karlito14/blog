import apiArticles from './api/api-articles.js';

const articles = await apiArticles.getArticles();
console.log(articles);
const elList = document.querySelector('.list');
const template = document.querySelector('#template_article');

articles.forEach((article) => {
  const clone = createElement(article, template);
  const btnDelete = clone.children[0].querySelector('#delete_btn');
  btnDelete.setAttribute('data-id', article._id);
  console.log(btnDelete);
  elList.append(clone);
});

function createElement(article, template) {
  const clone = template.content.cloneNode(true);

  const title = clone.querySelector('#title');
  title.textContent = article.title;

  const author = clone.querySelector('#author');
  author.textContent = article.author;

  const content = clone.querySelector('#content');
  content.textContent = article.content;

  return clone;
}
