import React, { Component } from 'react';

export default class Photo extends Component {
    componentDidMount() {
        setTimeout(fadeInPhoto, 400);
    }
    render() {
        return (
            <div className="photo__col col-xs-6 col-sm-3 col-md-2">
                <img className="photo img-responsive"
                     src={ this.props.src }
                     alt={ this.props.title }
                     title={ this.props.title }
                     data-img={ this.props.id }
                />
            </div>
        );
    }
}

function fadeInPhoto() {
    let listOfElems = document.getElementsByClassName('photo');
    listOfElems = Array.prototype.slice.call(listOfElems);
    listOfElems.forEach((item) => {
        item.classList.add('visible');
    });
}