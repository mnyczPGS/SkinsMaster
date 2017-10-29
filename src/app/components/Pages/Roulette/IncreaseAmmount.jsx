import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, ButtonToolbar, Input, Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';
import { connect } from 'react-redux';

class IncreaseAmmount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAmmount: 0
    }

    this.setAmmount = this.setAmmount.bind(this);
    this.sendMyAmmount = this.sendMyAmmount.bind(this);
    let rates = firebase.database().ref('rates');
  }

  componentDidMount() {

  }

  setAmmount(myAmmount) {
    this.setState({ myAmmount })
  }

  sendMyAmmount(color) {
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
                <Button onClick={() => { this.setAmmount(0) }}>Clear</Button>
                <Button onClick={() => { this.setAmmount(this.state.myAmmount + 1) }}>Repeat</Button>
                <Button onClick={() => { this.setAmmount(this.state.myAmmount + 1) }}>+1</Button>
                <Button onClick={() => { this.setAmmount(this.state.myAmmount + 10) }}>+10</Button>
                <Button onClick={() => { this.setAmmount(this.state.myAmmount + 100) }}>+100</Button>
                <Button onClick={() => { this.setAmmount(this.state.myAmmount * 2) }}>*2</Button>
                <Button onClick={() => { this.setAmmount(100000) }}>Max</Button>
                <Input type="text" value={this.state.myAmmount} />
                <Button className="color" color="danger" onClick={() => { this.sendMyAmmount('red') }}>RED</Button>
                <Button className="color" color="success" onClick={() => { this.sendMyAmmount('green') }}>GREEN</Button>
                <Button className="black color" onClick={() => { this.sendMyAmmount('black') }}>BLACK</Button>
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
    steamData:{
      id: state.steamIdReducer.id,
      name: state.steamIdReducer.name,
      avatar: state.steamIdReducer.avatar.value
    }
  };
}
export default connect(mapStateToProps)(IncreaseAmmount);
