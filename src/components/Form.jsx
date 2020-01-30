import React, { Component } from "react";
import { connect } from "react-redux";
import { setYear, setData, fetchData } from "../redux/actions";
import logo from './logo-wb.svg';

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
        <a href="https://www.worldbank.org/">
          <img src={logo} alt=""/>
        </a>
        <label className="form__label">
          Show year:
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
