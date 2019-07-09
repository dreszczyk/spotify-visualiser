import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as Spotify from 'spotify-web-api-js';
import * as Vibrant from 'node-vibrant'
import {
    isEmpty,
} from 'lodash';

import {
    AppWrapper,
    Container,
    AlbumArt,
} from '../components';


export class Logged extends Component {
    state = {
        accessToken: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token'),
        redirectUrl: '',
        spotifyEnabled: false,
        lastSong: {},
        currentSong: {},
        palette: [],
    }
    spotifyObject = new Spotify();
    componentDidMount() {
        if (!this.state.accessToken || !this.state.refreshToken) {
            this.setState({
                redirectUrl: '/',
            });
        } else {
            this.spotifyObject.setAccessToken(this.state.accessToken);
            this.setState({
                spotifyEnabled: true,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.spotifyEnabled && !prevState.spotifyEnabled) {
            this.refreshCurrentSong();
            setInterval(() => {
                this.refreshCurrentSong();
            }, 2000);
        }
        if (prevState.currentSong.id !== this.state.currentSong.id) {
            this.setState({
                lastSong: prevState.currentSong,
                lastDeg: prevState.currentDeg,
                lastPalette: prevState.palette,
            }, () => {
                setTimeout(() => {
                    this.setState({
                        lastSong: {},
                        lastPalette: {},
                    });
                }, 1500)
            });
        }
    }
    refreshCurrentSong = () => {
        this.spotifyObject.getMyCurrentPlaybackState((err, playback) => {
            if (err) {
                console.error(err);
            } else {
                if (playback.item.id !== this.state.currentSong.id) {
                    Vibrant.from(playback.item.album.images[0].url).getPalette((err, palette) => {
                        this.setState({
                            currentDeg: Math.floor(Math.random() * 180) + 1,
                            currentPlayback: playback,
                            currentSong: playback.item,
                            palette,
                        });
                    });
                }
            }
        });
    }
    render() {
        const headerStyles = !isEmpty(this.state.palette) ? {
            margin: '10px 0',
            color: this.state.palette.LightVibrant.getHex(),
            textShadow: `1px 1px 0 ${this.state.palette.DarkVibrant.getHex()}`,
        } : {};
        const mainAlbumTitle = isEmpty(this.state.currentSong) ? '' : (
            <div>
                <h1 style={headerStyles}>{this.state.currentSong.name}</h1>
                <h3 style={headerStyles}>{this.state.currentSong.artists.map(artist => artist.name).join(', ')}</h3>
            </div>
        );
        const mainAlbumArt = isEmpty(this.state.currentSong) ? '' : (
            <AlbumArt
                src={this.state.currentSong.album.images[0].url}
                alt={this.state.currentSong.album.name}
            />
        );

        const prevHeaderStyles = !isEmpty(this.state.lastPalette) ? {
            margin: '10px 0',
            color: this.state.lastPalette.LightVibrant.getHex(),
            textShadow: `1px 1px 0 ${this.state.lastPalette.DarkVibrant.getHex()}`,
        } : {};
        const prevMainAlbumTitle = isEmpty(this.state.lastSong) ? '' : (
            <div>
                <h1 style={prevHeaderStyles}>{this.state.lastSong.name}</h1>
                <h3 style={prevHeaderStyles}>{this.state.lastSong.artists.map(artist => artist.name).join(', ')}</h3>
            </div>
        );
        const prevMainAlbumArt = isEmpty(this.state.lastSong) ? '' : (
            <AlbumArt
                src={this.state.lastSong.album.images[0].url}
                alt={this.state.lastSong.album.name}
            />
        );
        const prevSong = !isEmpty(this.state.lastPalette) ? (
            <AppWrapper
                style={!isEmpty(this.state.lastPalette) ? {
                    backgroundImage: `linear-gradient(${this.state.lastDeg}deg, ${this.state.lastPalette.DarkVibrant.getHex()}, ${this.state.lastPalette.Vibrant.getHex()}, ${this.state.lastPalette.LightVibrant.getHex()})`,
                } : {}}
                className="folding"
            >
                <Container>
                    {prevMainAlbumTitle}
                    {prevMainAlbumArt}
                </Container>
            </AppWrapper>
        ) : '';
        const currentSong = !isEmpty(this.state.palette) ? (
            <AppWrapper
                style={!isEmpty(this.state.palette) ? {
                    backgroundImage: `linear-gradient(${this.state.currentDeg}deg, ${this.state.palette.DarkVibrant.getHex()}, ${this.state.palette.Vibrant.getHex()}, ${this.state.palette.LightVibrant.getHex()})`,
                } : {}}
            >
                <Container>
                    {mainAlbumTitle}
                    {mainAlbumArt}
                </Container>
            </AppWrapper>
        ) : '';
        return (
            <div>
                {this.state.redirectUrl && <Redirect to={this.state.redirectUrl} />}
                {prevSong}
                {currentSong}
            </div>
        );
    }
}
