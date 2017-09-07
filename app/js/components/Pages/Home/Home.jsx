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
  }
  render() {
    return (
      <div className='Home'>
        Just test for alert ;)
        <Button className="button is-primary"
          onClick={(e) => { e.preventDefault(); this.props.dispatch(showAlert('This alert can be changed from other component :D')); }}>
          Show alert
        </Button>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(showAlert, dispatch) }
}
export default connect(mapDispatchToProps)(Home);