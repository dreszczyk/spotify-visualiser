import React, { Component } from 'react';

import {
    AppWrapper,
    Container,
    Button,
} from '../components';

export class Main extends Component {
    state = {
        redirectUrl: '',
    }
    componentDidMount() {
        
        fetch(`/api/login`, { method: 'GET' })
        .then(res => res.json())
        .then(({ redirectUrl }) => {
            this.setState({
                redirectUrl,
            });
        })
    }
    render() {
        return (
            <AppWrapper>
                <Container>
                    <h2>spotify visualiser</h2>
                    <h4>You need to log in.</h4>
                    <a href={this.state.redirectUrl}>
                        <Button>log in</Button>
                    </a>
                </Container>
            </AppWrapper>
        );
    }
}
