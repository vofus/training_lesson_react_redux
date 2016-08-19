import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

const mapStateToProps = function (store) {
    return {
        color: store.color
    };
}

class PhotosByColor extends Component {
    render() {
        return (
            <h2>Photos by color</h2>
        );
    }
}

export default connect(mapStateToProps)(PhotosByColor);