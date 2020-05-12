import React, { Component } from "react";
import { connect } from "react-redux";

import { sortByGroup } from "../redux/actions";

const groups = {
  p: 'population',
  gdp: 'gdp',
  gdpc: 'gdpCapita'
}

class TableHead extends Component {
  constructor() {
    super();
    this.sortByGroup = this.sortByGroup.bind(this);
  }
  sortByGroup(event) {
    event.preventDefault();
    const { groupName } = event.target.dataset;
    this.props.sortByGroup({ groupName });
  }

  render() {
    const {direction, groupName} = this.props.sorting;
    return (
      <thead className="table-head">
        <tr className="table-row">
          <th></th>
          <th></th>
          <th>
            <button data-group-name={groups.p} onClick={this.sortByGroup}>
              Population
              <i className={
                groupName == groups.p 
                ? direction == 'asc' ? 'icon-circle-up' : 'icon-circle-down' 
                : 'icon-circle-up'}></i>
            </button>
          </th>
          <th>
            <button data-group-name={groups.gdp} onClick={this.sortByGroup}>
              Economy
              <i className={
                groupName == groups.gdp 
                ? direction == 'asc' ? 'icon-circle-up' : 'icon-circle-down' 
                : 'icon-circle-up'}></i>
            </button>
          </th>
          <th>
            <button data-group-name={groups.gdpc} onClick={this.sortByGroup}>
              GDP per capita
              <i className={
                groupName == groups.gdpc 
                ? direction == 'asc' ? 'icon-circle-up' : 'icon-circle-down' 
                : 'icon-circle-up'}></i>
            </button>
          </th>
        </tr>
      </thead>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sorting: state.dataReducer.sorting
  }
}

export default connect(mapStateToProps, { sortByGroup })(TableHead);
