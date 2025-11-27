import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';
import { showLoadMoreButton } from './js/render-functions';
import { hideLoadMoreButton } from './js/render-functions';
import { perPage } from './js/pixabay-api';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  btnLoadMore: document.querySelector('.js-btn-load-more'),
};

let currentQuery = '';
let currentPage = 1;
let dataHits = 0;

// Function when press button
refs.form.addEventListener('submit', async event => {
  try {
    event.preventDefault();

    const input = refs.form.querySelector('input[name="search-text"]');
    const query = input.value.trim();

    currentQuery = query;
    currentPage = 1;
    dataHits = 0;
    // Check if input empty
    if (query === '') {
      input.value = '';
      clearGallery();
      hideLoadMoreButton();

      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#b51b1b',
      });

      return;
    }

    hideLoadMoreButton();
    clearGallery();
    showLoader();

    // Taking and rendering data from site
    let data = await getImagesByQuery(query, currentPage);

    if (data === undefined) {
      hideLoader();
      return;
    }
    dataHits = data.totalHits;
    if (data.total === 0) {
      input.value = '';
    }

    if (data.hits.length !== 0) {
      checkResults(currentPage, dataHits);
      createGallery(data.hits);
    } else {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#b51b1b',
      });
    }
    hideLoader();
  } catch (err) {
    iziToast.show({
      message: `Error: ${err}`,
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      position: 'topRight',
      progressBarColor: '#b51b1b',
    });
  }
});

// event for button load more
refs.btnLoadMore.addEventListener('click', async event => {
  try {
    hideLoadMoreButton();
    showLoader();
    currentPage++;

    // add img to gallery and page
    let data = await getImagesByQuery(currentQuery, currentPage);
    dataHits = data.totalHits;

    if (data.hits.length !== 0) {
      checkResults(currentPage, dataHits);
      createGallery(data.hits);
      scrollPage();
    } else {
      iziToast.show({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#b51b1b',
      });
    }

    hideLoader();
  } catch (err) {
    iziToast.show({
      message: `Error: ${err}`,
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      position: 'topRight',
      progressBarColor: '#b51b1b',
    });
  }
});

// function for check if data is empty or not and if there are no more results
function checkResults(currentPage, dataHits) {
  if (dataHits !== 0) {
    showLoadMoreButton();
    if (currentPage * perPage >= dataHits) {
      hideLoadMoreButton();
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#b51b1b',
      });
    }
  }
}

// function for scroll when more img
function scrollPage() {
  const galleryCard = document.querySelector('.gallery-item');

  if (!galleryCard) return;

  const height = galleryCard.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
