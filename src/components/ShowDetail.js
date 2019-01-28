import React, { Component } from "react";
import axios from "axios";

import { Spinner } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import DetailNavbar from './DetailNavbar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MovieIcon from '@material-ui/icons/Movie';
import LanguageIcon from '@material-ui/icons/Language';
import DescriptionIcon from '@material-ui/icons/Description';
import DateRangedIcon from '@material-ui/icons/DateRange';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';
import PeopleIcon from '@material-ui/icons/People';
import FlagIcon from '@material-ui/icons/Flag';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import StarICon from '@material-ui/icons/Star';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import InfoIcon from '@material-ui/icons/Info';
import InvalidSearch from "./InvalidSearch";







class ShowDetail extends Component {
  state = {
    details: null
  };

  componentDidMount() {
    const query = this.props.match.params.omdbID;
    axios
      .get(`http://www.omdbapi.com/?i=${query}&plot=full&apiKey=e5c9106c&y=true`)
      .then(response => {
        this.setState({ details: response.data });
      })
      .catch(err => console.log(err));
  }

  renderDetails = () => {
    const details = this.state.details;
    if(details.Response === 'False') {
      return <InvalidSearch />
    }

    return (
      <Row>
        <Col xs="12" className="mx-xs-auto mb-2" sm="6" lg="4">
          <Row className="mt-3">
            <Col xs="12">
              <div style={{ height: "100%", width: "100%" }}>
                <img src={details.Poster} alt="poster" className="w-100" />
                <h5 className="mt-2"><MovieIcon color="secondary" />{" " + details.Title}</h5>
                <h6><AccessTimeIcon color="secondary"/>{" " + details.Runtime}</h6>
                <p>{`Rated: ${details.Rated}`}</p>
                <hr />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div>
                <h5><StarICon color="secondary" />  Ratings:</h5>
                {details.Ratings.map(source => {
                  return (
                    <div key={source.Value}>
                      <h6>Source: {source.Source}</h6>
                      <p>Score: {source.Value}</p>
                    </div>
                  );
                })}
                <hr />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs="12" sm="6" lg="8">
          <Row className="mt-3">
            <Col lg="12">
              <div>
                <h5 className="mt-3"><DescriptionIcon fontSize="large" color="secondary" />  Description of the {details.Type}</h5>
                <p>{details.Plot}</p>
                <hr />
              </div>
              <div>
                <h6><LanguageIcon color="secondary"/> Language: {details.Language}</h6>
                <h6><FlagIcon color="secondary" />  County: {details.Country}</h6>
                <h6>Awards: {details.Awards}</h6>
                <hr />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6">
              <div>
                <h6><CameraRollIcon color="secondary" />  Directed by : {details.Director}</h6>
                <h6><EditIcon color="secondary" />  Written by : {details.Writer}</h6>
                <h6>Genre : {details.Genre}</h6>
              </div>
            </Col>
            <Col xs="12" lg="6">
              <h6><DateRangedIcon color="secondary" /> Released: {details.Released}</h6>
              <h6><PeopleIcon color="secondary" />  Actors: {details.Actors}</h6>
              <hr />
            </Col>
          </Row>
          <Row className="mt-3">
              <Col xs="12" lg="6">
                <div>
                    <h5><InfoIcon color="secondary" fontSize="large" />  Other Info:</h5>
                    <p>Metascore: {details.MetaScore}</p>
                    <p>IMDB Rating: {details.imdbRating}</p>
                    <p>IMDB Votes: {details.imdbVotes}</p>
                    <p><AttachMoneyIcon color="secondary" />  Box-Office Collection: {details.BoxOffice}</p>
                    <p><VideoCallIcon color="secondary" />  Production: {details.Production}</p>
                    <p><a href={details.Website} target="_blank" rel="noopener noreferrer"><OpenInNewIcon color="secondary" />  Website</a></p>
                </div>
              </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    if (!this.state.details) {
      return (
        <div className="mt-3 d-flex justify-content-center">
          <Spinner color="success" style={{ width: "3rem", height: "3rem" }} />{" "}
        </div>
      );
    } 

    return (
      <React.Fragment>
        <DetailNavbar details={this.state.details} />
        <Container fluid className="mt-3 h-auto dt-font">{this.renderDetails()}</Container>
      </React.Fragment>
    );
  }
}

export default ShowDetail;
