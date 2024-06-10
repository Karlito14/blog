import apiArticles from './api/api-articles.js';

const articles = await apiArticles.getArticles();
console.log(articles);
