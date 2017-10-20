import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import './style.scss'

const roulette = {
  numbers: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
      color: '',
      lastNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      otherNumbers: [],
      lastOtherNumbers: []
    }

    this.randomize = this.randomize.bind(this);
    this.rememberLastNumbers = this.rememberLastNumbers.bind(this);
    this.generateSeries = this.generateSeries.bind(this);
    this.generateDrawn = this.generateDrawn.bind(this);
  }

  componentWillMount() {
    this.generateSeries();
  }

  generateSeries(drawn = -1) {
    let otherNumbers = [];
    for (let i = 0; i < 119; i++) {
      if (i < 36) {
        otherNumbers.push(i);
      } else if (i >= 36 && i < 73) {
        otherNumbers.push(i - 36);
      } else if (i >= 73) {
        otherNumbers.push(i - 73);
      }
    }
    this.setState({ otherNumbers });
  }

  generateDrawn() {
    var drawn = -1;
    var seed = Math.floor(Math.random(new Date()) * 1000000000);
    // var a = seed.toString();
    // var seed2 = Math.random(seed);
    // var seed3 = Math.random(seed2);
    var seed4 = Math.random(seed);
    while (drawn < 0 || drawn > 36) {
      drawn = Math.floor((Math.random(seed4) * 100) + 1);
    }
    return drawn;
  }

  randomize() {
    document.getElementById('numbers').style.left = '0';


    var drawn = this.generateDrawn();
    const number = drawn;
    this.generateSeries(drawn);
    console.log(drawn);
    
    setTimeout(() => {
      let ran = ((Math.random()*10)/2);
      console.log('rand',ran/5*100)
      document.getElementById('numbers').style.transition = 'all 10s ease-out';
      document.getElementById('numbers').style.left = -((68*5)+(drawn*5)+(ran))+'vw';

    }, 10);




    setTimeout(() => {
      document.getElementById('numbers').style.transition = '0s';
      this.rememberLastNumbers(drawn);
      this.setState({ number, color: this.checkColor(drawn) })
    }, 10000);
  }

  rememberLastNumbers(drawn) {
    var newNumbers = this.state.lastNumbers;
    let lastNumbers = [];
    for (let i = 0; i < 9; i++) {
      lastNumbers.push(newNumbers[i + 1]);
    }
    lastNumbers[9] = drawn;
    this.setState({ lastNumbers });
  }

  checkColor(drawn) {
    if (drawn == 0) {
      return ('green')
    } else {
      if (drawn % 2 == 0) {
        return ('black')
      } else {
        return ('red')
      }
    }
  }

  render() {
    return (
      <div className='Roulette'>
        <br />
        <div className="lastDrawned">
          <div style={{ display: 'inline-flex' }} className="lastNumbers">
            {
              this.state.lastNumbers.map((number, index) => {
                return (<div className="lastNumber" key={index} style={{ border: `1px solid ${this.checkColor(number)}` }}>{roulette.numbers[number]}</div>)
              })
            }
          </div>
        </div>
        <div className="drawn">
          <div className="divider"></div>
          <div style={{ display: 'inline-flex' }} className="numbers endedDrawn" id="numbers">
            {
              this.state.otherNumbers.map((number, index) => {
                return (<div className="number" key={index} style={{ border: `1px solid ${this.checkColor(number)}` }}>{roulette.numbers[number]}</div>)
              })
            }
          </div>
        </div>

        <br />
        <Button onClick={this.randomize}>Losuj liczbę</Button>
        <br />
        Welcome to SkinsMasters! Number <div style={{ color: this.state.color }}>{roulette.numbers[this.state.number]}</div>
      </div>
    );
  }
}