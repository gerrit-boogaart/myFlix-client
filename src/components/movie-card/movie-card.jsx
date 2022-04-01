import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className='Card'>
        <Card.Img onClick={() => onMovieClick(movie)} variant="link"className='cardImage' variant="top" src={movie.ImagePath}  />
        <Card.Body onClick={() => onMovieClick(movie)} variant="link">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          {/* <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button> */}
        </Card.Body>
      </Card>
    );
  }
}
// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//       Title: PropTypes.string
//     }).isRequired,
//     onMovieClick: PropTypes.func.isRequired
//   };