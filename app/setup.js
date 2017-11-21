import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../app/store'; //Import the store
import Home from '../app/components/home' //Import the component file

function setup() {
    class Root extends Component {
        render() {
            return (
                <Provider store={store}>
                    <Home />
                </Provider>
            );
        }
    }

    return Root;
}

module.exports = setup;