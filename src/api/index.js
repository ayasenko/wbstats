import axios from 'axios';

export const api = {
  async fetchPopulation = (date, itemsCount) => {
    const url = `https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=${date}&per_page=${itemsCount}`;
    return await axios.get(url);
  },
  async fetchGdp = (date, itemsCount) => {
    const url = `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=${date}&per_page=${itemsCount}`;
    return await axios.get(url);
  }
}
