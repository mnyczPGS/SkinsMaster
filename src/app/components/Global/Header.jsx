import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false
    }

    this.toggle = this.toggle.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillMount() {
    this.getUser();
    let user = { "provider": "steam", "_json": { "steamid": "76561198145597332", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Kill-O-reN", "lastlogoff": 1508397776, "commentpermission": 1, "profileurl": "http://steamcommunity.com/id/FOX_The_Mister/", "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg", "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg", "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg", "personastate": 0, "primaryclanid": "103582791440727404", "timecreated": 1405758746, "personastateflags": 0 }, "id": "76561198145597332", "displayName": "Kill-O-reN", "photos": [{ "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg" }], "identifier": "http://steamcommunity.com/openid/id/76561198145597332" };
    console.log(user);
    // this.setState({ user });
    // this.setState({ loggedIn: true });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logIn() {
    window.open('http://localhost:8000/api/v1/user/auth/login', "_self")
  }
  getUser() {
    fetch('http://localhost:8000/api/v1/user/auth/account', { method: "GET", credentials: 'include', mode: 'no-cors' })
      .then((data) => { return ('Account: ', data.json()) })
      .then((user) => {
        console.log(user)
        this.setState({ user, loggedIn: true })
      })
  }
  logOut() {
    let user ={}
    this.setState({ loggedIn: false })
    setTimeout(() => {
      console.log(this.state.loggedIn)
    }, 100);
    // fetch('http://localhost:8000/api/v1/user/auth/logout')
  }
  render() {
    return (
      <div className="Header">
        <Navbar color="faded" light toggleable>
          <NavbarBrand href="/">SkinsMaster</NavbarBrand>

          {
            this.state.loggedIn ?
              (
                <Nav>
                  <NavItem >
                    <img src={this.state.user.photos[2].value} alt={this.state.user.displayName}/>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to='/'>Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to='/contact'>Contact</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to='/test'>counter</Link>
                  </NavItem>
                  <NavItem>
                    <Button onClick={this.getUser} >Get user</Button>
                  </NavItem>
                  <NavItem>
                    <Button onClick={this.logOut} >Log out</Button>
                  </NavItem>
                </Nav>)
              :
              (
                <Nav>
                  <NavItem>
                    <img onClick={this.logIn} style={{ width: 'auto' }} src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" alt="sign in through steam" />
                  </NavItem>
                </Nav>
              )
          }
        </Navbar>
      </div>
    );
  }
}