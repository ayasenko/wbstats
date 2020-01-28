import React, { Component } from "react";
import { connect } from "react-redux";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { setData } from "../redux/actions";
import { transformRecordsToObject, transformXmlDataToArray } from "../helpers";
import { wbApi } from "../api";

class Table extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const getGdpPerCapita = item => {
      const gdpCapita = {};
      for (let year in item.population) {
        if (!gdpCapita[year]) {
          const value = parseInt(item.gdp[year] / item.population[year]);
          gdpCapita[year] = value ? value : null;
        }
      }
      return gdpCapita;
    }

    Promise.all([wbApi.fetchGdp(2018, 300), wbApi.fetchPopulation(2018, 300)])
      .then(response => {
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

        this.props.setData({ data });
      });
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
