
const generatorPerformances = [
    {
        id: "swan-lake",
        title: "Лебединое озеро",
        genre: "Балет",
        image: "images/swan-lake.jpg",
        description: "История любви, верности и борьбы добра со злом."
    },
    {
        id: "cherry-orchard",
        title: "Вишнёвый сад",
        genre: "Драма",
        image: "images/cherry-orchard.jpg",
        description: "Трогательная история о переменах, прошлом и будущем."
    },
    {
        id: "inspector",
        title: "Ревизор",
        genre: "Комедия",
        image: "images/inspector.jpg",
        description: "Остроумная комедия о человеческих слабостях."
    },
    {
        id: "hamlet",
        title: "Гамлет",
        genre: "Драма",
        image: "images/hamlet.jpg",
        description: "История о справедливости, мести и нравственном выборе."
    },
    {
        id: "nutcracker",
        title: "Щелкунчик",
        genre: "Балет",
        image: "images/nutcracker.jpg",
        description: "Волшебная сказка о приключениях, чудесах и доброте."
    },
    {
        id: "phantom",
        title: "Призрак оперы",
        genre: "Мюзикл",
        image: "images/phantom.jpg",
        description: "Загадочная история любви и музыки."
    }
];

const moodRecommendations = {
    romantic: ["swan-lake", "phantom"],
    funny: ["inspector"],
    thoughtful: ["cherry-orchard", "hamlet"],
    magical: ["nutcracker", "swan-lake"],
    dramatic: ["hamlet", "phantom", "cherry-orchard"]
};

const randomButton = document.getElementById("random-button");
const randomResult = document.getElementById("random-result");

const moodButton = document.getElementById("mood-button");
const moodSelect = document.getElementById("mood-select");
const moodResult = document.getElementById("mood-result");
const moodMessage = document.getElementById("mood-message");

let lastRandomId = null;
let lastMoodId = null;

function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getRandomPerformance(excludedId = null) {
    const available = generatorPerformances.filter(
        performance => performance.id !== excludedId
    );

    return getRandomItem(
        available.length > 0 ? available : generatorPerformances
    );
}

function createPerformanceCard(performance) {
    const card = document.createElement("article");
    card.className = "generator-card";

    const image = document.createElement("img");
    image.className = "generator-card__image";
    image.src = performance.image;
    image.alt = `Афиша спектакля ${performance.title}`;

    const content = document.createElement("div");
    content.className = "generator-card__content";

    const genre = document.createElement("span");
    genre.className = "generator-card__genre";
    genre.textContent = performance.genre;

    const title = document.createElement("h3");
    title.className = "generator-card__title";
    title.textContent = performance.title;

    const description = document.createElement("p");
    description.className = "generator-card__description";
    description.textContent = performance.description;

    const actions = document.createElement("div");
    actions.className = "generator-card__actions";

    const detailsLink = document.createElement("a");
    detailsLink.className = "button button--primary";
    detailsLink.href = `performance.html?id=${performance.id}`;
    detailsLink.textContent = "Подробнее";

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.className = "favorite-button";
    favoriteButton.dataset.favoriteId = performance.id;
    favoriteButton.textContent = "♡ В избранное";

    actions.append(detailsLink, favoriteButton);

    content.append(
        genre,
        title,
        description,
        actions
    );

    card.append(image, content);

    return card;
}

function showPerformance(container, performance) {
    container.replaceChildren(createPerformanceCard(performance));

    if (typeof updateFavoriteButtons === "function") {
        updateFavoriteButtons();
    }
}

randomButton.addEventListener("click", () => {
    const performance = getRandomPerformance(lastRandomId);

    lastRandomId = performance.id;

    showPerformance(randomResult, performance);
});

moodButton.addEventListener("click", () => {
    const selectedMood = moodSelect.value;

    if (!selectedMood || !moodRecommendations[selectedMood]) {
        moodMessage.textContent = "Сначала выберите настроение.";
        moodResult.replaceChildren();
        return;
    }

    moodMessage.textContent = "";

    const recommendedIds = moodRecommendations[selectedMood];

    const availableIds = recommendedIds.filter(
        id => id !== lastMoodId
    );

    const selectedId = getRandomItem(
        availableIds.length > 0 ? availableIds : recommendedIds
    );

    const performance = generatorPerformances.find(
        item => item.id === selectedId
    );

    if (!performance) {
        moodMessage.textContent = "Не удалось подобрать спектакль.";
        return;
    }

    lastMoodId = performance.id;

    showPerformance(moodResult, performance);
});

moodSelect.addEventListener("change", () => {
    moodMessage.textContent = "";
});
