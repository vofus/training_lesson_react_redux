import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import classifier from '../libs/color-classifier/color_classifier_es6';
import * as api from '../constants/fetch-api';
import axios from 'axios';
import store from '../store';

class ColorPickerComponent extends Component {
    componentDidMount() {
        let fetched = store.getState().fetched;
        if (fetched === false) {
            downLoad(store);
        }
    }
    render() {
        let { color, colorName, onChangeColor } = this.props,
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

function downLoad(store) {
    store.dispatch((dispatch) => {
        const query = store.getState().colorName,
              url   = `${api.URL}${api.FORMAT}&${api.METHOD}&${api.EXTRAS}&${api.KEY}&${api.PER_PAGE}&${api.Q}${query}`;
        dispatch({type: 'FETCH_PHOTOS_START'});
        axios.get(url)
            .then((response) => {
                let data = response.data;
                let i = 0;               // начальный индекс извлекаемой строки
                let j = data.length-1;     // конечный индекс извлекаемой строки

                while (data[i] !== '{') {
                    i++;
                }
                while (data[j] !== '}') {
                    j--;
                }
                data = data.slice(i, j+1);
                data = JSON.parse(data);
                dispatch({type: 'RECEIVE_PHOTOS', payload: data.photos.photo});
            })
            .catch((err) => {
                dispatch({type: 'FETCH_PHOTOS_ERROR', payload: err});
            });
    });
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
        color: state.color,
        colorName: state.colorName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeColor: (colorObj) => {
            dispatch(changeColor(colorObj));
            downLoad(store);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerComponent);