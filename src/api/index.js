import axios from 'axios';

export const wbApi = {
  async fetchPopulation(date, itemsCount) {
    const url = `https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=${date}&per_page=${itemsCount}`;
    return await axios.get(url);
  },
  async fetchGdp(date, itemsCount) {
    const url = `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=${date}&per_page=${itemsCount}`;
    return await axios.get(url);
  }
}

export const wikiApi = {
  async fetchPopulation(itemName) {
    const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${itemName}`;
    return await axios.get(url);
  }
}
