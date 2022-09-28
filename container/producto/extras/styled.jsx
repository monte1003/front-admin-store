import styled, { css } from 'styled-components'
import {
  BGColor,
  PColor,
  BColor
} from '../../../public/colors'

export const Div = styled.div`
    width: 30%;
`
export const ContainerListOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: flex;
    padding: 40px 0;
    margin: 102px 0;
    .wrapper-list {
        width: 30%;
        margin: 0 10px;
    }
`
export const WrapperList = styled.div`
    width: 100%;
    cursor: move;
`
export const GarnishChoicesHeader = styled.div`
    padding: 12px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: 0px;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    margin-bottom: 80px;
    .garnish-choices__title { 
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        color: #3f3e3e;
    }
    .garnish-choices__title-desc {
        font-weight: 100;
        font-size: .875rem;
        line-height: 17px;
        display: block;
        color: #717171;
    }
     .marmita-minitag{
        -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans,Helvetica,sans-serif;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    font-size: .5625rem;
    line-height: 1;
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
     }
     .garnish-choices {
            justify-content: space-around;
            display: flex;
            

     }
`
export const CardsComponent = styled.div`
    background-color: ${BGColor};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    .title_card{
        word-break: break-word;
        font-family: PFont-Light;
        color: ${BColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
    }
    .price {
        word-break: break-word;
        font-family: PFont-Light;
        color: ${PColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 600;
    }
`
export const ContentModal = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        .header {
            position: static;
            width: auto;
            justify-content: flex-end;
            padding: 20px 6px 0;
            min-height: auto;
            height: auto;
            display: flex;
        }
        .content {
            line-height: 1.15;
    font-size: 16px;
    overflow-y: auto;
    height: 100%;
    padding: 16px 20px;

        }
`
export const ContentLinesItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: min-content;
    border-bottom: 1px solid #ccc;
    ${props => { return props.noBorder && `border-bottom: none` }}
`
export const ContentCheckbox = styled.div`
    transition: all .1s;
    color: inherit;
    cursor: pointer;
    outline: none;
    position: relative;
    margin-right: 2px;
`
export const Input = styled.input`
    width: 100%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
    outline: none;
    border: none;
    ${props => { return props.margin && css`margin: ${props.margin};` }}
    ${props => { return props.padding && css`padding: ${props.padding};` }}
    ${props => { return props.borderRadius && css`border-radius: ${props.borderRadius};` }}
    ${props => {
    return props.card && css`
    padding: 25px;
    border: 2px solid ${PColor};
    `}}
    ${props => {
    return props.inputText && css`
        font-weight: 500;
        margin: 0.625rem 0 0;
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => { return color }};
        outline: none;
        /* padding: 5px; */
        border: 2px solid transparent;
    `}}
    ${props => {
    return props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => { return color }};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}}
    ${props => {
    return props.checkbox && css`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}}
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`
export const Container = styled.div`
    padding: 20px;
    overflow: auto;
    @media only screen and (max-width: 768px) {
        display: none;
        padding: 0;
    }
`
export const Action = styled.div`
    align-items: center;
    background: #fff;
    border-top: 2px solid #f5f0eb;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    height: 80px;
    width: 100%;
`

