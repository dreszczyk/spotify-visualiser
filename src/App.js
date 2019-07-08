import React, { Component } from 'react';
import * as SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import settings from '../settings';

import {
    AppWrapper,
    Container,
    Button,
} from './components';

const spotify = new SpotifyWebApi();
spotify.setAccessToken(settings.accessToken);

export default class App extends Component {
    state = {
    }
    render() {
        return (
            <AppWrapper>
                <Container>
                    <h2>spotify visualiser</h2>
                    <h4>You need to log in.</h4>
                    <Button>log in</Button>
                </Container>
            </AppWrapper>
        );
    }
}
