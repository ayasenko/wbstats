export const transformRecordsToObject = records => {
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
}

export const transformXmlDataToArray = str => {
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
      const iso3code = records[i].getElementsByTagName(
        "wb:countryiso3code"
      )[0].innerHTML;
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
    }
  }
  return newRecords;
}