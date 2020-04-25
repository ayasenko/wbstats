import { wbApi } from "../api";

const transformRecordsToObject = records => {
  const newRecords = {};
  records.forEach(record => {
    newRecords[record.areaKey] = newRecords[record.areaKey]
      ? newRecords[record.areaKey]
      : { name: record.area };
    if (record.itemKey === "NY.GDP.MKTP.CD") {
      newRecords[record.areaKey].gdp = newRecords[record.areaKey].gdp
        ? newRecords[record.areaKey].gdp
        : {};
      newRecords[record.areaKey].gdp[record.year] = record.value;
    }
    if (record.itemKey === "SP.POP.TOTL") {
      newRecords[record.areaKey].population = newRecords[record.areaKey]
        .population
        ? newRecords[record.areaKey].population
        : {};
      newRecords[record.areaKey].population[record.year] = record.value;
    }
  });

  return newRecords;
};

const transformXmlDataToArray = str => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(str, "text/xml");
  const xmlData = xmlDoc.children[0];
  const records = xmlData.children;

  const newRecords = [];

  for (let i = 0; i < records.length; i++) {
    try {
      const newItem = {};
      const indicator = records[i].getElementsByTagName("wb:indicator")[0].id;
      const country = records[i].getElementsByTagName("wb:country")[0]
        .innerHTML;
      const iso3code = records[i].getElementsByTagName("wb:countryiso3code")[0]
        .innerHTML;
      const value = records[i].getElementsByTagName("wb:value")[0].innerHTML;
      const year = records[i].getElementsByTagName("wb:date")[0].innerHTML;
      newItem.year = year;
      newItem.area = country;
      newItem.areaKey = iso3code;
      newItem.itemKey = indicator;
      newItem.value = value;
      newRecords.push(newItem);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  return newRecords;
};

export const getData = async (year, itemsCount) => {
  const getGdpPerCapita = item => {
    const gdpCapita = {};
    for (let year in item.population) {
      if (!gdpCapita[year]) {
        const value = parseInt(item.gdp[year] / item.population[year]);
        gdpCapita[year] = value ? value : null;
      }
    }
    return gdpCapita;
  };

  const response = await Promise.all([
    wbApi.fetchGdp(year, itemsCount),
    wbApi.fetchPopulation(year, itemsCount)
  ]);

  const obj = transformRecordsToObject([
    ...transformXmlDataToArray(response[0].data),
    ...transformXmlDataToArray(response[1].data)
  ]);

  const data = {};
  for (let itemKey in obj) {
    const item = obj[itemKey];
    item.gdpCapita = getGdpPerCapita(item);
    item.expanded = false;
    item.extract = null;
    item.key = itemKey;
    data[itemKey] = item;
  }

  return data;
};

export const getWikiExtract = response => {
  const { pages } = response.data.query;
  for (let key in pages) {
    return pages[key];
  }
};
