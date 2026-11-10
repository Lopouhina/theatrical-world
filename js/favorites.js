
const FAVORITES_KEY = "theatrical-world-favorites";

const performancesData = {
    "swan-lake": {
        title: "Лебединое озеро",
        genre: "Балет",
        image: "images/swan-lake.jpg"
    },
    "cherry-orchard": {
        title: "Вишнёвый сад",
        genre: "Драма",
        image: "images/cherry-orchard.jpg"
    },
    "inspector": {
        title: "Ревизор",
        genre: "Комедия",
        image: "images/inspector.jpg"
    },
    "hamlet": {
        title: "Гамлет",
        genre: "Драма",
        image: "images/hamlet.jpg"
    },
    "nutcracker": {
        title: "Щелкунчик",
        genre: "Балет",
        image: "images/nutcracker.jpg"
    },
    "phantom": {
        title: "Призрак оперы",
        genre: "Мюзикл",
        image: "images/phantom.jpg"
    }
};

function getFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(id => performancesData[id])
            : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

function toggleFavorite(id) {
    const favorites = getFavorites();

    const updated = favorites.includes(id)
        ? favorites.filter(item => item !== id)
        : [...favorites, id];

    saveFavorites(updated);
    updateFavoriteButtons();
    renderFavorites();
}

function updateFavoriteButtons() {
    document.querySelectorAll("[data-favorite-id]").forEach(button => {
        const id = button.dataset.favoriteId;
        const isFavorite = getFavorites().includes(id);

        button.textContent = isFavorite
            ? "♥ В избранном"
            : "♡ В избранное";

        button.classList.toggle(
            "favorite-button--active",
            isFavorite
        );

        button.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );
    });
}

function renderFavorites() {
    const grid = document.getElementById("favorites-grid");

    if (!grid) return;

    const favorites = getFavorites();

    document.getElementById("favorites-count").textContent =
        favorites.length;

    document.getElementById("favorites-empty").hidden =
        favorites.length > 0;

    document.getElementById("clear-favorites").disabled =
        favorites.length === 0;

    grid.replaceChildren();

    favorites.forEach(id => {
        const performance = performancesData[id];

        const card = document.createElement("article");
        card.className = "performance-card";

        const image = document.createElement("img");
        image.src = performance.image;
        image.alt = `Афиша спектакля ${performance.title}`;
        image.className = "performance-card__image";

        const content = document.createElement("div");
        content.className = "performance-card__content";

        const title = document.createElement("h2");
        title.className = "performance-card__title";
        title.textContent = performance.title;

        const genre = document.createElement("p");
        genre.className = "performance-card__genre";
        genre.textContent = performance.genre;

        const actions = document.createElement("div");
        actions.className = "favorites-page__actions";

        const link = document.createElement("a");
        link.href = `performance.html?id=${id}`;
        link.className = "button button--primary";
        link.textContent = "Подробнее";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "favorite-button";
        removeButton.textContent = "Удалить";
        removeButton.addEventListener("click", () => {
            toggleFavorite(id);
        });

        actions.append(link, removeButton);
        content.append(title, genre, actions);
        card.append(image, content);
        grid.append(card);
    });
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-favorite-id]");

    if (button) {
        toggleFavorite(button.dataset.favoriteId);
    }
});

document.getElementById("clear-favorites")?.addEventListener(
    "click",
    () => {
        if (confirm("Очистить всё избранное?")) {
            saveFavorites([]);
            renderFavorites();
        }
    }
);

updateFavoriteButtons();
renderFavorites();
