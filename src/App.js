import React, { Component } from 'react';
import styled from 'styled-components';
import * as SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import settings from './settings';

const spotify = new SpotifyWebApi();
spotify.setAccessToken(settings.accessToken);

const AppWrapper = styled.div`
    color: white;
`;

export default class App extends Component {
    state = {
    }
    render() {
        return (
            <AppWrapper>
                aaa
            </AppWrapper>
        );
    }
}
