
const catalogData = [
    {
        id: "swan-lake",
        title: "Лебединое озеро",
        genre: "ballet",
        duration: 150,
        age: 6,
        country: "russia",
        rating: 4.9,
        popularity: 98,
        year: 1877
    },
    {
        id: "cherry-orchard",
        title: "Вишнёвый сад",
        genre: "drama",
        duration: 160,
        age: 12,
        country: "russia",
        rating: 4.7,
        popularity: 88,
        year: 1904
    },
    {
        id: "inspector",
        title: "Ревизор",
        genre: "comedy",
        duration: 140,
        age: 12,
        country: "russia",
        rating: 4.6,
        popularity: 91,
        year: 1836
    },
    {
        id: "hamlet",
        title: "Гамлет",
        genre: "drama",
        duration: 180,
        age: 16,
        country: "uk",
        rating: 4.8,
        popularity: 95,
        year: 1601
    },
    {
        id: "nutcracker",
        title: "Щелкунчик",
        genre: "ballet",
        duration: 120,
        age: 6,
        country: "russia",
        rating: 4.9,
        popularity: 97,
        year: 1892
    },
    {
        id: "phantom",
        title: "Призрак оперы",
        genre: "musical",
        duration: 150,
        age: 12,
        country: "uk",
        rating: 4.8,
        popularity: 96,
        year: 1986
    }
];

const filtersForm = document.getElementById("filters-form");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre");
const durationSelect = document.getElementById("duration");
const ageSelect = document.getElementById("age");
const countrySelect = document.getElementById("country");
const ratingSelect = document.getElementById("rating");
const sortSelect = document.getElementById("sort");

const catalogGrid = document.getElementById("catalog-grid");
const resultsCount = document.getElementById("results-count");
const catalogEmpty = document.getElementById("catalog-empty");

const cards = new Map();

catalogGrid.querySelectorAll(".performance-card").forEach(card => {
    const link = card.querySelector('a[href*="performance.html?id="]');

    if (!link) return;

    const url = new URL(link.href);
    const id = url.searchParams.get("id");

    cards.set(id, card);
});

function matchesDuration(minutes, selected) {
    if (!selected) return true;

    if (selected === "short") {
        return minutes <= 120;
    }

    if (selected === "medium") {
        return minutes > 120 && minutes <= 180;
    }

    if (selected === "long") {
        return minutes > 180;
    }

    return true;
}

function matchesFilters(performance) {
    const search = searchInput.value.trim().toLocaleLowerCase("ru-RU");
    const genre = genreSelect.value;
    const duration = durationSelect.value;
    const age = ageSelect.value;
    const country = countrySelect.value;
    const rating = ratingSelect.value;

    const matchesSearch = performance.title
        .toLocaleLowerCase("ru-RU")
        .includes(search);

    const matchesGenre = !genre || performance.genre === genre;

    const matchesAge = !age || performance.age === Number(age);

    const matchesCountry = !country || performance.country === country;

    const matchesRating = !rating || performance.rating >= Number(rating);

    return (
        matchesSearch &&
        matchesGenre &&
        matchesDuration(performance.duration, duration) &&
        matchesAge &&
        matchesCountry &&
        matchesRating
    );
}

function sortPerformances(performances) {
    const selectedSort = sortSelect.value;

    return performances.sort((a, b) => {
        if (selectedSort === "rating") {
            return b.rating - a.rating || b.popularity - a.popularity;
        }

        if (selectedSort === "newest") {
            return b.year - a.year;
        }

        return b.popularity - a.popularity;
    });
}

function renderCatalog() {
    const filtered = catalogData.filter(matchesFilters);
    const sorted = sortPerformances(filtered);

    const fragment = document.createDocumentFragment();

    sorted.forEach(performance => {
        const card = cards.get(performance.id);

        if (card) {
            fragment.append(card);
        }
    });

    catalogGrid.replaceChildren(fragment);

    resultsCount.textContent = sorted.length;
    catalogEmpty.hidden = sorted.length > 0;
}

function applyGenreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const genreFromQuery = params.get("genre");
    const genreFromHash = window.location.hash.slice(1);

    const genre = genreFromQuery || genreFromHash;

    const validGenres = [
        "drama",
        "comedy",
        "ballet",
        "opera",
        "musical"
    ];

    if (validGenres.includes(genre)) {
        genreSelect.value = genre;
    }
}

filtersForm.addEventListener("input", renderCatalog);
filtersForm.addEventListener("change", renderCatalog);

filtersForm.addEventListener("reset", () => {
    window.history.replaceState(
        null,
        "",
        window.location.pathname
    );

    requestAnimationFrame(renderCatalog);
});

sortSelect.addEventListener("change", renderCatalog);

window.addEventListener("hashchange", () => {
    genreSelect.value = "";
    applyGenreFromUrl();
    renderCatalog();
});

applyGenreFromUrl();
renderCatalog();
