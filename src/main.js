import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

// 1. Отримуємо посилання на DOM-елементи
const itemUl = document.querySelector(".gallery");
const form = document.querySelector(".form");

// 2. Ваша API-ключ та інші константи
const myApiKey = "50762825-7fe49127b3d94f6c93c99dfe1";
const imageType = "photo";

// 3. Додаємо слухача подій до форми
form.addEventListener("submit", handleClick);

// --- Функція обробки відправки форми ---
function handleClick(event) {
    event.preventDefault(); // Завжди зупиняємо перезавантаження сторінки при сабміті

    // 4. Отримуємо значення з поля вводу
    const qwerry = event.target.elements['search-text'].value.trim(); // .trim() видаляє пробіли на початку/кінці

    // 5. Очищаємо галерею перед новим пошуком (це важливо!)
    itemUl.innerHTML = "";

    // 6. Перевіряємо, чи є запит (не шукаємо порожні рядки)
    if (qwerry === "") {
        iziToast.info({
            message: "Будь ласка, введіть щось для пошуку.",
            position: "topRight"
        });
        return; // Зупиняємо виконання функції, якщо запит порожній
    }

    // 7. --- ТУТ ВІДПРАВЛЯЄМО ЗАПИТ AXIOS ---
    // Це забезпечує, що запит відправляється ТІЛЬКИ коли користувач натискає "Search"
    // і змінна `qwerry` вже має актуальне значення.
    axios.get('https://pixabay.com/api/', {
        params: {
            key: myApiKey,
            q: qwerry, // Використовуємо актуальне значення з поля вводу
            image_type: imageType,
            orientation: "horizontal", // Додаємо орієнтацію для кращих результатів
            safesearch: true,          // Додаємо безпечний пошук
        }
    })
    .then(response => {
        const arr = response.data.hits;

        if (arr.length === 0) {
            iziToast.info({
                message: "На жаль, за вашим запитом не знайдено зображень. Спробуйте ще раз!",
                position: "topRight"
            });
            return; // Виходимо, якщо немає результатів
        }

        const galleryMarkup = arr
            .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
                <li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                    </a>
                    <div class="info">
                        <p class="info-item"> <b>Likes:</b> ${likes} <b>Views:</b> ${views} <b>Comments:</b> ${comments} <b>Downloads:</b> ${downloads}</p>
                    </div>
                </li>
            `)
            .join("");

        itemUl.innerHTML = galleryMarkup;

        // 8. Ініціалізуємо SimpleLightbox ТІЛЬКИ після додавання зображень
        const lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
        lightbox.refresh(); // Оновити lightbox, щоб він побачив нові елементи

        iziToast.success({
            message: `Знайдено ${response.data.totalHits} зображень за вашим запитом.`,
            position: "topRight"
        });
    })
    .catch(error => {
        console.error("Помилка запиту до Pixabay API:", error);
        iziToast.error({
            message: "Не вдалося отримати зображення. Будь ласка, спробуйте пізніше.",
            position: "topRight"
        });
    })
    .finally(() => {
        // 9. Очищаємо поле вводу після пошуку (для зручності користувача)
        event.target.reset();
    });
}