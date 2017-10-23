import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserInventory, getItemPrice, updateAllPrices } from '../../../api/inventory';
import { Container, Row, Col, Progress, Button } from 'reactstrap';

import './style.scss';

export default class Inventory extends Component {
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
  
    updateAllPrices(){
      updateAllPrices(this.state.inventory);
    }

  componentWillMount() {
    this.getInventory('76561198145597332');
  }

  setProgress(row,length){
    let numberOfItems = this.state.inventory.length;
    this.setState({progress: row/length*100});
  }

  getInventory(id) {
    getUserInventory(id)
      .then((inventory) => {
        this.setTradableItems(inventory.descriptions)
        // console.log(inventory)
      })
  }

  setTradableItems(items=[]){
    let inventory = [];
    items.forEach((item, index)=>{
      if(item.tradable === 1){
        inventory.push(item);
      }
    })
    this.setState({inventory})
    this.getPrices(inventory);
  }

  getPrices(inventory) {
    let i =0;
    let interval = setInterval(
      ()=>{
        if(i>inventory.length-1){
          clearInterval(interval);
        } else{
          // console.log(inventory[i].market_hash_name)
          // this.getPrice(inventory[i].market_hash_name)
        }
        this.setProgress(i,inventory.length);
        i++;
      }
    ,100)
  }

  getPrice(name) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let fetchData = { headers: myHeaders, method: "POST" }

    fetchData.body = JSON.stringify({ 'name': `${name.split('™').join('%E2%84%A2')}` })


    getItemPrice(name)
      .then((inventory) => {
        console.log('inv', inventory);
        // return inventory.lowest_price;
      })
  }

  render() {
    // return(<div><Progress color="warning" value={this.state.progress} /></div>)
    return (
      <div className='Inventory'>
        <Progress color="warning" value={this.state.progress} />
        <Button onClick={this.updateAllPrices}>Update prices</Button>
        <Row>
          {
            this.state.inventory.map((item, index) => {
              if (item.tradable) return (
                <Col xs="2" key={index} style={{ border: `2px solid #${item.name_color}`, borderRadius: '20px', padding: '40px' }}>
                  {//<div><img src={'https://steamcommunity-a.akamaihd.net/economy/image/' + item.icon_url} alt={item.market_name} /></div>
                  }
                  <div></div>
                  <div>{item.market_name}</div>
                  {

                    // <div><a href={item.instanceid}>Profile</a><br /></div>
                    // <div>tradable {item.tradable ? 'true' : 'false'}</div>
                    // <div onClick={() => { this.getPrice(item.market_hash_name) }}>price</div>
                  }
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }
}