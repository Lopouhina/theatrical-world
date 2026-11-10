
const REVIEWS_KEY = "theatrical-world-reviews";

const performanceNames = {
    "swan-lake": "Лебединое озеро",
    "cherry-orchard": "Вишнёвый сад",
    "inspector": "Ревизор",
    "hamlet": "Гамлет",
    "nutcracker": "Щелкунчик",
    "phantom": "Призрак оперы"
};

const reviewForm = document.getElementById("review-form");
const reviewsContainer = document.getElementById("reviews-container");
const reviewsFilter = document.getElementById("reviews-filter");
const reviewsCount = document.getElementById("reviews-count");
const reviewsEmpty = document.getElementById("reviews-empty");
const reviewMessage = document.getElementById("review-message");

function getReviews() {
    try {
        const saved = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveReviews(reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function getReviewWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return "отзыв";
    }

    if (
        count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 12 || count % 100 > 14)
    ) {
        return "отзыва";
    }

    return "отзывов";
}

function createReviewCard(review) {
    const card = document.createElement("article");
    card.className = "review-card";

    const header = document.createElement("div");
    header.className = "review-card__header";

    const name = document.createElement("h3");
    name.className = "review-card__name";
    name.textContent = review.name;

    const date = document.createElement("span");
    date.className = "review-card__date";
    date.textContent = new Date(review.date).toLocaleDateString("ru-RU");

    header.append(name, date);

    const performance = document.createElement("p");
    performance.className = "review-card__performance";
    performance.textContent = performanceNames[review.performance] || "Спектакль";

    const rating = document.createElement("p");
    rating.className = "review-card__rating";
    rating.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    const text = document.createElement("p");
    text.className = "review-card__text";
    text.textContent = review.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "review-card__delete";
    deleteButton.textContent = "Удалить отзыв";

    deleteButton.addEventListener("click", () => {
        if (!confirm("Удалить этот отзыв?")) return;

        const reviews = getReviews().filter(item => item.id !== review.id);
        saveReviews(reviews);
        renderReviews();
    });

    card.append(header, performance, rating, text, deleteButton);

    return card;
}

function renderReviews() {
    const reviews = getReviews();
    const selectedPerformance = reviewsFilter.value;

    const filtered = selectedPerformance
        ? reviews.filter(review => review.performance === selectedPerformance)
        : reviews;

    reviewsContainer.replaceChildren();

    filtered
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(review => {
            reviewsContainer.append(createReviewCard(review));
        });

    reviewsCount.textContent =
        `${filtered.length} ${getReviewWord(filtered.length)}`;

    reviewsEmpty.hidden = filtered.length > 0;
}

reviewForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!reviewForm.reportValidity()) return;

    const name = document.getElementById("review-name").value.trim();
    const performance = document.getElementById("review-performance").value;
    const text = document.getElementById("review-text").value.trim();
    const ratingInput = document.querySelector(
        'input[name="rating"]:checked'
    );

    if (!name || !performance || !ratingInput || text.length < 10) {
        reviewMessage.textContent = "Пожалуйста, заполните все поля.";
        return;
    }

    const review = {
        id: crypto.randomUUID(),
        name,
        performance,
        rating: Number(ratingInput.value),
        text,
        date: new Date().toISOString()
    };

    const reviews = getReviews();
    reviews.push(review);
    saveReviews(reviews);

    reviewForm.reset();
    reviewsFilter.value = "";
    reviewMessage.textContent = "Ваш отзыв успешно опубликован!";

    renderReviews();
});

reviewsFilter.addEventListener("change", renderReviews);

const params = new URLSearchParams(window.location.search);
const performanceId = params.get("performance");

if (performanceNames[performanceId]) {
    document.getElementById("review-performance").value = performanceId;
    reviewsFilter.value = performanceId;
}

renderReviews();
