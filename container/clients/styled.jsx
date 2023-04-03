import { PColor } from 'public/colors'
import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 auto;
    max-width: 1366px;
    padding: 20px;
    width: 100%;

    form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }

    .error-form {
        border: 1px solid red;
    }

    .input-form {
        border: 1px solid red;
        outline: none;
    }

    .container-list__clients {
        height: calc(100vh - 100px);
        overflow: auto;
    }

    .header-action {
        position: sticky;
        top: 0;
        z-index: 99;
    }

`
export const Item = styled.div``
export const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
export const GridStatistics = styled.div`
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    padding: 30px;
    place-content: center;
    h2 {
        font-size: 1.3em;
        margin-bottom: 10px;
        text-align: center;
    }
    p {
        text-align: center;
    }
`