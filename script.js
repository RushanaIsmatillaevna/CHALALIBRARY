const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Interesting", image: "https://m.media-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_FMjpg_UX1000_.jpg" },
    { title: "Pride and Prejudice", author: "Jane Austen", category: "Popular", image: "https://m.media-amazon.com/images/I/81mTGi9gs-L._AC_UF894,1000_QL80_.jpg" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "New", image: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg" },
    { title: "Wuthering Heights", author: "Emily Brontë", category: "Interesting", image: "https://m.media-amazon.com/images/I/81-8dCuxEsL._AC_UF1000,1000_QL80_.jpg" },
    { title: "1984", author: "George Orwell", category: "Popular", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaC0srUgO79Wu69CLM7jWSqf89f3fsUzGVQw&s" },
    { title: "Jane Eyre", author: "Charlotte Brontë", category: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddvZb7M3Uj_zPu-Ig0DUHZCYr-AT016CTnQ&s" },
    { title: "Moby-Dick", author: "Herman Melville", category: "Interesting", image: "https://m.media-amazon.com/images/M/MV5BZWUyOTgyMzktMjhmNi00NThkLTkxMGEtMGU0ZDEzZWQxNjNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "Little Women", author: "Louisa May Alcott", category: "Popular", image: "https://m.media-amazon.com/images/M/MV5BNTIwMTIwYjAtMjk4YS00OTNhLTk5ZjItMjMwMTNiMWI1MDViXkEyXkFqcGc@._V1_.jpg" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "New", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg" },
    { title: "The Scarlet Letter", author: "Nathaniel Hawthorne", category: "Interesting", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLhQxHmoNxdYTu7qfGUbjbJ0nXOo0DX4dKQ&s" },
    { title: "Brave New World", author: "Aldous Huxley", category: "Popular", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75p4nt7tUMPa5UfBhdyOmp4ZxR9aWlrb2KA&s" },
    { title: "Frankenstein", author: "Mary Shelley", category: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzJZwtrUYtv_GuS0GW88r0vn5F2mSvn94hQ&s" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Interesting", image: "https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png" },
    { title: "The Odyssey", author: "Homer", category: "Popular", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQUxkWyfVt6d6DS6oJxV_2PtuMWBjFfFB2Q&s" },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", category: "New", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjIXSbodkeTezjozNpzkEKRZ8X6lW3FmDwg&s" }
];


let favoriteBooks = [];
let activeCategory = ""; // Faol kategoriya eslab qolish

const searchInput = document.getElementById("searchInput");
const userList = document.getElementById("userList");
const favBtn = document.getElementById("fav-btn");
const favCount = document.getElementById("fav-count");

const interBtn = document.getElementById("inter");
const popularBtn = document.getElementById("popular");
const newBtn = document.getElementById("new");

function displayBooks(filteredBooks) {
    userList.innerHTML = "";
    filteredBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <div class="user-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p class="category">${book.category}</p>
            <span class="star">⭐</span>
            </div>
        `;

        const star = bookCard.querySelector(".star");
        if (favoriteBooks.includes(book.title)) {
            star.classList.add("active");
            star.style.color = "gold";
        }

        star.addEventListener("click", function () {
            if (favoriteBooks.includes(book.title)) {
                favoriteBooks = favoriteBooks.filter(item => item !== book.title);
                star.style.color = "gray";
            } else {
                favoriteBooks.push(book.title);
                star.style.color = "gold";
            }
            updateFavoriteCount();
        });

        userList.appendChild(bookCard);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const translations = {
        en: {
            library: "LIBRARY",
            interesting: "Interesting",
            popular: "Popular",
            new: "New",
            contacts: "Contacts",
            searchPlaceholder: "Enter your task..."
        },
        ru: {
            library: "БИБЛИОТЕКА",
            interesting: "Интересное",
            popular: "Популярное",
            new: "Новое",
            contacts: "Контакты",
            searchPlaceholder: "Введите вашу задачу..."
        },
        uz: {
            library: "KUTUBXONA",
            interesting: "Qiziqarli",
            popular: "Mashhur",
            new: "Yangi",
            contacts: "Kontaktlar",
            searchPlaceholder: "Vazifangizni kiriting..."
        }
    };

    const langSelect = document.querySelector(".til");
    const title = document.querySelector("h1");
    const inter = document.getElementById("inter");
    const popular = document.getElementById("popular");
    const newBooks = document.getElementById("new");
    const contacts = document.getElementById("contacts");
    const searchInput = document.getElementById("searchInput");

    langSelect.addEventListener("change", () => {
        const lang = langSelect.value;

        if (translations[lang]) {
            title.textContent = translations[lang].library;
            inter.textContent = translations[lang].interesting;
            popular.textContent = translations[lang].popular;
            newBooks.textContent = translations[lang].new;
            contacts.textContent = translations[lang].contacts;
            searchInput.placeholder = translations[lang].searchPlaceholder;
        }
    });
});


function updateFavoriteCount() {
    favCount.textContent = favoriteBooks.length;
}

// Faqat tanlangan kitoblarni chiqarish
favBtn.addEventListener("click", function () {
    if (favoriteBooks.length > 0) {
        displayBooks(books.filter(book => favoriteBooks.includes(book.title)));
    }
});

// Qidiruv funksiyasi
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    displayBooks(filteredBooks);
});

// Har bir `a` ni bosganda kitoblarni filter qilish
function toggleCategory(category) {
    if (activeCategory === category) {
        activeCategory = ""; // Agar yana bossak, barcha kitoblar chiqadi
        displayBooks(books);
    } else {
        activeCategory = category;
        displayBooks(books.filter(book => book.category === category));
    }
}

interBtn.addEventListener("click", function () {
    toggleCategory("Interesting");
});

popularBtn.addEventListener("click", function () {
    toggleCategory("Popular");
});

newBtn.addEventListener("click", function () {
    toggleCategory("New");
});

// Boshlang‘ich kitoblarni chiqarish
displayBooks(books);


