
const performances = {
    "swan-lake": {
        title: "Лебединое озеро",
        genre: "Балет",
        image: "images/swan-lake.jpg",
        duration: "2 часа 30 минут",
        age: "6+",
        author: "Пётр Ильич Чайковский",
        country: "Россия",
        description: "Знаменитый балет о любви, верности и борьбе добра со злом.",
        about: "«Лебединое озеро» — один из самых известных балетов в мире. История рассказывает о принце Зигфриде и прекрасной Одетте, превращённой злым волшебником в лебедя. Музыка Петра Ильича Чайковского и выразительная хореография сделали это произведение классикой балетного искусства."
    },

    "cherry-orchard": {
        title: "Вишнёвый сад",
        genre: "Драма",
        image: "images/cherry-orchard.jpg",
        duration: "2 часа 40 минут",
        age: "12+",
        author: "Антон Павлович Чехов",
        country: "Россия",
        description: "История семьи, которая сталкивается с переменами и потерей родового имения.",
        about: "«Вишнёвый сад» — пьеса Антона Павловича Чехова о смене эпох, человеческих отношениях и невозможности остановить время. Герои пытаются сохранить привычный мир, но оказываются перед необходимостью принять перемены."
    },

    "inspector": {
        title: "Ревизор",
        genre: "Комедия",
        image: "images/inspector.jpg",
        duration: "2 часа 20 минут",
        age: "12+",
        author: "Николай Васильевич Гоголь",
        country: "Россия",
        description: "Сатирическая комедия о чиновниках, которые принимают случайного гостя за важного проверяющего.",
        about: "«Ревизор» — знаменитая комедия Николая Васильевича Гоголя. Произведение высмеивает взяточничество, лицемерие и страх перед начальством. Ошибка городских чиновников приводит к череде комичных событий."
    },

    "hamlet": {
        title: "Гамлет",
        genre: "Драма",
        image: "images/hamlet.jpg",
        duration: "3 часа",
        age: "16+",
        author: "Уильям Шекспир",
        country: "Великобритания",
        description: "Трагедия датского принца, который пытается узнать правду о смерти своего отца.",
        about: "«Гамлет» — одна из наиболее известных трагедий Уильяма Шекспира. В центре сюжета находятся вопросы долга, справедливости, мести и нравственного выбора. Герой сталкивается с предательством и пытается найти своё место в мире."
    },

    "nutcracker": {
        title: "Щелкунчик",
        genre: "Балет",
        image: "images/nutcracker.jpg",
        duration: "2 часа",
        age: "6+",
        author: "Пётр Ильич Чайковский",
        country: "Россия",
        description: "Волшебная рождественская история о девочке Мари и заколдованном принце.",
        about: "«Щелкунчик» — сказочный балет на музыку Петра Ильича Чайковского. История переносит зрителей в мир чудес, где оживают игрушки, происходят невероятные приключения и добро побеждает зло."
    },

    "phantom": {
        title: "Призрак оперы",
        genre: "Мюзикл",
        image: "images/phantom.jpg",
        duration: "2 часа 30 минут",
        age: "12+",
        author: "Эндрю Ллойд Уэббер",
        country: "Великобритания",
        description: "Романтическая история о таинственном обитателе Парижской оперы и молодой певице.",
        about: "«Призрак оперы» — известный мюзикл Эндрю Ллойда Уэббера по мотивам романа Гастона Леру. В центре сюжета — талантливая певица Кристина и загадочный музыкальный гений, скрывающийся под зданием оперного театра."
    }
};

const params = new URLSearchParams(window.location.search);
const performanceId = params.get("id");
const performance = performances[performanceId];

if (performance) {
    document.title = `${performance.title} — Театральный мир`;

    document.getElementById("breadcrumb-title").textContent =
        performance.title;

    document.getElementById("performance-title").textContent =
        performance.title;

    document.getElementById("performance-genre").textContent =
        performance.genre;

    document.getElementById("performance-description").textContent =
        performance.description;

    document.getElementById("performance-duration").textContent =
        performance.duration;

    document.getElementById("performance-age").textContent =
        performance.age;

    document.getElementById("performance-author").textContent =
        performance.author;

    document.getElementById("performance-country").textContent =
        performance.country;

    document.getElementById("performance-about").textContent =
        performance.about;

    const image = document.getElementById("performance-image");
    image.src = performance.image;
    image.alt = `Афиша спектакля ${performance.title}`;

    const favoriteButton = document.getElementById(
        "performance-favorite"
    );

    favoriteButton.dataset.favoriteId = performanceId;

    updateFavoriteButtons();

} else {
    document.getElementById("performance-details").innerHTML = `
        <div class="performance-page__not-found">
            <h1>Спектакль не найден</h1>
            <p>Проверьте ссылку или вернитесь в каталог.</p>
            <a href="catalog.html" class="button button--primary">
                Перейти в каталог
            </a>
        </div>
    `;

    document.querySelector(".performance-page__about").hidden = true;
    document.querySelector(".performance-page__reviews").hidden = true;
}
