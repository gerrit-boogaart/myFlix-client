import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menubar } from '../nav-bar/nav-bar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../user-view/user-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
//#0
import { setMovies } from '../../actions/actions';

// we haven't wrtten this one yet
import MoviesList from '../movies-list/movies-list';

 class MainView extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      user: null
    };
  }


  getMovies(token) {
    axios.get('https://fredsflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {    
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

    let { movies } = this.props;
    const { user } = this.state;
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
           return <MoviesList movies={movies}/>;
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
