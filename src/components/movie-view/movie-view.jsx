import React from 'react';
import propTypes from 'prop-types';
import './movie-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {
    constructor() {
        super();}

  AddFavorite = (e, id)  => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
       
        axios.post(`https://fredsflix.herokuapp.com/users/${Username}/movies/${id}`,{key: 'value'},
            {
                headers: { Authorization: `Bearer ${token}` }   
            }
        )
            .then(response => {
                alert("Movie added to favorites");
                console.log(token);
                console.log(Username);
                console.log(id);
               
            
                
            })
            .catch(function (error) { 
            });
    }

    
    render() {
        const { movie, onBackClick } = this.props;


        
    //    TO BE USED LATER FOR FAVORITES:
        const selectHeart = '\♡';
        const favorite = '\💓';
       
        
        
        
    return (
    <div className="movie-view">

<Row> 
        <Col><h1 className='page_title'>Movie Info</h1></Col>
        
    </Row>
        <Row>
            <Col> 
                 <div className="movie-poster"><img src={movie.ImagePath}  /></div>
             </Col>
             <Col>
            <div className="movie-info">
                 <div className="movie-title">
                     <span className="label">Title: </span>
                     <span className="value">{movie.Title}</span>
                 </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">
                        <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                    </span>
                 </div>
                 <div className="movie-genre">
                     <span className="label">Genre: </span>
                     <span className="value">
                         <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></span>
                 </div>
                    


            </div>
                 </Col>
            
        </Row>
        <Row className="justify-content-center">
        <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
        </div><Button className="button" variant="info" onClick={() => { onBackClick(); }}>Back</Button></Row>
        <Button value={movie._id} onClick={(e) => this.AddFavorite(e, movie._id)}>Add To Favorites</Button>
    </div>
    );
  }
}

// MovieView.propTypes = {
//     ImagePath: propTypes.string.isRequired,
//     Title: propTypes.string.isRequired,
//     Description: propTypes.string.isRequired,
//     Genre: propTypes.string.isRequired,
//     Director: propTypes.string.isRequired
// }
