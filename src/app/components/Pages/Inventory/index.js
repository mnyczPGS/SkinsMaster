import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserInventory, getItemPrice, updateAllPrices, getItemsData } from '../../../api/inventory';
import { Container, Row, Col, Progress, Button } from 'reactstrap';
import { connect } from 'react-redux';

import './style.scss';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      prices: [],
      progress: 0
    }

    this.getInventory = this.getInventory.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.setTradableItems = this.setTradableItems.bind(this);
    this.updateAllPrices = this.updateAllPrices.bind(this);
  }

  updateAllPrices() {
    updateAllPrices(this.state.inventory);
  }

  componentWillMount() {
    console.log('prps id',this.props.steamId);
    this.getInventory(this.props.steamId.id);
  }
  componentDidMount(){

  }

  setProgress(row, length) {
    let numberOfItems = this.state.inventory.length;
    this.setState({ progress: row / length * 100 });
  }

  getInventory(id) {
    console.log(id);
    getUserInventory(id)
      .then((inventory) => {
        this.setTradableItems(inventory.descriptions)
      })
  }

  setTradableItems(items = []) {
    let inventory1 = [];
    let inventory = [];
    items.forEach((item, index) => {
      if (item.tradable === 1) {
        inventory1.push({
          market_hash_name: item.market_hash_name,
          icon_url: item.icon_url,
          name: item.name,
          name_color: item.name_color          
        });
      }
    })
    console.log('11111',inventory1)
    getItemsData(inventory1)
    .then((inventory)=>{
    this.setState({ inventory })
    });
    // this.setState({ inventory:inventory1 })
    // this.getPrices(inventory);
  }

  getPrices(inventory) {
    let i = 0;
    let interval = setInterval(
      () => {
        if (i > inventory.length - 1) {
          clearInterval(interval);
        } else {
          // console.log(inventory[i].market_hash_name)
          // this.getPrice(inventory[i].market_hash_name)
        }
        this.setProgress(i, inventory.length);
        i++;
      }
      , 100)
  }

  getPrice(name) {
    console.log('Here?')
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = { headers: myHeaders, method: "POST" }

    fetchData.body = JSON.stringify({ 'name': name })


    getItemPrice(name)
      .then((inventory) => {
        console.log('inv', inventory);
        return inventory;
      })
  }

  render() {
    // return(<div><Progress color="warning" value={this.state.progress} /></div>)
    console.log('test', this.state.inventory)
    return (
      <div className='Inventory'>
        <Progress color="warning" value={this.state.progress} />
        <Button onClick={this.updateAllPrices}>Update prices</Button>
        <Row>
          {
            this.state.inventory.map((item, index) => {
              if (item) return (
                
                <Col xs="12" key={index} style={{ border: `2px solid #${item.name_color}`, borderRadius: '20px', padding: '40px', display: 'inline-flex' }}>
                  <div><img src={'https://steamcommunity-a.akamaihd.net/economy/image/' + item.icon_url} alt={item.market_name} /></div>
                  <div>
                    <div></div>
                    <div>{item.name}</div>
                    {

                      // <div><a href={item.instanceid}>Profile</a><br /></div>
                      // <div>tradable {item.tradable ? 'true' : 'false'}</div>
                      <div>Price: {item.price}</div>
                    }
                  </div>

                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    steamId: state.steamIdReducer
  };
}
export default connect(mapStateToProps)(Inventory);