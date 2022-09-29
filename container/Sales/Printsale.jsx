/* eslint-disable @next/next/no-img-element */
import { useStore } from 'npm-pkg-hook'
import React from 'react'
import {
  Content,
  Item,
  Text,
  Ticket
} from './styled'

export const Prints = ({ data }) => {
  const [dataStore] = useStore()
  const { Image } = dataStore || {}

  return (
    <Ticket>
      <div className='ticket' id='ticket'>
        <img
          alt='Logotipo'
          src={Image}
        />
        <Text className='centrado' fontWeight='800'>TICKET DE VENTA</Text>
        <Item>
          <span>PRODUCTO</span>
          <span>$ PRECIO</span>
        </Item>
        <Content>
          {data.map((item, i) => {return (
            <Item key={i + 1}>
              <span>{item?.pName}</span>
              <span>${item?.ProPrice}</span>
            </Item>
          )})}
        </Content>
        {/* <Item>
          <span>Pedido</span>
          <span>{code}</span>
        </Item>
        <Item>
          <Text>FECHA</Text>
          <Text>{time}</Text>
        </Item>
        <Item>
          <Text fontWeight='bold'>SUB TOTAL</Text>
          <Text fontWeight='bold'>{(total)}</Text>
        </Item>
        <Item>
          <Text fontWeight='bold'>CAMBIO</Text>
          <Text fontWeight='bold'>{change}</Text>
        </Item>
        <Item>
          <Text fontWeight='bold'>TOTAL</Text>
          <Text fontWeight='bold'>{total}</Text>
        </Item> */}
      </div>
    </Ticket>
  )
}