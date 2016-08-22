import React, { Component } from 'react';
import { connect } from 'react-redux';
import Photo from './photo';
import Modal from './Modal';
import * as api from '../constants/fetch-api';
import axios from 'axios';
import store from '../store';

class PhotosByColor extends Component {
    componentDidMount() {
        downLoad(store);
    }
    render() {
        let { photos, fetched, imgId, handleModal } = this.props;
        if (fetched === false) {
            return (
                <div className="photos__wrap border">
                    <h2>Select color for serch photos</h2>
                </div>
            );
        }
        if (photos.length === 0) {
            return (
                <div className="photos__wrap border">
                    <h2>Photos not found</h2>
                </div>
            );
        }

        return (
            <div className="photos__wrap border" onClick={ handleModal } >
                <div className="row">
                    <Modal src={ photos[imgId].url_l }
                           title={ photos[imgId].title } />
                    {
                        photos.map((item, index) => {
                            return <Photo id={ index }
                                          key={ index }
                                          src={ item.url_q }
                                          title={ item.title }/>
                        })
                    }
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

function handleModal(event) {
    let target = event.target,
        modal = document.getElementById('modal'),
        imgId = 0,
        self = this;

    if (target.tagName === 'IMG') {
        if (target.classList.contains('modal__img')) {
            return {
                type: 'DEFAULT'
            };
        }
        if (target.classList.contains('photo')) {
            imgId = parseInt(target.getAttribute('data-img'), 10);
            modal.classList.remove('hidden');
            setTimeout(fadeInModalPhoto, 400);
        }
        return {
            type: 'SELECT_IMG',
            payload: imgId
        };
    }
    if (target.id === modal.id) {
        modal.classList.add('hidden');
        fadeOutModalPhoto();
        return {
            type: 'SELECT_IMG',
            payload: 0
        };
    }
    return {
        type: 'DEFAULT'
    };
}

function fadeInModalPhoto() {
    let elem = document.getElementsByClassName('modal__img')[0];
    elem.classList.add('visible');
}

function fadeOutModalPhoto() {
    let elem = document.getElementsByClassName('modal__img')[0];
    elem.classList.remove('visible');
}

function mapStateToProps(state) {
    return {
        photos: state.photos,
        fetched: state.fetched,
        imgId: state.imgId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleModal: (event) => {
            dispatch(handleModal(event));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosByColor);