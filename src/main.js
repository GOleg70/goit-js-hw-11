import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import
{
    createGallery,
    clearGallery,
    showLoader,
    hideLoader
}
    from './js/render-functions.js';

const form = document.querySelector(".form");
form.addEventListener("submit", handleClick);

async function handleClick(event) {
    event.preventDefault();
    const query = event.target.elements['search-text'].value.trim();

    clearGallery();
    if (query === "") {
        iziToast.info({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
        });
        return;
    }

    showLoader();
    try {
        const data = await getImagesByQuery(query);
        const images = data.hits;

        if (images.length === 0) {
            iziToast.info({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight"
            });
            return;
        }

        createGallery(images);

        iziToast.success({
            message: `We found ${data.totalHits} images.`, 
            position: "topRight"
        });

    } catch (error) {
        console.error("Помилка запиту:", error);
        iziToast.error({
            message: "We're sorry, but we couldn't fetch images. Please try again later!",
            position: "topRight"
        });
    } finally {
        hideLoader();
        event.target.reset();
    } 
}
