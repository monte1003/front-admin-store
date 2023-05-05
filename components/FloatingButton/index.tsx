import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'
import { Tooltip } from '../Tooltip'

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 99999;

  &:hover {
    background-color: #0069d9;
  }

  &:active {
    background-color: #005cbf;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
  }
`

export const FloatingButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <Tooltip label='Add new'>
      <Button {...props}> + </Button>
    </Tooltip>
  )
}