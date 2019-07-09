import styled from 'styled-components';

export const AppWrapper = styled.div`
    @keyframes Fold {
        0% {
            height: 100vh;
        }
        100% {
            height: 0;
        }
    }
    height: 100vh;
    overflow: hidden;
    color: white;
    background-size: 150% 150%;
    box-shadow: inset 0 0 410px 210px rgba(0,0,0,0.3);
    h1 {
        font-size: 50px;
        font-weight: black;
    }
    h3 {
        font-size: 25px;
        font-style: italic;
    }
    &.folding {
        animation: Fold 1.5s ease 0s 1;
    }
`;