class ApiArticles {
  constructor(url) {
    this.BASE_URL = url;
  }

  async getArticles() {
    try {
      const promesse = await fetch(`${this.BASE_URL}/articles`);
      const resultat = await promesse.json();
      return resultat;
    } catch (error) {
      console.error('Erreur :', erreur);
    }
  }

  async sendArticle(json) {
    try {
      const promesse = await fetch(`${this.BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
      });

      const response = await promesse.json();

      console.log('Réussite :', response);
    } catch (erreur) {
      console.error('Erreur :', erreur);
    }
  }
}

export default new ApiArticles('https://restapi.fr/api');