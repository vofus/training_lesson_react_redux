import React, { Component } from 'react';

export default class Photo extends Component {
    render() {
        return (
            <div className="photo__col col-xs-6 col-sm-3 col-md-2">
                <img className="photo img-responsive" src={ this.props.src } alt={ this.props.title } title={ this.props.title } />
            </div>
        );
    }
}