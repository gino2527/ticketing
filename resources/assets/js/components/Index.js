import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

// my components
import App from './App';
import configureStore from './redux/store/configureStore';

const store = configureStore();

class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        )
    }
}

export default Index