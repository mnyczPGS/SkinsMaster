import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="cotainer">
        <div className="notification">
          <h1>
            {this.props.count}
          </h1>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    count: state.counterReducer,
  };
}
export default connect(mapStateToProps)(Counter);