document.getElementById('search').addEventListener('input', function(event) {
      const query = event.target.value.toLowerCase();
      const articles = document.querySelectorAll('article');

      articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        if (title.includes(query)) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });
    });
