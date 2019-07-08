import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import {
    Main,
    ProxyPage,
    Logged,
} from './pages'

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Main} />
                <Route path='/proxy' component={ProxyPage} />
                <Route path='/logged' component={Logged} />
            </Router>
        );
    }
}

export default App;