import React from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

import { Container, Row, Col } from "reactstrap";
import SingleCard from "./Card";
import Pagination from "./Pagination";
import InvalidSearch from "./InvalidSearch";

class Results extends React.Component {
  state = {
    data: [],
    totalResults: 0,
    totalPages: 0,
    apiStatus: "request"
  };
  componentDidMount() {
    this.fetchResponse();
  }

  componentDidUpdate(prevProps) {
    const { state: prevState } = prevProps.location || {};
    const { query: prevQuery } = prevState || {};
    const { state } = this.props.location || {};
    const { query } = state || {};
    if (
      query !== prevQuery ||
      this.props.location.search !== prevProps.location.search
    ) {
      this.fetchResponse();
    }
  }
  fetchResponse = () => {
    this.setState({ apiStatus: "request" });
    const { state } = this.props.location || {};
    const page = getQueryStringParams(this.props.location.search).page || 1;
    const { query } = state || { query: "avatar" };
    axios
      .get(`http://www.omdbapi.com/?s=${query}&apikey=e5c9106c&page=${page}`)
      .then(response => {
        const { totalResults, Response } = response.data;
        const totalPages = Math.ceil(totalResults / 10);
        this.setState({
          data: response.data.Search,
          totalResults: Response === "False" ? 0 : totalResults,
          totalPages,
          apiStatus: "success"
        });
      })
      .catch(err => console.log("Error", err));
  };

  renderCards = () => {
    return this.state.data.map(card => {
      return (
        <Col
          key={card.imdbID + Math.random()}
          xs="12"
          sm="6"
          lg="4"
          className="mb-2"
          style={{ height: "auto" }}
        >
          <SingleCard card={card} />
        </Col>
      );
    });
  };

  render() {
    if (this.state.apiStatus === "request") {
      return (
        <div className="mt-3 d-flex justify-content-center">
          <Spinner color="success" style={{ width: "3rem", height: "3rem" }} />{" "}
        </div>
      );
    }
    if (this.state.totalResults === 0) {
      return <InvalidSearch />;
    }
    const { state } = this.props.location || {};
    const { query } = state || { query: "avatar" };
    const page = getQueryStringParams(this.props.location.search).page || 1;
    return (
      <div className="mt-3">
        <Container>
          <Row>{this.renderCards()}</Row>
        </Container>
        <Pagination
          totalPages={this.state.totalPages}
          searchItem={query}
          activePage={page}
        />
      </div>
    );
  }
}

export default Results;

const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};
};
