document.addEventListener("DOMContentLoaded", () => {
    const booksContainer = document.getElementById("booksContainer");
    const searchInput = document.getElementById("searchInput");
    const favoriteBtn = document.getElementById("favoriteBtn");
    const categoryButtons = document.querySelectorAll(".category-btn");

    let books = [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let selectedCategory = "";

    async function loadBooks() {
        try {
            const response = await fetch("books.json");
            books = await response.json();
            renderBooks();
        } catch (error) {
            console.error("Ошибка загрузки книг:", error);
        }
    }

    function renderBooks(filter = "", showFavorites = false) {
        booksContainer.innerHTML = "";

        const filteredBooks = books.filter(book => {
            const matchesTitle = book.title.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = selectedCategory === "" || book.category.toLowerCase() === selectedCategory;
            const isFavorite = favorites.includes(book.title);
            return matchesTitle && matchesCategory && (!showFavorites || isFavorite);
        });

        filteredBooks.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card");

            const isFavorite = favorites.includes(book.title);

            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.description}</p>
                <a href="${book.link}" target="_blank" class="read-btn">Читать онлайн</a>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-title="${book.title}">
                    ${isFavorite ? "⭐" : "☆"}
                </button>
            `;

            booksContainer.appendChild(bookCard);
        });

        document.querySelectorAll(".favorite-btn").forEach(button => {
            button.addEventListener("click", (e) => toggleFavorite(e.target.dataset.title));
        });
    }

    function toggleFavorite(title) {
        if (favorites.includes(title)) {
            favorites = favorites.filter(book => book !== title);
        } else {
            favorites.push(title);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderBooks(searchInput.value, favoriteBtn.classList.contains("active"));
    }

    searchInput.addEventListener("input", () => {
        renderBooks(searchInput.value, favoriteBtn.classList.contains("active"));
    });

    favoriteBtn.addEventListener("click", () => {
        favoriteBtn.classList.toggle("active");
        renderBooks(searchInput.value, favoriteBtn.classList.contains("active"));
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            selectedCategory = button.dataset.category.toLowerCase();
            renderBooks(searchInput.value);
        });
    });

    loadBooks();
});
