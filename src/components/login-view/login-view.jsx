import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Card, Container, CardGroup, Col, Row } from 'react-bootstrap';
import './login-view.scss'
import axios from 'axios';



export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
//Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
    setUsernameErr('Username Required');
    isReq = false;
  }else if(username.length < 5){
    setUsernameErr('Username must be atleast 5 characters long');
    isReq = false;
  }
  if(!password){
    setPasswordErr('Password is required!');
    isReq = false;
  }else if(password.length < 6){
    setPasswordErr('Password must contain atleast 6 characters');
    isReq = false;
  }

  return isReq;
}
 

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username + password);
  const isReq = validate();
  if(isReq){
  /* Send a request to the server for authentication */
  axios.post('https://fredsflix.herokuapp.com/login', {
    Username: username,
    Password: password

  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log(e);
    console.log('no such user')
  });
 }
}; 

  return (
<>

<Container > 
  <Row> 
    <Col lg={8}>
      <CardGroup>
        <Card Card border="light" style={{ width: '18rem' }}> 
          <Card.Body className="login_container">
          <Card.Title>Please Login</Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} 
                placeholder="Enter a username" />
                 {usernameErr && <p style={{color: "red"}} className="font-italic">{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} 
                placeholder="password"/>
                {passwordErr && <p style={{color: "red"}} className="font-italic">{passwordErr}</p>}
              </Form.Group>
              <Button className="button" variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            </Card.Body> 
         </Card>
      </CardGroup> 
    </Col>
  </Row> 
</Container>
</>
  )
}
