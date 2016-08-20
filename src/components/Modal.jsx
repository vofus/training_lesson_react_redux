import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        let { src, title } = this.props;
        return (
            <div id="modal" className="photos-modal__wrap hidden">
                <div className="photos-modal__box">
                    <img className="modal__img img-responsive"
                         src={ this.props.src }
                         alt={ this.props.title}
                         title={ this.props.title} />
                    <p className="photos-modal__title">{ this.props.title }</p>
                </div>
            </div>
        );
    }
}