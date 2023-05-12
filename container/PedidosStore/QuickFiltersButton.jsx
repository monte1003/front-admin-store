import PropTypes from 'prop-types'
import { PColor } from '@/public/colors'
import styled from 'styled-components'

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #DBDBDB;
  font-size: 14px;
  line-height: 20px;
  color: #262626;
  margin: 0 15px;
  cursor: pointer;
  height: 50px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${PColor};
  }

  &:hover {
    background-color: #FAFAFA;
  }

  &:active {
    background-color: #F4F4F4;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-left: 8px;
    fill: currentColor;
  }
`

export function QuickFiltersButton({ onClick = () => { return } }) {
  return (
    <Button onClick={onClick}>
      <span>Filtros rápidos</span>
      <span className='icon'>
        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
      </span>
    </Button>
  )
}

QuickFiltersButton.propTypes = {
  onClick: PropTypes.func
}
