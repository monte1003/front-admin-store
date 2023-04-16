import { BColor, BGColor, PColor } from 'public/colors'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    width: 100%;
    /* max-width: 1366px; */
    margin: 0 auto;
`
export const CardPedido = styled.div`
    box-shadow: 1px 1px 11px 0px #cccccc29;
    border-radius: 5px;
    border: 1px solid #838388;
    padding: 0.5em;
    margin: 0.5em  0;
    background-color: ${BGColor};
    display: flex;
    justify-content: space-between;
    .button-show-more {
        background-color: transparent;
        color: ${PColor};

    }
`
export const Text = styled.span`
    color: ${BColor};
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    font-size: ${({ size }) => {return size || '1.125rem'}};
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const CicleStatus = styled.span`
    -webkit-box-align: stretch;
    -webkit-box-pack: center;
    align-items: stretch;
    background-color: ${({ color }) => {return color || '' }};
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 2px var(--ds-surface-overlay,#FFFFFF);
    box-sizing: content-box;
    cursor: inherit;
    display: flex;
    flex-direction: column;
    font-family: inherit;
    font-size: inherit;
    height: 32px;
    justify-content: center;
    margin: 2px;
    outline: none;
    overflow: hidden;
    padding: 0px;
    position: static;
    transform: translateZ(0px);
    transition: transform 200ms ease 0s, opacity 200ms ease 0s;
    width: 32px;
`


const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: .75;
  }
  25% {
    transform: scale(1);
    opacity: .75;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`


export const ContainerDrag = styled.div`
  .quick-filters {
    display: flex;
    margin-bottom: 20px;
    padding:0 0 20px 34px;
  }
  .search-container {
    display: flex;
    width: min-content;
    align-items: center;
    border: 1px solid #DBDBDB;
    padding: 3px;
}

.search-input {
  flex: 1;
  height: 40px;
  border-radius: 4px;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
}

.search-icon {
  margin-left: 8px;
  fill: #555;
}
`
export const Bubble = styled.div`
  display: block;
  position: relative;
  margin: 20px 0;
  &:hover:after {
    background-color:  ${({ color }) => {return color || '' }};
  }

  &:after {
    content: "";
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 1px;
    left: 1px;
  }

  .bubble-outer-dot {
    margin: 1px;
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot {
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot:after {
    content: "";
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }
`
