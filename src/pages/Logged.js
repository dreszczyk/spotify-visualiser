import React, { Component } from 'react';

import {
    AppWrapper,
    Container,
} from '../components';

export class Logged extends Component {
    state = {
    }
    componentDidMount() {
        console.log(localStorage.getItem('access_token'))
        console.log(localStorage.getItem('refresh_token'))
    }
    render() {
        return (
            <AppWrapper>
                <Container>
                    <h2>zalogowano :)</h2>
                </Container>
            </AppWrapper>
        );
    }
}
