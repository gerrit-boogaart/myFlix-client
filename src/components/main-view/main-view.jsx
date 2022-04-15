import React from 'react';
import axios from 'axios';
import { Menubar } from '../nav-bar/nav-bar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../user-view/user-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
export default class MainView extends React.Component {

  constructor(){
    super();
    
    this.state = {
      movies: [],
      user: null,
    };
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
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

 
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
     
    }
  }
  
/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/



     
  render() {
<<<<<<< Updated upstream
    const { movies, user, Username, Password, Birthday, Email, FavoriteMovies } = this.state;
=======
<<<<<<< Updated upstream
    const { movies, selectedMovie, user } = this.state;
  
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    /* before the movies have been loaded */
    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
            { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => 
              { this.setSelectedMovie(newSelectedMovie); }} />
          ))
        }
      </div>
=======
    const { movies, user } = this.state;
>>>>>>> Stashed changes
    return (   
      <Router>
       <Menubar user={user} />
        <Row className="main-view justify-content-md-center">
            
         <Route exact path="/" render={() => {
   /* If there is no user, the LoginView is rendered.*/
    if (!user) return (   
      <Col md={6}>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    )
            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />
          
          <Route exact path="/movies/:movieId" render={({ match, history }) => {
             if (!user) return (   
              <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
             )
              return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/directors/:name" render={({ match, history }) => {
              if (!user) return (   
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>

               )
               
              return <Col md={8}>
<<<<<<< Updated upstream
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                        onBackClick={() => history.goBack()} />
                       
=======
                        <DirectorView movies={movies.filter(m => m.Director.Name === match.params.name)} director={movies.find(m => m.Director.Name === match.params.name).Director}
                        onBackClick={() => history.goBack()} />
>>>>>>> Stashed changes
                     </Col>
          }
          } />

        <Route exact path="/genres/:name" render={({ match, history }) => {
               if (!user) return (   
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
               )
              return <Col md={8}>
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                        onBackClick={() => history.goBack()} />
                     </Col>
          }
          } />

        <Route path={`/users/${user}`} render={({match, history}) => {
        if (!user) return <Redirect to="/" />
        
        return <Col>
        <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()
        }/>
        </Col>

        }} />

        <Route path={`/user-update/${user}`} render={({match, history}) => {
          if (!user) return <Redirect to="/" />
          return <Col>
          <UserUpdate user={user} onBackClick={() => history.goBack()}/>
          </Col>
          
        }} />
        </Row>
      </Router>
     
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    );
  }
}


