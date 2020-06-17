import React, { Component } from "react";
import { connect } from "react-redux";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Preloader from './Preloader';
import { setData, fetchData } from "../redux/actions";

class Table extends Component {
  componentDidMount() {
    this.props.fetchData({
      year: 2018,
      itemsCount: 300
    });
  }

  render() {
    const { isFetching, isFailed } = this.props;
    
    if(isFetching) {
      return <Preloader />;
    }

    if(isFailed) {
      return (
        <div className="error-message">
          <p>The request has failed...</p>
        </div>
      );
    }
    
    return (
      <table className="table">
        <TableHead />
        <TableBody/>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    contextYear: state.dataReducer.contextYear,
    isFetching: state.dataReducer.isFetching,
    isFailed: state.dataReducer.isFailed
  };
};

export default connect(mapStateToProps, { setData, fetchData })(Table);
