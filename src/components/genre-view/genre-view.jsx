import React from 'react';
import propTypes from 'prop-types';
import './genre-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import icon from './masks.png'

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
    
    return (
       
    <>
    <Row> 
        <Col><h1 className='page_title'>Genre Info</h1></Col>
    </Row>
            <Row>
                 <Col> <div><img className='image' src={icon} /></div></Col> 
                 <Col>  <h2>{genre.Name}</h2>
                 <p>{genre.Description}</p>
                    
                    <Button className="button" onClick={() => { onBackClick(); }}>Back</Button>
                </Col>
               
            </Row>             
    </>
        )
    }
    
}



