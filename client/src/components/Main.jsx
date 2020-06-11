import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

const Main = (props) => (
  <React.Fragment>
    <Form />
    <Table {...props} />
  </React.Fragment>
);

export default Main;
