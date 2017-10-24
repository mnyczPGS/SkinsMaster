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
    if(dropdownOpen){
      document.getElementsByClassName('dropdown-menu')[0].style.display='block'
      document.getElementsByClassName('dropdown-menu')[0].style.position='absolute'
    } else {
      document.getElementsByClassName('dropdown-menu')[0].style.display='none'
    }
    this.setState({dropdownOpen});
  }
  logIn() {
    window.open('/api/v1/user/auth/login', "_self")
  }
  getUser() {
    fetch('/api/v1/user/auth/account', { method: "GET", credentials: 'include', timeout: 1000 })
      .then((data) => { return ('Account: ', data.json()) })
      .then((user) => {
        this.props.dispatch(setSteamId(user.id));
        // console.log(user)
        this.setState({ user, loggedIn: true })
      })
      .catch(() => {
        let user = { "provider": "steam", "_json": { "steamid": "76561198145597332", "communityvisibilitystate": 3, "profilestate": 1, "personaname": "Kill-O-reN", "lastlogoff": 1508397776, "commentpermission": 1, "profileurl": "http://steamcommunity.com/id/FOX_The_Mister/", "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg", "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg", "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg", "personastate": 0, "primaryclanid": "103582791440727404", "timecreated": 1405758746, "personastateflags": 0 }, "id": "76561198145597332", "displayName": "Kill-O-reN", "photos": [{ "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_medium.jpg" }, { "value": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0bb7d680f1d6a4844a4b6027439f6b750f87bbd1_full.jpg" }], "identifier": "http://steamcommunity.com/openid/id/76561198145597332" };

        this.props.dispatch(setSteamId(user.id));
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
        <Navbar color="faded" light className="navMobile" toggleable>
          <Link to="/">SkinsMasters</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            {
              this.state.loggedIn ?
                (
                  <Nav className="ml-auto" navbar>
                    <NavItem >
                      <img src={this.state.user.photos[1].value} alt={this.state.user.displayName} />
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
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <img onClick={this.logIn} style={{ width: 'auto' }} src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" alt="sign in through steam" />
                    </NavItem>
                  </Nav>
                )
            }
          </Collapse>
        </Navbar>
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
                      <Link className="nav-link" to='/inventory'>Inventory</Link>
                    </NavItem>
                    <NavItem >

                      <NavDropdown isOpen={this.state.dropdownOpen} size="sm"toggle={this.toggle}>
                        <DropdownToggle caret>
                          Hello {this.state.user.displayName} !<img className="top-avatar" src={this.state.user.photos[1].value} alt={this.state.user.displayName} />
                        </DropdownToggle>
                        <DropdownMenu className="asd">
                          <DropdownItem header>Header</DropdownItem>
                          <DropdownItem disabled>Action</DropdownItem>
                          <DropdownItem>Another Action</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                      </NavDropdown>
                    </NavItem>
                    {

                      // <NavItem>
                      //   <Link className="nav-link" to='/contact'>Contact</Link>
                      // </NavItem>
                      // <NavItem>
                      //   <Link className="nav-link" to='/test'>counter</Link>
                      // </NavItem>
                      // <NavItem>
                      //   <Button onClick={this.getUser} >Get user</Button>
                      // </NavItem>
                      // <NavItem>
                      //   <Button onClick={this.logOut} >Log out</Button>
                      // </NavItem>
                    }
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
        {
          // <Navbar color="faded" light toggleable>
          // <Link to="/">SkinsMaster</Link>

          //   {
          //     this.state.loggedIn ?
          //       (
          //         <Nav>
          //           <NavItem >
          //             <img src={this.state.user.photos[2].value} alt={this.state.user.displayName} />
          //           </NavItem>
          //           <NavItem>
          //             <Link className="nav-link" to='/'>Home</Link>
          //           </NavItem>
          //           <NavItem>
          //             <Link className="nav-link" to='/contact'>Contact</Link>
          //           </NavItem>
          //           <NavItem>
          //             <Link className="nav-link" to='/test'>counter</Link>
          //           </NavItem>
          //           <NavItem>
          //             <Button onClick={this.getUser} >Get user</Button>
          //           </NavItem>
          //           <NavItem>
          //             <Button onClick={this.logOut} >Log out</Button>
          //           </NavItem>
          //         </Nav>)
          //       :
          //       (
          //         <Nav>
          //           <NavItem>
          //             <img onClick={this.logIn} style={{ width: 'auto' }} src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" alt="sign in through steam" />
          //           </NavItem>
          //         </Nav>
          //       )
          //   }
          // </Navbar>
        }
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(setSteamId, clearSteamId, dispatch) }
}
export default connect(mapDispatchToProps)(Menu);