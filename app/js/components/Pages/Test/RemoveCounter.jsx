import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCounter } from '../../../actions';
import { bindActionCreators } from 'redux';
import { Button } from 'reactstrap';

class RemoveCounter extends Component {
  constructor(props) {
    super(props);
  }
   render() {
     return (
           <div className="container">
            <form>
              <div className="field is-grouped">
                <div className="control">
                  <Button className="button is-primary" color="danger"
                      onClick={(e) => {e.preventDefault();this.props.dispatch(removeCounter())}}>
                      Remove
                  </Button>
                </div>
              </div>
            </form>
            </div>
     )
   }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(removeCounter, dispatch) }
}

export default connect(mapDispatchToProps)(RemoveCounter);