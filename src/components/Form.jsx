import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchData } from "../helpers";
import { setYear, setData } from "../redux/actions";

class Form extends Component {
  constructor() {
    super();
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  async handleYearChange(event) {
    await this.props.setYear({ contextYear: event.target.value });
    const data = await fetchData(this.props.contextYear, 300);
    this.props.setData({ data });
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

export default connect(mapStateToProps, { setYear, setData })(Form);
