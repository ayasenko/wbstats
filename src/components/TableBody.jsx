import React, { Component } from "react";
import { connect } from "react-redux";
import { expandRecord } from "../redux/actions";

class TableBody extends Component {
  constructor() {
    super();
    this.numberFormatter = new Intl.NumberFormat("en-US", { style: "decimal" });
    this.currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    this.handleRowFocus = this.handleRowFocus.bind(this);
  }

  handleRowFocus(event, target) {
    if ((event && event.key === "Enter") || !event) {
      this.getShortWikiInfo(target.name).then(response => {
        this.props.expandRecord({ targetKey: target.key, response });
      });
    }
  }

  async getShortWikiInfo(itemName) {
    const formatShortInfoResponse = async p => {
      const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${itemName}`;
      const response = await fetch(url);
      const reslut = await response.json();
      const { pages } = reslut.query;
      for (let key in pages) {
        return pages[key];
      }
    };

    return await formatShortInfoResponse();
  }

  decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  render() {
    const { data, contextYear } = this.props;
    if (!data) {
      return null;
    }

    let rowCounter = 1;
    const tableRows = Object.keys(data).map(itemKey => {
      const item = data[itemKey];
      const population =
        item.population && item.population[contextYear]
          ? item.population[contextYear]
          : null;
      const gdp =
        item.gdp && item.gdp[contextYear] ? item.gdp[contextYear] : null;
      const gdpCapita = item.gdpCapita ? item.gdpCapita[contextYear] : null;
      const { name, extract, expanded } = item;

      return (
        <React.Fragment key={itemKey}>
          <tr
            tabIndex="0"
            className="table-row table-row--record"
            onClick={() => this.handleRowFocus(null, item)}
            onKeyPress={e => this.handleRowFocus(e, item)}
          >
            <td>{rowCounter++}</td>
            <td>
              {this.decodeHtml(name)}
            </td>
            <td>{population ? population : "no data"}</td>
            <td>{gdp ? `$${parseInt(gdp, 10)}` : "no data"}</td>
            <td>{gdpCapita ? `$${parseInt(gdpCapita, 10)}` : "no data"}</td>
          </tr>
          <tr
            tabIndex={expanded ? "0" : "-1"}
            className={`table-row ${
              expanded ? "table-row--expanded" : "table-row--collapsed"
            }`}
          >
            <td colSpan="5">
              <div className="more-info-block">
                <p>{extract}</p>
                <p>
                  <strong>
                    Read more about &nbsp;
                    <a
                      href={`https://en.wikipedia.org/wiki/${name}`}
                      tabIndex={expanded ? "0" : "-1"}
                      target="_blank"
                    >
                      {name}
                    </a>
                  </strong>
                </p>
              </div>
            </td>
          </tr>
        </React.Fragment>
      );
    });

    return <tbody className="table-body">{tableRows}</tbody>;
  }
}

const mapStateToProps = state => {
  const { data, contextYear, sorting } = state.dataReducer;
  return { data, contextYear, sorting };
};

export default connect(mapStateToProps, { expandRecord })(TableBody);
