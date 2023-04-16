import React from 'react'
import {
  ButtonDecrement,
  ButtonIncrement,
  ContainerQuantity,
  MarmitaCounter
} from './styled'
import styles from './styles.module.css'

export const QuantityButton = ({
  quantity,
  label = '',
  border,
  padding,
  handleDecrement,
  showNegativeButton = false,
  validationZero = false,
  width,
  showPositiveButton = false,
  handleIncrement = () => { return },
  ...props
}) => {
  const validateZero = validationZero && quantity >= 0
  return (
    <div {...props}>
      <ContainerQuantity border={border} width={width}>
        <MarmitaCounter
          data-test-id='marmita-counter'
          padding={padding}
        >
          <ButtonDecrement
            className={styles['btn-icon btn-icon--primary btn-icon--size-m btn-icon--transparent marmita-counter__btn-decrement']}
            disabled={showNegativeButton || validateZero}
            onClick={() => {return handleDecrement()}}
            type='button'
          >
            <span className={styles['icon-marmita icon-marmita--minus-sign']}>
              <svg
                height='24'
                viewBox='0 0 24 24'
                width='24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z'
                  fill={validateZero ? 'transparent' : '#EA1D2C'}
                  fillRule='evenodd'
                > </path>
              </svg>
            </span>
          </ButtonDecrement>
          <span className={styles['marmita-counter__value_label']}>{label !== 0 && label}</span>
          <div className={styles['marmita-counter__value']}>
            {validateZero ? null : quantity }
          </div>
          {<ButtonIncrement
            disabled={showPositiveButton}
            onClick={() => {return handleIncrement()}}
            type='button'
          >
            <span className={styles['icon-marmita icon-marmita--plus-sign']}><svg
              height='24'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z'
                fill='#EA1D2C'
                fillRule='evenodd'
              ></path>
            </svg>
            </span>
          </ButtonIncrement>}
        </MarmitaCounter>
      </ContainerQuantity>
    </div>
  )
}
