import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ColorPickerComponent from './components/ColorPickerComponent';
import Text from './components/Text';
import PhotosByColor from './components/PhotosByColor';
import MainLayout from './components/MainLayout';

export default (
    <Router history={ browserHistory }>
        <Route path="/react-redux-01" component={ MainLayout }>
            <IndexRoute component={ ColorPickerComponent } />
            <Route path="color-picker" component={ ColorPickerComponent }/>
            <Route path="text" component={ Text }/>
            <Route path="photos-by-color" component={ PhotosByColor }/>
        </Route>
    </Router>
);