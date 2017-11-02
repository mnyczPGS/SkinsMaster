import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, ButtonToolbar, Input, Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';
import { connect } from 'react-redux';

class IncreaseAmmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAmmount: 0,
      myMax: 0,
      disabled: true
    }

    this.setAmmount = this.setAmmount.bind(this);
    this.sendMyAmmount = this.sendMyAmmount.bind(this);
    let rates = firebase.database().ref('rates');
    this.ammount = firebase.database().ref('steamUsers');
  }

  componentDidMount() {
    setTimeout(() => {
      this.ammount.child(this.props.steamData.id).on('value', snap => {
        console.log('inc', snap.val().ammount);
        this.setState({ myMax: snap.val().ammount })
      })
    }, 1000);
    firebase.database().ref('rouletteCountdown').on('value', snap => {
      if (snap.val() < 59) {
        this.setState({ disabled: false })
      } else {
        this.setState({ disabled: true })
      }
    })

  }

  setAmmount(ammount) {
    console.log(ammount <= this.state.myMax)
    if (ammount <= this.state.myMax || ammount == 0) {
      let myAmmount = ammount
      if (myAmmount == -1) {
        myAmmount = this.state.myMax;
      }
      this.setState({ myAmmount })
    } else {
      this.props.showAlert('Nie posiadasz tyle kredytów')
    }
  }

  sendMyAmmount(color) {
    console.log(this.state.myAmmount <= this.state.myMax)
    if (this.state.myAmmount <= this.state.myMax) {
      let child = this.props.steamData.id;
      console.log(this.props.steamData)
      let pushData = {
        ammount: this.state.myAmmount,
        id: this.props.steamData.id,
        name: this.props.steamData.name,
        avatar: this.props.steamData.avatar
      }
      firebase.database().ref('rates').child(color).push({
        ammount: this.state.myAmmount,
        id: this.props.steamData.id,
        name: this.props.steamData.name,
        avatar: this.props.steamData.avatar
      });
      setTimeout(() => {
        let ammount = this.state.myMax - this.state.myAmmount;
        console.log(ammount);
        this.ammount.child(this.props.steamData.id).set({ ammount })
      }, 100);
    } else {
      this.props.showAlert('Nie posiadasz tyle kredytów :( Peszek :(')
    }

  }

  toggle() {
    let dropdownOpen = !this.state.dropdownOpen;
    if (dropdownOpen) {
      document.getElementsByClassName('dropdown-menu')[0].style.display = 'block'
    } else {
      document.getElementsByClassName('dropdown-menu')[0].style.display = 'none'
    }
    this.setState({ dropdownOpen });
  }

  render() {
    return (
      <div className="IncreaseAmmount">
        <Container>
          <Row style={{ display: 'inline-flex' }}>
            <Col xs={12}>Palce a bet</Col>
            <Col xs={12}>
              <ButtonGroup size="sm">
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(0) }}>Clear</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(this.state.myAmmount + 1) }}>Repeat</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(this.state.myAmmount + 1) }}>+1</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(this.state.myAmmount + 10) }}>+10</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(this.state.myAmmount + 100) }}>+100</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(this.state.myAmmount * 2) }}>*2</Button>
                <Button disabled={this.state.disabled} onClick={() => { this.setAmmount(-1) }}>Max</Button>
                <Input type="text" value={this.state.myAmmount} />
                <Button disabled={this.state.disabled} className="color" color="danger" onClick={() => { this.sendMyAmmount('red') }}>RED</Button>
                <Button disabled={this.state.disabled} className="color" color="success" onClick={() => { this.sendMyAmmount('green') }}>GREEN</Button>
                <Button disabled={this.state.disabled} className="black color" onClick={() => { this.sendMyAmmount('black') }}>BLACK</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>

            </Col>
            <Col xs={4}>

            </Col>
            <Col xs={4}>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    steamData: {
      id: state.steamIdReducer.id,
      name: state.steamIdReducer.name,
      avatar: state.steamIdReducer.avatar.value
    }
  };
}
export default connect(mapStateToProps)(IncreaseAmmount);
