import './Home.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { showAlert } from '../../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      nick: '',
      url: ''
    }

    this.getData = this.getData.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  login(){

  }
  
  getData(){
    let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let fetchData = { headers: myHeaders, method: "POST" }
    fetch('http://localhost:8000/api/v1/steam',fetchData)
    .then((data)=>{return(data.json())})
    .then((data)=> {
      this.setState({
        avatar: data.response.players[0].avatarfull,
        nick:data.response.players[0].personname,
        url:data.response.players[0].profileurl
      })
      console.log(data.response.players[0].avatar);
    })
  }

  render() {
    let av = this.state.avatar;
    console.log(av);
    return (
      <div className='Home'>
        <p>
        nick: {this.state.nick} <br/>
        avatar: {this.state.avatar} <img src={this.state.avatar} alt={this.state.nick}/> <br/>
        <a href={this.state.url}>Profile</a><br/>
        </p><br/>
        Just test for alert ;)
        <Button className="button is-primary"
          onClick={(e) => { e.preventDefault(); this.props.dispatch(showAlert('This alert can be changed from other component :D')); }}>
          Show alert
        </Button>
        <Button className="button is-primary"
          onClick={this.getData}>
          Check
        </Button>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(showAlert, dispatch) }
}
export default connect(mapDispatchToProps)(Home);