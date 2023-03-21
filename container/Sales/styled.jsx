import { BGColor, PColor, APColor, SECBGColor, DarkSilver, SFVColor } from 'public/colors'
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
    display: ${({ display }) => { return display || 'grid' }};
    grid-template-columns: 25% repeat(auto-fill, 25%);
    place-content: space-between;
    padding: 15px;
    place-items: center;
    border-top: 1px solid ${SFVColor};
    span {
        display: inline-block;
    }
`
export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    `
export const ContainerTicket = styled.div`
        position: relative;
    .wrapper-action__footer {
        position: sticky;
        top: 30px;
        right: 0;
        margin: 0 0 0 auto;
        background: #fff;
        border-radius: 60px;
        width: min-content;
        display: flex;
        justify-content: space-between;
        z-index: 9999;
        & > button {
            transition: all 0.3s ease;
            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            }

        }
    }
`
export const Ticket = styled.div`
    background-color:#ecebeb;
    position: relative;
.ticket {
    transform: scale(0.8);
    position: relative;
    margin-bottom: 300px;
    width: 120mm;
    background-color: #FFF;
    font-family: PFont-Regular;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 30px;
}
.ticket-info_client_restaurant {
    padding: 15px;
}
.divider {
    background-image:radial-gradient(circle at 0 50%,transparent 30px,#FFF 0,#fff 80%,transparent 0),radial-gradient(circle at 100% 50%,#ecebeb 30px,#fff 0,#ecebeb 80%,#ecebeb 0);
    display: flex;
    height: 100px;
    position: relative;
    & > div {
        position: absolute;
        border-top: 2px dashed #f2f2f2;
        width: 87%;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 1px;
        left: 30px;
    }
}
.wrapper__arrow_button {
    height: 40px;
}

.wrapper__sub-items {
    display: flex;
}
    .sub-items {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}
.sub-item__values {
    width: 50%;
    
    .item--values {
      display: flex;
      justify-content: space-between;
      padding: 15px;
    }
}

.arrow_button {
    position: relative;
    width: 20px;
    margin: 0;
  }

  .arrow_button::after {
    content: "";
    position: absolute;
    bottom: -18px;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #FFFFFF transparent transparent transparent;
  }
.ticket h5 {
  font-size: 24px;
  margin-bottom: 0.5rem;
}

.ticket p {
  margin: 0;
}

.ticket-image {
  margin-top: 1rem;
  text-align: center;
}

.ticket-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
}

.ticket-title {
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  margin: 1rem 0;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.ticket-item .title {
  font-weight: bold;
}

.ticket-item:last-of-type {
  margin-top: 1rem;
  border-top: 1px solid black;
  padding-top: 0.5rem;
}

.ticket-item-total {
  font-size: 20px;
}

.ticket-item-total .title {
  font-size: 20px;
}

`
export const Button = styled.button`
    background-color: transparent;
    outline: none;
    &:disabled{
        background-color: blue;
    }
    cursor: pointer;
    color: ${({ color }) => { return color ? color : BGColor }};
    border: 1px solid transparent;

    ${({ active }) => {
        return active && css`
        border: 1px solid ${APColor};
        border-radius: 10px;
    `}}
`
