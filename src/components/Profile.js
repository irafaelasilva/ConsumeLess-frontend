import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import AuthService from './AuthService';
import Navigation from './Navigation';
import getData from "../actions/getData"
import { URLs } from '../constants/URLs'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { MdGrade, MdEmail, MdLocationOn, MdAccountCircle } from 'react-icons/md';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {
        username: "",
        email: "",
        created_at: "",
    } }
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const userId = this.Auth.getProfile().user_id;
    const user = await getData(URLs.user + `${userId}`);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Jumbotron variant="primary">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title><MdAccountCircle />  {user.username}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><MdEmail />  {user.email}</ListGroupItem>
                    <ListGroupItem><MdLocationOn / >  London</ListGroupItem>
                    <ListGroupItem>Member since: {user.created_at}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>

              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60(25 kB)
                  https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
                  " />
                </Card>
              </Col>
    
              <Col xs={6} md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>User rating</Card.Title>
                  </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <MdGrade />
                        <MdGrade />
                        <MdGrade />
                        <MdGrade />
                        <MdGrade />
                      </ListGroupItem>
                    </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        
          <Container>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Items I have Borrowed
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body><ItemsBorrowed /></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                Items I am lending out
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body><ItemsLent /></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </div>
    )  
  }  
}

const ItemsBorrowed = () => {
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Borrowed From</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GoT</td>
            <td>Book</td>
            <td>Otto</td>
            <td>01/12/2019</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

const ItemsLent = () => {
  return (
    <p>Items I am lending out</p>
  )
}