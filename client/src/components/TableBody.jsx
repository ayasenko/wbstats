import React, { Component } from "react";
import { connect } from "react-redux";
import { expandRecord, fetchWikiData } from "../redux/actions";
import { Link } from "react-router-dom";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.numberFormatter = new Intl.NumberFormat("en-US", { style: "decimal" });
    this.currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    this.handleRowFocus = this.handleRowFocus.bind(this);
  }

  componentDidMount() {
    const {history, data} = this.props;
    let itemKey = history.location.pathname.slice(3);

    if (itemKey && data[itemKey]) {
      this.handleRowFocus(null, data[itemKey]);
    }

    history.listen((location, action) => {
      itemKey = location.pathname.slice(3);
      if (itemKey && data[itemKey] && action === 'POP') {
        this.handleRowFocus(null, data[itemKey]);
      }
    })
  }

  handleRowFocus(event, target) {
    if ((event && event.key === "Enter") || !event) {
      const { name, key } = target;
      this.props.fetchWikiData({ name, key });
    }
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
            <tr className="table-row table-row--record">
              <td>{rowCounter++}</td>
              <td>
                <Link 
                  to={ {pathname: `/E/${itemKey}`, name} } 
                  onClick={() => this.handleRowFocus(null, item)}
                  onKeyPress={e => this.handleRowFocus(e, item)}>
                  {this.decodeHtml(name)}
                </Link>
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

export default connect(mapStateToProps, { expandRecord, fetchWikiData })(
  TableBody
);
