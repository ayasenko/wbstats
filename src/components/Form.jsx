import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setYear } from '../redux/actions';

class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.setYear({contextYear: event.target.value});
  }

  render() {
    return (      
      <form className="form">
        <label className="form__label">
          World Bank Data, year:
          <input className="form__input" onChange={this.handleChange} value={this.props.contextYear} readOnly />
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

export default connect(
  mapStateToProps,
  { setYear }
)(Form);