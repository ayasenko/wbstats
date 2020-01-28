import React, { Component } from "react";
import { connect } from "react-redux";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { setData } from "../redux/actions";
import { fetchData } from "../helpers";

class Table extends Component {
  async componentDidMount() {
    const data = await fetchData(this.props.contextYear, 300);
    this.props.setData({ data });
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

const mapStateToProps = state => {
  return {
    contextYear: state.dataReducer.contextYear
  };
};

export default connect(mapStateToProps, { setData })(Table);
