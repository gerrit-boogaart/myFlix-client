import React from 'react';

import './movie-card.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";
export class MovieCard extends React.Component {

  onRemoveFavorite = (e, id) => {
    const movie = this.props.movie
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https:/fredsflix.herokuapp.com/users/${Username}/movies/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
        .then(response => {
          alert ( movie.Title + " was removed from favorites.")
        })
        .catch(function (error) {
            console.log(error);
        });
}

  AddFavorite = (e, id)  => {
    const movie = this.props.movie
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
   
    axios.post(`https://fredsflix.herokuapp.com/users/${Username}/movies/${id}`,{key: 'value'},
        {
            headers: { Authorization: `Bearer ${token}` }   
        }
    )
        .then(response => {
          alert ( movie.Title + " was added to favorites.") 
        })
        .catch(function (error) { 
        });
}

 isFav(favorites, movie) {    
 
    if (favorites.includes(movie._id)) {
     
      return ( <Button variant="outline-info" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie._id)}>&hearts;</Button>);
      
    }
      else {
      
       return ( <Button variant="outline-info" value={movie._id} onClick={(e) => this.AddFavorite(e, movie._id)}variant="outline-info">&#9825;</Button>);
       
      }
 };





  render() {
    const {  favorites, movie, user, } = this.props;

 if (favorites)
   return (
      <Card className= 'card'>
           
        <Card.Img variant="top" src={movie.ImagePath}  />
        <Card.Body>
          <Card.Title className='card_title'>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
                 
      
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">OPEN</Button>
          </Link>
         
          <Card.Text> {this.isFav(favorites, movie)} </Card.Text> 
        </Card.Body>
       
      </Card>
      )
      else return ('Loading...');
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string
    }).isRequired
  };


  

  