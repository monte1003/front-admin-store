import React from 'react'
import { Text } from 'pkg-components'
import { Steps, Tabs } from '../styles'

export const HeaderSteps = ({ active }) => {
  return (
    <Steps>
      <Tabs active={active === 0}>
        <Text
          as='h2'
          fontFamily='PFont-Light'
          fontSize='16px'
          fontWeight='200'
        >
        Detalles
        </Text>
      </Tabs>
      <Tabs active={active === 1}>
        <Text
          as='h2'
          fontFamily='PFont-Light'
          fontSize='16px'
          fontWeight='200'
        >
        Sobremesa
        </Text>
      </Tabs>
      <Tabs active={active === 2}>
        <Text
          as='h2'
          fontFamily='PFont-Light'
          fontSize='16px'
          fontWeight='200'
        >
        Complementos
        </Text>
      </Tabs>
      <Tabs active={active === 3}>
        <Text
          as='h2'
          fontFamily='PFont-Light'
          fontSize='16px'
          fontWeight='200'
        >
        Disponibilidad
        </Text>
      </Tabs>
    </Steps>
  )
}
