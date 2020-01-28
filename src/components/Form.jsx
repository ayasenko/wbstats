import React, { Component } from "react";
import { connect } from "react-redux";

import { setYear } from "../redux/actions";

class Form extends Component {
  constructor() {
    super();
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange(event) {
    this.props.setYear({ contextYear: event.target.value });
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

export default connect(mapStateToProps, { setYear })(Form);
