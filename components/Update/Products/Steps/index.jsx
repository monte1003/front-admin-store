import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'pkg-components'
import { Steps, Tabs } from '../styles'

export const HeaderSteps = ({ active }) => {
  const titleHeaders = ['Detalles', 'Adicionales', 'Complementos', 'Disponibilidad']

  return (
    <Steps>
      {titleHeaders.map((title, index) => {
        const isActive = active === index
        return (
          <Tabs active={isActive} key={title}>
            <Text
              as='h2'
              fontFamily='PFont-Light'
              fontSize='16px'
              fontWeight='200'
            >
              {title}
            </Text>
          </Tabs>
        )
      })}
    </Steps>
  )
}

HeaderSteps.propTypes = {
  active: PropTypes.number
}
