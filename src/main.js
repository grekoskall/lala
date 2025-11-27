import { getCards } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { getArtistInfo } from './js/pixabay-api';
import { createModalArtistInfo } from './js/render-functions';
import { clearModalInfo } from './js/render-functions';

const refs = {
  gallery: document.querySelector('#gallery'),
  backgroundModal: document.querySelector('.background-modal'),
  closeBtn: document.querySelector('.closeBtn'),
};

const globalVariables = {
  scrollTop: 0,
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
  event.stopImmediatePropagation();

  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  // !TAKE ID
  artistId = event.target.dataset.artistId;

  // !CALL FUNCTION CREATE INFO ABOUT ARTIST IN MODAL
  globalVariables.scrollTop = window.scrollY;
  createModalInfo(artistId);

  // !OPEN
  refs.backgroundModal.classList.add('is-active');

  refs.gallery.classList.add('previous-content');


    // !CLOSE
  window.addEventListener('keydown', event => {
    event.preventDefault();
      event.stopImmediatePropagation();
    if (event.code !== 'Escape') {
      return;
    }
    refs.backgroundModal.classList.remove('is-active');
    refs.gallery.classList.remove('previous-content');
    clearModalInfo();

    window.scrollTo({
      top: globalVariables.scrollTop,
      left: 0,
      behavior: 'auto',
    });
  });

   refs.backgroundModal.addEventListener('click', event => {
    event.preventDefault()
      event.stopImmediatePropagation();
    const targetEl = event.target;
    const button = event.target.closest('.modal-close-btn');
    if (targetEl !== event.currentTarget && !button) {
      return;
    }
    refs.backgroundModal.classList.remove('is-active');
    refs.gallery.classList.remove('previous-content');
    clearModalInfo();
    window.scrollTo({
      top: globalVariables.scrollTop,
      left: 0,
      behavior: 'auto',
    });
  });
});



// !FUNCTION CREATE INFO ABOUT ARTIST IN MODAL
async function createModalInfo() {
  const data = await getArtistInfo();
  console.log(data);
  createModalArtistInfo(data);
}
