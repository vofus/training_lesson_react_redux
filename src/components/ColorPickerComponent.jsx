import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import classifier from '../libs/color-classifier/color_classifier_es6';

class ColorPickerComponent extends Component {
    render() {
        let { color, onChangeColor } = this.props,
            style = { backgroundColor: color };

        return (
            <div className="color-picker__wrap border" style={ style }>
                <div className="color-picker">
                    <SketchPicker color={ color } onChange={ onChangeColor }/>
                </div>
            </div>
        );
    }
}

function changeColor(colorObj) {
    let colorCode =colorObj.hex,
        colorName = classifier.classify(colorCode);

    return {
        type: 'CHANGE_COLOR',
        color: colorCode,
        colorName: colorName
    }
}

function mapStateToProps(state) {
    return {
        color: state.color
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeColor: (colorObj) => {
            dispatch(changeColor(colorObj));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerComponent);