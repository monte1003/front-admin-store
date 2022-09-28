import styled from 'styled-components'

export const ContainerQuantity = styled.div`
    display: inline-flex;
    border: ${({ border }) => {return border ? border : '1px solid #dcdcdc'}};
    border-radius: 4px;
    margin-right: 10px;
    line-height: 1.15;
    font-family: PFont-Regular;
    font-size: 16px;
    box-sizing: border-box;
    display: inline-flex;
    border-radius: 4px;
    margin-right: 15px;
    width: ${({ width }) => {return width ? width : '100%'}};
    @media only screen and (min-width: 960px) {
    .dish-action__counter {
        margin-right: 15px;
    }
    }
`

export const MarmitaCounter = styled.div`
    display: inline-flex;
    display: flex;
    align-items: center;
    position: relative;
    ${({ padding }) => {return padding ? padding : '10px'}}
`

export const ButtonIncrement = styled.button`
    margin-left: 0;
    margin-right: 0;
    background-color: transparent;
    &&:disabled {
        opacity: .4;
        cursor: no-drop;
    }

    .btn-icon.btn-icon--transparent {
        background: transparent;
        color: #ea1d2c;
    }
`
export const ButtonDecrement = styled(ButtonIncrement)`
`