import { BGColor } from '@/public/colors'
import styled, { keyframes } from 'styled-components'

const slideLeft = keyframes`
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-60px);
    }
`
const slideRight = keyframes`
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(60px);
    }
`
export const Tooltip = styled.div`
    cursor: pointer;
    display:  none;
    max-width: 260px;
    min-height: 500px;
    opacity: 0;
    padding: 20px;
    position: absolute;
    right: -200px;
    z-index: -9;
    .hiddenInfo--title {
        font-size: 1rem;
        font-weight: 500;
        line-height: 2.2rem;
        color: rgb(239, 87, 83);
    }
    .content {
        color: rgb(62, 62, 62);
    font-size: .9rem;
    font-weight: 400;
    line-height: 2rem;
    }
`
export const ContainerSuccessInvoice = styled.div`
        background-color: #fcebea;
        height: 100%;
    .wrapper__success-invoice {
        display: grid;
        gap: 48px;
        grid-template-columns: 1fr;
        height: 100%;
        justify-items: center;
        @media screen and (min-width: 767px) {
            grid-template-columns: repeat(auto-fill,minmax(31%,1fr));
        }
    }
    .wrapper__success-invoice__item {
        background-color: ${BGColor};
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,.12);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: 500px;
        justify-content: space-between;
        position: relative;
        transition: all .5s ease-in-out;
        width: 65%;
        z-index: 999;
        &:hover {
            transform: scale(1.02);
            animation: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both running ${slideLeft};
        }
        &:hover  ${Tooltip} {
            display: block;
            float: right;
            opacity: 1;
            animation: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both running ${slideRight};
        }
    }

`