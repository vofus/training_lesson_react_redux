import React, { Component } from 'react';
import { connect } from 'react-redux';
import Photo from './photo';
import Modal from './Modal';

class PhotosByColor extends Component {
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
        }
        return {
            type: 'SELECT_IMG',
            payload: imgId
        };
    }
    if (target.id === modal.id) {
        modal.classList.add('hidden');
        return {
            type: 'SELECT_IMG',
            payload: 0
        };
    }
    return {
        type: 'DEFAULT'
    };
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