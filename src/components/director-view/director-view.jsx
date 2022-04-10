import React from 'react';
import propTypes from 'prop-types';
import './director-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import icon from './movie-icon-15138.png'

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;
    
    return (
       
    <>
    <Row> 
        <Col><h1 className='page_title'>Director Info</h1></Col>
        
    </Row>
            <Row>
                 <Col> <div><img className='image' src={icon} /></div></Col> 
                 <Col>  <h2>{director.Name}</h2>
                 <p>Born in {director.Birth}</p>
                    <p className='title'>{director.Bio}</p>
                    <Button className="button" variant="info" onClick={() => { onBackClick(); }}>Back</Button>
                </Col>
               
            </Row> 
                    
           
              
                
                  
                
             
    </>
        )
    }
    
}