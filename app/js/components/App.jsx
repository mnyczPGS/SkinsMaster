import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Alerts from './Global/Alerts.jsx';
import Header from './Global/Header.jsx';
import Footer from './Global/Footer.jsx';
import Main from './Pages/Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Alerts alertOptions={this.props.alertVisible} />
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  return {
    alertVisible: state.alertReducer
  };
}
export default connect(mapStateToProps)(App);