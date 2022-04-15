import React, { useState, setState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardGroup, Navbar, FormGroup} from 'react-bootstrap';
import './user-view.scss';
<<<<<<< Updated upstream
import Button from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
=======
import { Button }from 'react-bootstrap';
>>>>>>> Stashed changes
import { UserUpdate } from './update-user';
export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = 
     {
       
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
<<<<<<< Updated upstream
      FavoriteMovies: [],
=======
      FavoriteMoviesIDs: [],
>>>>>>> Stashed changes
      movies: []
    };
  }

componentDidMount() {
  const accessToken = localStorage.getItem('token');
<<<<<<< Updated upstream
  this.getUser(accessToken);
  this.getMovies(accessToken);
}

getUser = (token) => {
    const username = localStorage.getItem("user");
=======
  this.getMovies(accessToken);
  this.getUser(accessToken);
 
}
getMovies(token) {
  axios.get('https://fredsflix.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
    console.log(this.state.movies);
  })
  .catch(function (error) {
    console.log(error);
  });
}
getUser = (token) => {
    const username = localStorage.getItem("user");
  
>>>>>>> Stashed changes
    axios
      .get(`https://fredsflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
<<<<<<< Updated upstream
          FavoriteMovies: response.data.FavoriteMovies,
        });
       console.log(this.state.FavoriteMovies)
=======
          FavoriteMoviesIDs: response.data.FavoriteMovies
        });
       console.log(this.state.FavoriteMoviesIDs)
>>>>>>> Stashed changes
      })
      .catch(function (error) {
        console.log(error);
      });
  };

<<<<<<< Updated upstream
  getMovies(token) {
    axios.get('https://fredsflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
      console.log(this.state.movies);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
=======
  onRemoveFavorite = (e, id) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https:/fredsflix.herokuapp.com/users/${Username}/movies/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    )
        .then((response) => {
            console.log(response);
            alert("Movie removed");

            // this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
}





  render() {
    const { Username, Email, Birthday, movies, FavoriteMoviesIDs } = this.state;
>>>>>>> Stashed changes
   
  return (
   
    <Container>
        <Row className="profile-view mt-7 mb-7"
           style={{ minWidth: '400px' }}>
            <Col>
             <CardGroup>
                <Card bg='light' key="" text ='info' className="user-profile mb-2" border='info'>
                   <Card.Header as="h2">My Profile Page</Card.Header>
                      <div className="user-info">
                        <div className="user-name">
                          <span className="label">Name: </span>
<<<<<<< Updated upstream
                          <span className="value">{this.state.Username}</span>
                        </div>
                        <div className="user-email">
                          <span className="label">Email: </span>
                          <span className="value">{this.state.Email}</span>
                        </div>
                        <div className="user-birthday">
                         <span className="label">Birthday: </span>
                         <span className="value">{this.state.Birthday}</span>
                       </div>
                       {/* <Link to={`/users/user`}>
            <Button variant="link">Update User Setting?</Button>
          </Link> */}
=======
                          <span className="value">{Username}</span>
                        </div>
                        <div className="user-email">
                          <span className="label">Email: </span>
                          <span className="value">{Email}</span>
                        </div>
                        <div className="user-birthday">
                         <span className="label">Birthday: </span>
                         <span className="value">{Birthday}</span>
                       </div>
>>>>>>> Stashed changes
                     </div>
                     
                </Card>
             </CardGroup>
            </Col>
        </Row>
        <Row>
            <Col>
           
                
                  <div className="favorite-movies">
                    <h2>My Favorite Movies</h2>
<<<<<<< Updated upstream
                    
=======
                    <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                {FavoriteMoviesIDs.length === 0 && (
                                    <div className="text-center">No favorite movies</div>
                                )}
                                <Row className="favorite-movies-container">
                                    {FavoriteMoviesIDs.length > 0 && movies.map((movie) => {
                                        if (movie._id === FavoriteMoviesIDs.find((fav) => fav === movie._id)
                                        ) {
                                            return (
                                                <Card className="favorite-movie" key={movie._id} >
                                                    <Card.Img
                                                        className="favorite-movie-image"
                                                        variant="top"
                                                        src={movie.ImagePath}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title className="movie-title">
                                                            {movie.Title}
                                                        </Card.Title>
                                                        <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie._id)}>Remove from List</Button>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        }
                                    })}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
>>>>>>> Stashed changes
  
                </div>
              
            </Col>
        </Row>
        < UserUpdate user={this.state} />
    </Container>
 
  )
  
  
  }

}




