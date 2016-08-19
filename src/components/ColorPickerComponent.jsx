import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import store from '../store';
import classifier from '../libs/color-classifier/color_classifier_es6';

const changeColor = function(color, colorName) {
    return {
        type: 'CHANGE_COLOR',
        color: color,
        colorName: colorName
    }
}

class ColorPickerComponent extends Component {
    getNameColor(hexColor) {
        return classifier.classify(hexColor);
    }
    render() {
        let color = this.props.color,
            style = { backgroundColor: color };
        console.log(color);

        return (
            <div className="color-picker__wrap border" style={ style }>
                <div className="color-picker">
                    <SketchPicker color={ color } onChange={ this.onChangeColor.bind(this) }/>
                </div>
            </div>
        );
    }
    onChangeColor(color) {
        let colorName = this.getNameColor(color.hex);

        store.dispatch(changeColor(color.hex, colorName));
    }
}

const mapStateToProps = function(store) {
    return {
        color: store.color
    };
}
export default connect(mapStateToProps)(ColorPickerComponent);