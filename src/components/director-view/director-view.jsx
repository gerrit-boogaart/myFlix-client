import React from 'react';
import propTypes, { string } from 'prop-types';
import './director-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import icon from './movie-icon-15138.png';
import { CardGroup, Card} from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick, movies } = this.props;
        console.log({movies});
    return (
       
    <>
    <Row> 
        <Col><h1 className='page_title'>Director Info</h1></Col>
    </Row>

    <Row>
        <Col>  <h2>{director.Name}</h2>
                 <p>Born in {director.Birth}</p>
                 <p className='title'>{director.Bio}</p>
                
        </Col>
    </Row> 
    <Row> 
        <Col><h1 className='page_title'>Movies by {director.Name}</h1></Col>
    </Row>
    <Row>
         <Col md={12}>
                <CardGroup>
                    {movies.map(movie => (
                        <Card md={4} className="favorite-movie card-content" key={movie._id} >
                            <Card.Img
                                className="fav-poster"
                                variant="top"
                                src={movie.ImagePath} />
                            
                              <Card.Body style={{ backgroundColor: "white" }}>
                                    <Card.Title className="movie_title">
                                        {movie.Title}
                                    </Card.Title>
                                       
                              </Card.Body> 
                        </Card>
                            ))}
                </CardGroup>
            </Col>
    </Row>
    <Row className="button">
    <Button  variant="info" onClick={() => { onBackClick(); }}>Back</Button>
    </Row>
    </>
        )
    }


}
  