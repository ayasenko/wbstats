import React, { Component } from "react";
import { connect } from "react-redux";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { setData } from "../redux/actions";

class Table extends Component {
  componentDidMount() {
    const fetchPopulation = new Promise(function(resolve, reject) {
      fetch(
        "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=2018&per_page=300"
      )
        .then(data => data.text())
        .then(text => resolve(text));
    });
    const fetchGdp = new Promise(function(resolve, reject) {
      fetch(
        "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=2018&per_page=300"
      )
        .then(data => data.text())
        .then(text => resolve(text));
    });

    Promise.all([fetchGdp, fetchPopulation]).then(d => {
      const obj = this.transformRecordsToObject([
        ...this.transformXmlDataToArray(d[0]),
        ...this.transformXmlDataToArray(d[1])
      ]);
      const data = {};
      for (let itemKey in obj) {
        const item = obj[itemKey];
        item.gdpCapita = this.getGdpPerCapita(item);
        item.expanded = false;
        item.extract = null;
        item.key = itemKey;
        data[itemKey] = item;
      }
      this.props.setData({ data });
    });
  }

  getGdpPerCapita(item) {
    const gdpCapita = {};
    for (let year in item.population) {
      if (!gdpCapita[year]) {
        const value = parseInt(item.gdp[year] / item.population[year]);
        gdpCapita[year] = value ? value : null;
      }
    }
    return gdpCapita;
  }

  transformRecordsToObject(records) {
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

  transformXmlDataToArray(str) {
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

  render() {
    return (
      <table className="table">
        <TableHead />
        <TableBody />
      </table>
    );
  }
}

export default connect(null, { setData })(Table);
