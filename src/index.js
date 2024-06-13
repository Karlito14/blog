import apiArticles from './api/api-articles.js';

let articles = await apiArticles.getArticles();
const elList = document.querySelector('.list');
const elCategoryList = document.querySelector('.aside__list');
const template = document.querySelector('#template_article');
const optionsDate = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

if (!Array.isArray(articles)) {
  articles = [articles];
}

initPage(articles);
displayMenuCategory(articles);

function initPage(articleList) {
  displayArticles(articleList);
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
      displayMenuCategory(articles);
    });

    btnUpdate.addEventListener('click', async () => {
      location.assign(`/form/form.html?id=${article._id}`);
    });

    elList.append(clone);
  });
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

function displayMenuCategory(articleList) {
  elCategoryList.innerHTML = '';
  const articles = articleList.sort((a, b) => {
    return a.category.localeCompare(b.category);
  });
  const categories = retrieveCategories(articles);

  for (const category in categories) {
    const li = document.createElement('li');
    li.setAttribute('class', 'item-category');
    li.setAttribute('data-id', category);
    li.textContent = `${category} (${categories[category]})`;
    elCategoryList.append(li);
  }

  handleEventCategory(articleList);
}

function handleEventCategory(articleList) {
  const elementsCategory = document.querySelectorAll('.item-category');

  elementsCategory.forEach((category) => {
    category.addEventListener('click', () => {
      if (category.classList.contains('active')) {
        category.classList.remove('active');
        initPage(articles);
      } else {
        elementsCategory.forEach((element) =>
          element.classList.remove('active')
        );
        category.classList.add('active');
        const filterArticles = articleList.filter(
          (article) => article.category === category.dataset.id
        );
        initPage(filterArticles);
      }
    });
  });
}

function retrieveCategories(articleList) {
  const categories = articleList.reduce((acc, curr) => {
    if (acc[curr.category]) {
      acc[curr.category]++;
    } else {
      acc[curr.category] = 1;
    }
    return acc;
  }, {});

  return categories;
}

function findIndex(articles, id) {
  return articles.findIndex((article) => article._id === id);
}
