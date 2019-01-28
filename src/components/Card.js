import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody
  } from "reactstrap";
import { Link } from "react-router-dom";
import Header from './Header';


const SingleCard = (props) => {
    const { card } = props;
    return (
        <Card className='shadow'>
            <Header className="rs-card-header" card={card} />
            <CardImg
              className="mx-auto"
              style={{ height: "200px", width: "75%" }}
              src={card.Poster === "N/A" ? 'https://bit.ly/2AU5dmg' : card.Poster}
              alt={card.Title}
            />
            <CardBody className="mx-auto">
              <CardText>
                This is a {card.Type} released {2018 - card.Year} years Ago. To
                find more info click below.
              </CardText>
            </CardBody>
            <Link
              to={`/content/${card.imdbID}`}
              className="mx-auto mb-2"
            >
              Show Details
            </Link>
          </Card>
    )
}

export default SingleCard;