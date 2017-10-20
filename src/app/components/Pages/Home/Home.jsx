import './Home.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { showAlert } from '../../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {userData} from '../../../api/user';
import {getUserInventory, getItemPrice} from '../../../api/inventory';
// import csgomarket from 'csgo-market';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [{}],
      // playersId: ['76561198145597338','76561198145597334','76561198145597332','76561198145597345','76561198145597350','76561198145597354'],
      playersId: ['76561198145597332'],
      inventory: []
    }

    this.getData = this.getData.bind(this);
    this.login = this.login.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  componentDidMount() {
    this.state.playersId.forEach(function (id) {
      this.getData(id);
    }, this);
  }

  login() {

  }

  getData(id) {
    let players = [];
    userData(id).then((data) => {
        players = this.state.players;
        players.push({
          avatar: data.response.players[0].avatarfull,
          nick: data.response.players[0].personaname,
          url: data.response.players[0].profileurl,
          id: data.response.players[0].steamid
        })
        this.setState({ players });
      })
  }

  getInventory(id) {
    getUserInventory(id)
      .then((inventory) => {
        this.setState({ inventory: inventory.descriptions })
      })
  }

  getPrice(name) {
    let nam = name;
    // console.log(name);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = { headers: myHeaders, method: "POST" }

    fetchData.body = JSON.stringify({ 'name': `${name.split('™').join('%E2%84%A2')}` })
    // console.log(name);

    
    getItemPrice(name)
    .then((inventory) => {
        console.log('inv',inventory);
        // return inventory.lowest_price;
      })
  }

  render() {
    return (
      <div className=''>
        Just test for alert ;)
        <Button className="button is-primary"
          onClick={(e) => { e.preventDefault(); this.props.dispatch(showAlert('This alert can be changed from other component :D')); }}>
          Show alert
        </Button>
        <img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0uL3djFN79fnzL-Nm_b5NqjulGdE7fp5j-jX7MKn2VW3-UE_Yz-gJo-ScQBrYA3V81m6xru-hsTpuMiYwXNn7yIl7CrcgVXp1p__7duw" alt="" />

        <Container>
        <Row>
        {
          this.state.inventory.map((item, index) => {
            if (item.tradable) return (
              <Col key={index} style={{ border: `2px solid #${item.name_color}`, borderRadius: '20px', padding: '40px' }}>
                <div><img src={'http://steamcommunity-a.akamaihd.net/economy/image/' + item.icon_url} alt={item.market_name} /></div>
                <div>{item.market_name}</div>
                <div><a href={item.instanceid}>Profile</a><br /></div>
                <div>tradable {item.tradable ? 'true' : 'false'}</div>
                <div onClick={()=>{this.getPrice(item.market_hash_name)}}>price</div>
              </Col>
            )
          })
        }
        </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
        
        <table style={{ width: '100%' }}>
          <tbody>
            {
              this.state.players.map((player, index) => {
                return (
                  <tr key={index}>
                    <td><img src={player.avatar} alt={player.nick} /></td>
                    <td>{player.nick}</td>
                    <td><a href={player.url}>Profile</a><br /></td>
                    <td onClick={() => { this.getInventory(player.id) }}>{player.id}</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(showAlert, dispatch) }
}
export default connect(mapDispatchToProps)(Home);