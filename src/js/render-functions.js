// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 0.77,
  heightRatio: 0.92,
});

const refs = {
  gallery: document.querySelector('#gallery'),
};

export function createGallery(images) {
  const galleryCardsTemplate = images
    .map(imgInfo => createGalleryCardTemplate(imgInfo))
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);

  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');

  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  const btn = document.querySelector('.btn-load-more');

  btn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.btn-load-more');

  btn.classList.add('is-hidden');
}

function createGalleryCardTemplate(imgInfo) {
  return `<li class="gallery-item">
    <a class="gallery-card" href="${imgInfo.largeImageURL}">
    <img class="gallery-img" width="360" height="200" src="${
      imgInfo.webformatURL
    }" alt="${imgInfo.tags.split(',')[0]}"/>
  </a>
    <ul class="img-descriptions-list">
      <li class="img-descriptions-item">
        <p class="img-descriptions-text">Likes</p>
        <p class="img-descriptions-data">${imgInfo.likes}</p>
      </li>
      <li class="img-descriptions-item">
        <p class="img-descriptions-text">Views</p>
        <p class="img-descriptions-data">${imgInfo.views}</p>
      </li>
      <li class="img-descriptions-item">
        <p class="img-descriptions-text">Comments</p>
        <p class="img-descriptions-data">${imgInfo.comments}</p>
      </li>
      <li class="img-descriptions-item">
        <p class="img-descriptions-text">Downloads</p>
        <p class="img-descriptions-data">${imgInfo.downloads}</p>
      </li>
    </ul>
  </li>`;
}
