import apiArticles from './api/api-articles.js';

const articles = await apiArticles.getArticles();
const elList = document.querySelector('.list');
const ElCategoryList = document.querySelector('.aside__list');
const template = document.querySelector('#template_article');
const optionsDate = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

console.log(articles);

initPage(articles);
createMenuCategory(articles);

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

function createMenuCategory(articleList) {
  const categories = retrieveCategories(articleList);

  for (const category in categories) {
    const li = document.createElement('li');
    li.setAttribute('class', 'item-category');
    li.textContent = `- ${category} (${categories[category]})`;
    ElCategoryList.append(li);

    li.addEventListener('click', () => {
      if (category === 'Tous') {
        initPage(articles);
      } else {
        const filterArticles = articleList.filter(
          (article) => article.category === category
        );
        initPage(filterArticles);
      }
    });
  }
}

function retrieveCategories(articleList) {
  const categories = articleList.reduce(
    (acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category]++;
      } else {
        acc[curr.category] = 1;
      }
      return acc;
    },
    { Tous: articleList.length }
  );

  return categories;
}

function findIndex(articles, id) {
  return articles.findIndex((article) => article._id === id);
}
