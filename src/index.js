import apiArticles from './api/api-articles.js';

const articles = await apiArticles.getArticles();
const elList = document.querySelector('.list');
const template = document.querySelector('#template_article');
const optionsDate = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

const ElCategoryList = document.querySelector('.aside__list');

console.log(articles);

initPage(articles);

function initPage(articleList) {
  if (Array.isArray(articleList)) {
    displayArticles(articleList);
  } else if (typeof articleList === 'object') {
    displaySingleArticle(articleList);
  }
}

function displayArticles(articles) {
  elList.innerHTML = '';

  articles.forEach((article) => {
    const clone = createElement(article, template);
    const btnDelete = clone.children[0].querySelector('#delete_btn');
    const btnUpdate = clone.children[0].querySelector('#update_btn');

    itemCategory(article.category);

    btnDelete.addEventListener('click', async () => {
      await apiArticles.deleteArticle(article._id);
      const index = findIndex(articles, article._id);
      articles.splice(index, 1);
      displayArticles(articles);
    });

    btnUpdate.addEventListener('click', async () => {
      location.assign(`/form/form.html?id=${article._id}`);
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
  author.textContent = `${article.author} - ${new Date(
    article.createdAt
  ).toLocaleDateString('fr-FR', optionsDate)}`;

  const content = clone.querySelector('#content');
  content.textContent = article.content;

  return clone;
}

function itemCategory(category) {
  let li = document.querySelector(`#item-${category}`);
  if (!li) {
    li = document.createElement('li');
    li.setAttribute('id', `item-${category}`);
    li.setAttribute('class', 'item-category')
    li.textContent = `- ${category}`;
    ElCategoryList.append(li);
  }
}

function findIndex(articles, id) {
  return articles.findIndex((article) => article._id === id);
}
