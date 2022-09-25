import axios from 'axios';
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '29337805-816b92dff7e2f80794b6913e3';
const PARAM = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async (searchQuery, page) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}${PARAM}`;

    const data = await axios.get(URL);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const api = {
  fetchImages,
};
