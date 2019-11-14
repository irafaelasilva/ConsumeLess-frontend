import React, { Component } from "react";
import { Route } from 'react-router-dom';
import getData from "../actions/getData";
import { URLs } from '../constants/URLs';
import { CategoryPics } from '../constants/CategoryPics';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AuthService from './AuthService';
import Link from '@material-ui/core/Link';
import Navigation from './Navigation';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
    this.Auth = new AuthService();
    this.makeRequest = this.makeRequest.bind(this);
  }

  makeRequest(event) {
    event.preventDefault();
    const payload = new FormData(event.target)

    this.Auth.bookItem(payload)
      .then(res => this.props.history.replace('/categories'))
      .catch(error => alert(error))
  }

  async componentDidMount() {
    const item = await getData(URLs.item + `${this.props.match.params.id}`);
    this.setState( {item} )
   }

render() {
  const category = this.state.item.category
    return (
      <div>
      <Navigation />
      <div style={{padding:40}}>
      <Card style={{display: 'flex', justifyContent: 'center'}} bg ="light" className="SingleCard">
      <Card.Img height="250" src={ CategoryPics[category] } alt =''/>
      <Card.Body>
        <Card.Title>{ (this.state.item != undefined) ? this.state.item.name : null } - { (this.state.item != undefined) ? this.state.item.category : null }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Deposit: £{ (this.state.item != undefined) ? this.state.item.deposit : null } - Daily Overdue Charge: £{ (this.state.item != undefined) ? this.state.item.overdue_charge : null }</Card.Subtitle>
        <br/>
        
        <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
        <Card.Text>{ (this.state.item != undefined) ? this.state.item.description : null }</Card.Text>

        <Card.Text></Card.Text>

        <Card.Title></Card.Title>
      </Card.Body>
      <Card.Footer>
      <Card.Text>Days you want to borrow for </Card.Text>

        <form onSubmit={this.makeRequest}>

        <InputGroup className="mb-3">
            
          <FormControl
            name='return_by'
            aria-describedby="basic-addon2"/>
          
          <FormControl 
            type='hidden'
            name='item_id'
            value={ (this.state.item != null) ? this.state.item.id : null }/>
          <InputGroup.Append>
            <Button variant="outline-secondary" type="submit">Request Item</Button>
          </InputGroup.Append>
          </InputGroup>
          <Link href="/categories" variant="body2">
            {"Back"}
          </Link>
        </form>
      </Card.Footer>
    </Card>
    </div>
    </div>
    );
  }
}

export default Item;
