// scripts/script_news.js
document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const itemsPerPage = 5;
    const totalPages = Math.ceil(newsArticles.length / itemsPerPage);

    function renderPage() {
        const displayedItems = newsArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        const ul = document.querySelector('.news-list');
        ul.innerHTML = '';

        displayedItems.forEach((it, idx) => {
            const li = document.createElement('li');
            li.className = `news-item ${idx === 0 ? 'news-item-border-top' : ''} ${idx === displayedItems.length - 1 ? 'news-item-border-bottom' : ''}`;

            const a = document.createElement('a');
            a.href = `newsArticle/newsArticle_${it.id.replace('news-', '')}.html`;

            const dateDiv = document.createElement('div');
            dateDiv.className = 'news-date';
            dateDiv.textContent = it.date;

            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'news-body';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'news-title';
            titleDiv.textContent = it.title;

            bodyDiv.appendChild(titleDiv);
            a.appendChild(dateDiv);
            a.appendChild(bodyDiv);
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    function renderPagination() {
        const nav = document.querySelector('.news-nav');
        nav.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-arrow nav-single prev';
        prevBtn.setAttribute('aria-label', 'Previous page');
        prevBtn.innerHTML = '&lt;';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage();
                renderPagination();
            }
        });
        nav.appendChild(prevBtn);

        // Page numbers
        const pagesNav = document.createElement('nav');
        pagesNav.className = 'nav-pages';
        pagesNav.setAttribute('aria-label', 'Page numbers');

        for (let page = 1; page <= totalPages; page++) {
            if (page > 1) {
                const sep = document.createElement('span');
                sep.className = 'sep';
                sep.textContent = '|';
                pagesNav.appendChild(sep);
            }

            const pageBtn = document.createElement('button');
            pageBtn.className = `page ${page === currentPage ? 'active' : ''}`;
            pageBtn.textContent = page;
            pageBtn.addEventListener('click', () => {
                currentPage = page;
                renderPage();
                renderPagination();
            });
            pagesNav.appendChild(pageBtn);
        }
        nav.appendChild(pagesNav);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-arrow nav-single next';
        nextBtn.setAttribute('aria-label', 'Next page');
        nextBtn.innerHTML = '&gt;';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage();
                renderPagination();
            }
        });
        nav.appendChild(nextBtn);
    }

    renderPagination();
    renderPage();
});