import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import getData from "../actions/getData"
import { URLs } from '../constants/URLs'


export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
      }
    
      async componentDidMount() {
        const data = await getData(URLs.items);
        this.setState({ data })
      }
    render() {
        return (
          <div>
            {this.state.data.map((item, index) => {
              return (
                
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                  <Card>
                    <Card.Img src='https://www.decathlon.co.uk/media/837/8378535/big_1638914.jpg' alt =''/>
                      <Card.Body>
                        <Card.Title>{ item.name }</Card.Title>
                        <Card.Title>{ item.description }</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              </div> 
              )  
            }
          )}
      </div>
      )
    }
}