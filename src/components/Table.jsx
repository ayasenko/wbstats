import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { setData } from '../redux/actions';
import wbpopulation from '../data/wbpopulation';
import wbgdp from '../data/wbgdp';

class Table extends Component {
  componentDidMount() {
    const obj = this.transformRecordsToObject(
      [...this.transformXmlDataToArray(wbpopulation), ...this.transformXmlDataToArray(wbgdp)]
    );
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
  }

  getGdpPerCapita(item) {
    const gdpCapita = {};
    for(let year in item.population) {
      if (!gdpCapita[year]) {
        const value = parseInt(item.gdp[year] / item.population[year]);
        gdpCapita[year] = value ? value : null; 
      }
    }
    return gdpCapita;
  }

  transformRecordsToObject(records){
    const newRecords = {}
    records.forEach(record => {
      newRecords[record.areaKey] = newRecords[record.areaKey] ? newRecords[record.areaKey]: { name: record.area };
      if (record.itemKey === 'NY.GDP.MKTP.CD') {
        newRecords[record.areaKey].gdp = newRecords[record.areaKey].gdp ? newRecords[record.areaKey].gdp : {};
        newRecords[record.areaKey].gdp[record.year] = record.value;
      }
      if (record.itemKey === 'SP.POP.TOTL') {
        newRecords[record.areaKey].population = newRecords[record.areaKey].population ? newRecords[record.areaKey].population : {};
        newRecords[record.areaKey].population[record.year] = record.value;
      }
    });
    
    return newRecords;
  }

  transformXmlDataToArray(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const xmlData = xmlDoc.getElementsByTagName('data')[0];
    const records = xmlData.getElementsByTagName('record');
    const newRecords = [];
    
    for (let i = 0; i < records.length; i++) {
      let fieldCounter = 0;
      const newItem = {};
      for(let j = 0; j < records[i].childNodes.length; j++) {
        const field = records[i].childNodes[j];
        const nodeType = field.nodeType;
        if (nodeType && nodeType === 1 && field.childNodes.length) {
          fieldCounter++;
          const nodeValue = field.childNodes[0].nodeValue;

          switch(fieldCounter){
            case 1 :
              newItem.area = nodeValue;
              newItem.areaKey = field.attributes['key'].nodeValue;
              break;
            case 2 :
              newItem.item = nodeValue;
              newItem.itemKey = field.attributes['key'].nodeValue;
              break;
            case 3 :
              newItem.year = nodeValue;
              break;
            case 4 :
              newItem.value = nodeValue;
              break;
          } 
        }
      }
      newRecords.push(newItem);
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

export default connect(
  null,
  { setData }
)(Table);
