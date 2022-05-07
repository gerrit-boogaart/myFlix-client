import React from 'react';
import axios from 'axios';
//changes to code 3.8
import { connect } from 'react-redux';
//changes to code 3.8
import { Menubar } from '../nav-bar/nav-bar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
//changes to code 3.8
// import { MovieCard } from '../movie-card/movie-card';
//changes to code 3.8


import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
//changes to code 3.8
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
//changes to code 3.8
import ProfileView from '../user-view/user-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
//export default
class MainView extends React.Component {

  constructor(){
    super();
    
    this.state = {
      user: null
    };
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

  getMovies(token) {
    axios.get('https://fredsflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
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
  
  render() {


    // #5 movies is extracted from this.props 
   let { movies } = this.props;
   let { user } = this.state;

    return (       
      <Router>
      <Menubar user={user} />  
    <Row className="main-view justify-content-md-center">
         
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies} />;
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
                        <DirectorView movies={movies.filter(m => m.Director.Name === match.params.name)} director={movies.find(m => m.Director.Name === match.params.name).Director}
                        onBackClick={() => history.goBack()} />
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
    );
  }
}

//#7
let mapStateToProps = state => {
  return { movies: state.movies }
}
//#8
export default connect(mapStateToProps, { setMovies })(MainView);



