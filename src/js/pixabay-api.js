import axios from 'axios';

import { artistId } from '../main';

const url = 'https://sound-wave.b.goit.study/api/artists?limit=10&page=1';

export async function getCards() {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getArtistInfo() {
  try {
    let urlArtist = 'https://sound-wave.b.goit.study/api/artists/';

    urlArtist += artistId;

    const response = await axios.get(urlArtist);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
