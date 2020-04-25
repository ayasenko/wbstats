import React, { Component } from "react";
import { connect } from "react-redux";

import { sortByGroup } from "../redux/actions";

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
    return (
      <thead className="table-head">
        <tr className="table-row">
          <th></th>
          <th></th>
          <th>
            <button data-group-name="population" onClick={this.sortByGroup}>
              Population
            </button>
          </th>
          <th>
            <button data-group-name="gdp" onClick={this.sortByGroup}>
              Economy
            </button>
          </th>
          <th>
            <button data-group-name="gdpCapita" onClick={this.sortByGroup}>
              GDP per capita
            </button>
          </th>
        </tr>
      </thead>
    );
  }
}

export default connect(null, { sortByGroup })(TableHead);
