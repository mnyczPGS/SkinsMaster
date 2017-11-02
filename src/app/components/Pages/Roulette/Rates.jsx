import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import firebase from 'firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: [],
      green: [],
      black: [],
      in: false
    }

    this.setRates = this.setRates.bind(this);
    this.setRefs = this.setRefs.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.ratesRef = firebase.database().ref('rates');
  }

  componentDidMount() {
    let ratesRef = firebase.database().ref('rates');

    this.setRefs('red');
    this.setRefs('green');
    this.setRefs('black');
  }

  setRefs(colorName) {
    this.ratesRef.child(colorName).limitToLast(10).orderByChild("ammount").on('value', snap => {
      let colors = [];
      let tmpColors = [];
      snap.forEach((color) => {
        tmpColors.push({ name: color.key, value: color.val() })
      });
      for (let i = tmpColors.length - 1; i >= 0; i--) {
        colors.push(tmpColors[i])
      }
      this.setRates(colorName, colors)
    })
  }

  setRates(color, players) {
    this.setState({ [color]: players })
  }

  renderColor(colorName) {
    let color = this.state[colorName]
    return (
      <Col xs={4}>
        <div className={'header '+ colorName}>{colorName}</div>
        <div className="column">
          <ul>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              transitionAppear={true}
              transitionAppearTimeout={1000}>
              {
                color.map((bet, index) => {

                  return (
                    <li className="players" key={index}>
                      <img src={bet.value.avatar} alt={bet.value.name} />
                      {bet.value.name} - {bet.value.ammount}
                    </li>
                  )
                })
              }
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </Col>
    )
  }
  render() {
    return (
      <div className="Rates">
        <Row>
          {
            this.renderColor('red')
          }
          {
            this.renderColor('green')
          }
          {
            this.renderColor('black')
          }
        </Row>
      </div>
    );
  }
}