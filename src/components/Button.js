import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px 20px;
    border: 1px solid white;
    background: transparent;
    border-radius: 5px;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    transform: scale(1);
    transition: 0.1s all;
    outline: none;
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(1.0);
    }
`;