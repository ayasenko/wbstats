import axios from 'axios';

export const wbApi = {
  async fetchPopulation(year, itemsCount) {
    const url = `/getPopulation/${year}/${itemsCount}`;
    const response = await axios.get(url);
    return response;
  },
  async fetchGdp(year, itemsCount) {
    const url = `/getGdp/${year}/${itemsCount}`;
    const response = await axios.get(url);
    return response;
  }
}

export const wikiApi = {
  async getShortWikiInfo(itemName) {
    const url = `/fetchShortWikiInfo/${itemName}`;
    const response = await axios.get(url);
    return response;
  }
}