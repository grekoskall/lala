import { getCards } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { getArtistInfo } from './js/pixabay-api';
import { createModalArtistInfo } from './js/render-functions';
import { clearModalInfo } from './js/render-functions';

const refs = {
  gallery: document.querySelector('.gallery'),
  backgroundModal: document.querySelector('.background-modal'),
  closeBtn: document.querySelector('.closeBtn'),
};

// Function when press button
async function lala() {
  try {
    // Taking and rendering data from site
    let data = await getCards();

    // console.log(data.artists);
    createGallery(data.artists);
  } catch (err) {
    console.log(err);
  }
}

lala();

export let artistId = '';

// !FUCTION OPEN/CLOSE MODAL
refs.gallery.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  // !TAKE ID
  artistId = event.target.dataset.artistId;

  // !CALL FUNCTION CREATE INFO ABOUT ARTIST IN MODAL
  createModalInfo(artistId);

  // !OPEN
  refs.backgroundModal.classList.add('is-active');
  refs.backgroundModal.scrollTop = 0;
  refs.gallery.classList.add('previous-content');

  // !CLOSE
  window.addEventListener('keydown', event => {
    if (event.code !== 'Escape') {
      return;
    }
    refs.backgroundModal.classList.remove('is-active');
    refs.gallery.classList.remove('previous-content');
    clearModalInfo();
  });

  refs.backgroundModal.addEventListener('click', event => {
    const targetEl = event.target;
    const button = event.target.closest('.modal-close-btn');
    if (targetEl !== event.currentTarget && !button) {
      return;
    }
    refs.backgroundModal.classList.remove('is-active');
    refs.gallery.classList.remove('previous-content');
    clearModalInfo();
  });
});

// !FUNCTION CREATE INFO ABOUT ARTIST IN MODAL
async function createModalInfo() {
  const data = await getArtistInfo();
  console.log(data);
  createModalArtistInfo(data);
}
