import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
    AppWrapper,
    Container,
} from '../components';

const queryString = require('query-string');

export class ProxyPage extends Component {
    state = {
        redirectUrl: '',
    }
    componentDidMount() {
        const { code, state } = queryString.parse(this.props.location.search);
        fetch(
            `/api/callback?code=${code}&state=${state}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache': 'no-cache'
                },
            }
        ).then(res => res.json())
        .then(({ access_token, refresh_token }) => {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            this.setState({
                redirectUrl: '/logged',
            });
        })
    }
    render() {
        return (
            <AppWrapper>
                <Container>
                    <h2>logging you up</h2>
                    {this.state.redirectUrl && <Redirect to={this.state.redirectUrl} />}
                </Container>
            </AppWrapper>
        );
    }
}
