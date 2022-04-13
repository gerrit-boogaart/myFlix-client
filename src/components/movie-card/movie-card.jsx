import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {


  render() {
    const { movie } = this.props;
   

    return (
      <Card className= 'card'>
        <Card.Img variant="top" src={movie.ImagePath}  />
        <Card.Body>
          <Card.Title className='card_title'>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">OPEN</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string
    }).isRequired
  };