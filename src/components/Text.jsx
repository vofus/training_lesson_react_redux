import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

const mapStateToProps = function (store) {
    return {
        color: store.color
    };
}

class Text extends Component {
    render() {
        let color = this.props.color,
            style = { color: color };
        console.log('Text-color: ', color);
        return (
            <div className="border">
                <h2 style={ style }>Header 01</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Natus, assumenda enim obcaecati omnis sunt minima magni nulla quasi quibusdam at voluptatum molestiae ipsam.
                    Velit necessitatibus enim illum quidem error adipisci!</p>
                <h2 style={ style }>Header 02</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Natus, assumenda enim obcaecati omnis sunt minima magni nulla quasi quibusdam at voluptatum molestiae ipsam.
                    Velit necessitatibus enim illum quidem error adipisci!</p>
                <h2 style={ style }>Header 03</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Natus, assumenda enim obcaecati omnis sunt minima magni nulla quasi quibusdam at voluptatum molestiae ipsam.
                    Velit necessitatibus enim illum quidem error adipisci!</p>
                <h2 style={ style }>Header 04</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Natus, assumenda enim obcaecati omnis sunt minima magni nulla quasi quibusdam at voluptatum molestiae ipsam.
                    Velit necessitatibus enim illum quidem error adipisci!</p>
                <h2 style={ style }>Header 05</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Natus, assumenda enim obcaecati omnis sunt minima magni nulla quasi quibusdam at voluptatum molestiae ipsam.
                    Velit necessitatibus enim illum quidem error adipisci!</p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Text);