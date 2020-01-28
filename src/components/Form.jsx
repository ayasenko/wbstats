import React, { Component } from "react";
import { connect } from "react-redux";

import { getData } from "../helpers";
import { setYear, setData, fetchData } from "../redux/actions";

class Form extends Component {
  constructor() {
    super();
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  async handleYearChange(event) {
    const contextYear = event.target.value;
    this.props.fetchData({
      year: contextYear,
      itemsCount: 300
    });
    this.props.setYear({ contextYear });
  }

  render() {
    return (
      <form className="form">
        <label className="form__label">
          World Bank Data, year:
          <input
            className="form__input"
            onChange={this.handleYearChange}
            value={this.props.contextYear}
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    contextYear: state.dataReducer.contextYear
  };
};

export default connect(mapStateToProps, { setYear, setData, fetchData })(Form);
