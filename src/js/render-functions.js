const refs = {
  gallery: document.querySelector('.gallery'),
  modal: document.querySelector('.modal'),
  modalContent: document.querySelector('.modal-content'),
};

export function createGallery(cards) {
  const galleryCardsTemplate = cards
    .map(imgInfo => createGalleryCardTemplate(imgInfo))
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);
}

export function createModalArtistInfo(data) {
  const modalArtistInfo = createArtistCardInfo(data);

  refs.modalContent.insertAdjacentHTML('beforeend', modalArtistInfo);
}

export function clearModalInfo() {
  refs.modalContent.innerHTML = '';
}

function createGalleryCardTemplate(cardInfo) {
  return `<li class="gallery-item">
    <a class="gallery-card">
    <img class="gallery-img" width="360" height="200" src="${cardInfo.strArtistThumb}" alt="${cardInfo.strArtist}"/>
  </a>
    <p class="artist-name">${cardInfo.strArtist}</p>
    <button class="btn" data-artist-id="${cardInfo._id}">Press info</button>
  </li>`;
}

function createArtistCardInfo(artistInfo) {
  return `<div class="modal-artist-full-info">
  <h3 class="modal-artist-name">${artistInfo.strArtist}</h3>
  <img class="modal-artist-info-img" width="272" height="167" src="${artistInfo.strArtistThumb}" alt="${artistInfo.strArtist}"/>
  <ul class="modal-info-list">
    <li class="modal-info-item">
      <h4 class="modal-info-title">Years active</h4>
      <p class ="modal-info-text">${artistInfo.intFormedYear}-${artistInfo.intDiedYear}</p>
    </li>
    <li class="modal-info-item">
      <h4 class="modal-info-title">Sex</h4>
      <p class ="modal-info-text">${artistInfo.strGender}</p>
    </li>
    <li class="modal-info-item">
      <h4 class="modal-info-title">Members</h4>
      <p class ="modal-info-text">${artistInfo.intMembers}</p>
    </li>
    <li class="modal-info-item">
      <h4 class="modal-info-title">Country</h4>
      <p class ="modal-info-text">${artistInfo.strCountry}</p>
    </li>
  </ul>
  <div class="modal-biography">
    <h4 class="modal-info-title">Biography</h4>
    <p class ="modal-info-text">${artistInfo.strBiographyEN}</p>
  </div>
  <ul class="modal-tags-list">
    <li class="modal-tag-item">${artistInfo.genres[0]}</li>
    <li class="modal-tag-item">${artistInfo.genres[1]}</li>
    <li class="modal-tag-item">${artistInfo.genres[2]}</li>
    <li class="modal-tag-item">${artistInfo.genres[3]}</li>
  </ul>
  </div>`;
}
