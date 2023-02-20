import { BGColor, PColor, APColor, SECBGColor, DarkSilver } from 'public/colors'
import styled, { css } from 'styled-components'

export const Input = styled.input`
    outline: none;
    padding: 12px;
    width: 100%;
    margin-bottom: 20px;
`
export const ContentCalcules = styled.div`
    position: fixed;
    right: 16px;
    bottom: -1px;
    padding: 15.8px;
    display: flex;
    width: 39.5%;
    border-radius: 4px;
    justify-content: space-between;
    background-color: ${PColor};
`
export const ScrollbarProduct = styled.div`
    overflow: hidden auto;
    height: 100%;
    border-left: 1px solid #e9ecef;
    margin: ${({ margin }) => { return margin || '0' }};
    .ripple-button__load {
        position: fixed;
        height: auto;
        height: 50px;
        left: -1px;
        bottom: -1PX;
        width: 300px;
        border-radius: 5px;
    }
    h2 {
        text-rendering: optimizeLegibility;
        font-family: PFont-Light;
        display: inline;
        color: #3e3e3e;
        margin: 0 0 2px;
        font-weight: 400;
        font-size: 1.9em;
        text-align: center;
        display: flex;
        justify-content: center;
    }
`
export const FlipTop = styled.div`
    position: relative;
    width: max-content;


`
export const Warper = styled.div`
    flex-wrap: wrap;
    display: flex;
    .optional_input {
        width: 50%;
        padding: 10px;
        margin: 5px 0px;
    }
`
export const CtnSwiper = styled.div`
    height: min-content;
    background-color: ${BGColor};
    box-shadow: inset 0 -1px 0 #dcdcdc;
    margin: 0 0 50px 0;
    padding: 15px 0 ;

`
export const Box = styled.div`
    width: ${({ width }) => { return width || '60%' }};
    place-content: center;
    place-items: center;
    display: ${({ display }) => { return display }};
    position: relative;
`
export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    .input-textarea {
        width: 100%;
        height: 200px;
        outline: none;
        min-height: 200px;
    }
    .parent {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }
    .child {
    height: 100%;
    border-radius: 3px;
}
`
export const ContainerGrid = styled.div`
    display: grid;    
    margin: 0;
    padding-bottom: 20px;
    margin: auto;
    padding: 0 30px;
    height: 100vh;
@media only screen and (min-width: 768px) and (min-width: 960px)
{
    grid-template-columns: repeat(auto-fill,minmax(175px,1fr));
    grid-gap: 30px;
}
@media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill,minmax(172px,1fr));
    grid-gap: 20px;
    grid-auto-rows: max-content;
}


`
export const CateItem = styled.div`
    background-color: ${SECBGColor};
    border-radius: 200px;
    color: ${DarkSilver};
    cursor: pointer;
    display: flex;
    overflow: hidden;
    padding: 0 5px;
    place-content: center;
    place-items: center;
    .name-categorie {
        font-family: 'PFont-Light';
        overflow: hidden;
        white-space: nowrap;
    }
    .icon {
        min-width: 20%;
        max-width: 20%;
        min-height: 20%;
        max-height: 20%;
    }
   

`
export const SliderCategoryProducts = styled.div`
    display: flex;
`
export const Text = styled.span`
    font-weight: ${({ fontWeight }) => { return fontWeight ? fontWeight : '700' }};
`
export const Item = styled.div`
    display: flex;
    place-content: space-between;
    padding: 10px 0;
    /* word-break: break-all; */
    place-items: center;
    border-top: 1px solid #00000069;
`
export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
export const Ticket = styled.div`
h5 {
    font-size: 1.5em;
    font-family: PFont-Bold;
    text-align: center;
}
.title {
}
        .ticket-image {
            width: 100%;
            border: 1px solid #00000069;
            overflow: hidden;
            margin: 0 0 30px 0;
        }
        /* width: 100%;
        max-width: 100%; */
        width: 555px;
        max-width: 555px;
        position: relative;
        display: flex;
        place-items: center;
        place-content: center;
        margin: auto;
        font-family: PFont-Light;
        min-width: 555px;
        margin-bottom: 300px;
   td,
th,
tr,
table {
    border-top: 1px solid black;
    border-collapse: collapse;
}

td.producto,
th.producto {
    width: 75px;
    max-width: 75px;
}

td.cantidad,
th.cantidad {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

td.precio,
th.precio {
    width: 40px;
    max-width: 40px;
    word-break: break-all;
}

.centrado {
    text-align: center;
    border-bottom: 20px;
    align-content: center;
}

.ticket {
    width: 100%;
    max-width: 100%;
}

img{ 
        width: 100%;
        max-width: 100%;
        object-fit: cover;
        min-width: 100%;
        width: 100%;
    }
`
export const Button = styled.button`
    background-color: transparent;
    outline: none;
    &:disabled{
        background-color: blue;
    }
    cursor: pointer;
    color: ${({ color }) => {return color ? color : BGColor}};
    border: 1px solid transparent;

    ${({ active }) => {
    return active && css`
        border: 1px solid ${APColor};
        border-radius: 10px;
    `}}}
`

