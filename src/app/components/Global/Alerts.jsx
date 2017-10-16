import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideAlert } from '../../actions';
import PropTypes from 'prop-types';

class Alerts extends React.Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.props.dispatch(hideAlert());
  }

  render() {
    let hidden = this.props.alertOptions.hidden;
    let text = this.props.alertOptions.text;
    return (
      <Alert color="info" isOpen={!hidden} toggle={this.onDismiss} transitionAppearTimeout={300} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {text}
      </Alert>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(hideAlert, dispatch) }
}
export default connect(mapDispatchToProps)(Alerts);