import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import firebase from 'firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rates:{
        black: [],
        green: [],
        red: []
      },
      red: [],
      green: [],
      black: [],
      in: false
    }
    
    this.setRates = this.setRates.bind(this);
  }
  
  componentDidMount(){
    let ratesRef = firebase.database().ref('rates');

    ratesRef.child('black').on('value', snap =>{
      let black = []
      snap.forEach((color) => {
        black.push({name:color.key, value: color.val()})
     });
     this.setRates('black',black)
    })
    ratesRef.child('green').on('value', snap =>{
      let green = []
      snap.forEach((color) => {
        green.push({name:color.key, value: color.val()})
     });
     this.setRates('green',green)
    })
    ratesRef.child('red').on('value', snap =>{
      let red = []
      snap.forEach((color) => {
        red.push({name:color.key, value: color.val()})
     });
     this.setRates('red',red)
    })
  }

  setRates(color,players){
    this.setState({[color]:players})
  }
  render() {
    console.log(this.props.name, this.props.avatar)
    return (
      <div className="Rates">
        <Row>
          <Col xs={4}>
            <div className="header red">RED</div>
            <div className="column">
              <ul>
              <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              transitionAppear={true}
              transitionAppearTimeout={1000}>
                {
                  this.state.red.map((bet, index) =>{
                    console.log(bet)
                  return( 
                    <li className="players" key={index}>
                    <img src={bet.value.avatar} alt={bet.value.name}/>
                    {bet.value.name} - {bet.value.ammount}
                    </li>
                  )
                  })
                }   
                </ReactCSSTransitionGroup>     
              </ul>
            </div>
          </Col>
          <Col xs={4}>
            <div className="header green">GREEN</div>
            <div className="column">
            <ul>
            <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={1000}>
            {
              this.state.green.map((bet, index) =>{
                console.log(bet)
              return( 
                <li className="players" key={index}>
                <img src={bet.value.avatar} alt={bet.value.name}/>
                {bet.value.name} - {bet.value.ammount}
                </li>
              )
              })
            }    
              </ReactCSSTransitionGroup>  
              </ul>
          </div>
          </Col>
          <Col xs={4}>
            <div className="header black">BLACK</div>
            <div className="column">
            <ul>
            <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={1000}>
            {
              this.state.black.map((bet, index) =>{
                console.log(bet)
              return( 
                <li className="players" key={index}>
                <img src={bet.value.avatar} alt={bet.value.name}/>
                {bet.value.name} - {bet.value.ammount}
                </li>
              )
              })
            }      
              </ReactCSSTransitionGroup>  
            </ul>
          </div>
          </Col>
        </Row>
      </div>
    );
  }
}