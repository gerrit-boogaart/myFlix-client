import React, { useState, setState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, CardGroup, Navbar, FormGroup} from 'react-bootstrap';
import './user-view.scss';
import Button from 'react-bootstrap';


export default class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = 
     {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: []
    };
  }

componentDidMount() {
  const accessToken = localStorage.getItem('token');
  this.getUser(accessToken);
  this.getMovies(accessToken);
}

getUser = (token) => {
    const username = localStorage.getItem("user");
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
          FavoriteMovies: response.data.FavoriteMovies,
        });
       console.log(this.state.FavoriteMovies)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                     </div>
                     
                </Card>
             </CardGroup>
            </Col>
        </Row>
        <Row>
            <Col>
              <CardGroup>
                <Card bg='light' key="" text ='info' className="user-profile mb-2" border='info'>
                  <div className="favorite-movies">
                    <h2>My Favorite Movies</h2>
                      <ul>
                      <li>Movie Title</li>
                      <li>Movie Title</li>
                      <li>Movie Title</li>
                      <li>Movie Title</li>
                      </ul>
                </div>
                </Card>
              </CardGroup>
            </Col>
        </Row>
    </Container>
 
  )
  
  
  }

}




