import React, { Component } from 'react';
import { connect } from 'react-redux';
import Photo from './photo';

class PhotosByColor extends Component {
    render() {
        let { photos, fetched } = this.props;
        if (fetched === false) {
            return (
                <h2>Photos by Color</h2>
            );
        }

        return (
            <div className="photos__wrap border">
                <div className="row">
                    {
                        photos.map((item, index) => {
                            return <Photo key={ index } src={ item.url_q } title={ item.title }/>
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos,
        fetched: state.fetched
    };
}

export default connect(mapStateToProps)(PhotosByColor);