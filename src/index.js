import apiArticles from './api/api-articles.js';

const articles = await apiArticles.getArticles();
const elList = document.querySelector('.list');
const template = document.querySelector('#template_article');

console.log(articles)

if (Array.isArray(articles)) {
  displayArticles(articles);
} else if (typeof articles === 'object') {
  displaySingleArticle(articles);
}

function displayArticles(articles) {
  elList.innerHTML = '';

  articles.forEach((article) => {
    const clone = createElement(article, template);
    const btnDelete = clone.children[0].querySelector('#delete_btn');

    btnDelete.addEventListener('click', async () => {
      await apiArticles.deleteArticle(article._id);
      const index = findIndex(articles, article._id);
      articles.splice(index, 1);
      displayArticles(articles);
    });

    elList.append(clone);
  });
}

function displaySingleArticle(article) {
  const clone = createElement(article, template);
  const btnDelete = clone.children[0].querySelector('#delete_btn');

  btnDelete.addEventListener('click', async () => {
    await apiArticles.deleteArticle(article._id);
    elList.innerHTML = '';
  });

  elList.append(clone);
}

function createElement(article, template) {
  const clone = template.content.cloneNode(true);

  const title = clone.querySelector('#title');
  title.textContent = article.title;

  const author = clone.querySelector('#author');
  const optionsDate = {
    weekday : 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }
  author.textContent = `${article.author} - ${(new Date(article.createdAt)).toLocaleDateString('fr-FR', optionsDate)}`;

  const content = clone.querySelector('#content');
  content.textContent = article.content;

  return clone;
}

function findIndex(articles, id) {
  return articles.findIndex((article) => article._id === id);
}
