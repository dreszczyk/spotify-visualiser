import styled from 'styled-components';

export const AlbumArt = styled.img`
    border-radius: 25px;
    transition: 0.1s all ease;
    margin-top: 50px;
    &.pulse {
        transform: scale(1.01);
    }
`;