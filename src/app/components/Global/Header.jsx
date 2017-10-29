import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavDropdown, NavbarBrand, Nav, NavItem, NavLink, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSteamId, clearSteamId } from '../../actions';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false
    }

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getUser = this.getUser.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false
    };
  }

  componentWillMount() {
    this.getUser();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  toggle() {
    let dropdownOpen = !this.state.dropdownOpen;
    if (dropdownOpen) {
      document.getElementsByClassName('dropdown-menu')[0].style.display = 'block'
      document.getElementsByClassName('dropdown-menu')[0].style.position = 'absolute'
    } else {
      document.getElementsByClassName('dropdown-menu')[0].style.display = 'none'
    }
    this.setState({ dropdownOpen });
  }
  logIn() {
    window.open('/api/v1/user/auth/login', "_self")
  }
  getUser() {
    fetch('/api/v1/user/auth/account', { method: "GET", credentials: 'include', timeout: 1000 })
      .then((data) => { return ('Account: ', data.json()) })
      .then((user) => {
        this.props.dispatch(setSteamId(user.id, user.displayName, user.photos[0].value));
        this.setState({ user, loggedIn: true })
      })
      .catch(() => {
        let user = { "provider": "steam", "_json": { "steamid": "76561198145597332", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Kill-O-reN", "lastlogoff": 1508397776, "commentpermission": 1, "profileurl": "http://steamcommunity.com/id/FOX_The_Mister/", "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg", "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg", "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg", "personastate": 0, "primaryclanid": "103582791440727404", "timecreated": 1405758746, "personastateflags": 0 }, "id": "76561198145597332", "displayName": "Kill-O-reN", "photos": [{ "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg" }], "identifier": "http://steamcommunity.com/openid/id/76561198145597332" };

        console.log(user)
        this.props.dispatch(setSteamId(user.id, user.displayName, user.photos[0]));
        this.setState({ user });
        this.setState({ loggedIn: true });
      })
    setTimeout(() => {
      console.log('Header', this.state.user)
    }, 100);
  }
  logOut() {
    let user = {}
    this.setState({ loggedIn: false })
    setTimeout(() => {
      console.log(this.state.loggedIn)
    }, 100);
    fetch('/api/v1/user/auth/logout')
  }
  render() {
    return (
      <div className="Header">
        <Navbar light className="navDesktop  navbar-dark bg-dark">
          <Link className="nav-link" to="/">SkinsMasters</Link>
          <Nav className="ml-auto" navbar>
            {
              this.state.loggedIn ?
                (
                  <Nav>
                    <NavItem>
                      <Link className="nav-link" to='/roulette'>Roulette</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link" to='/coinflip'>Coinflip</Link>
                    </NavItem>
                    <NavDropdown isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                      <DropdownToggle caret>
                        Hello {this.state.user.displayName} !<img className="top-avatar" src={this.state.user.photos[1].value} alt={this.state.user.displayName} />
                      </DropdownToggle>
                      <DropdownMenu className="asd">
                        <DropdownItem>
                          <Link to='/inventory'>Inventory</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          <Link to='/config'>Config</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </NavDropdown>
                  </Nav>
                )
                :
                (
                  <Nav>
                    <NavItem>
                      <img onClick={this.logIn} style={{ width: 'auto' }} src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" alt="sign in through steam" />
                    </NavItem>
                  </Nav>
                )
            }
          </Nav>
        </Navbar>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(setSteamId, clearSteamId, dispatch) }
}
export default connect(mapDispatchToProps)(Menu);