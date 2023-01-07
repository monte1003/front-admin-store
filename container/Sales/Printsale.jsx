import {
  useStore,
  numberFormat,
  useFormatDate
} from 'npm-pkg-hook'
import { Text } from 'pkg-components'
import Image from 'next/image'

import {
  Content,
  Item,
  Ticket
} from './styled'
import { useEffect, useState } from 'react'

export const Prints = ({ 
  data,
  dataClientes = [],
  values
}) => {
  const [dataStore] = useStore()
  const [client, setClient] = useState({})
  const {
    storeName,
    Image: src,
    storePhone,
    ULocation,
    addressStore,
    uPhoNum
  } = dataStore || {}
  const {
    yearMonthDay, 
    hourMinutes12, 
    longDayName
  } = useFormatDate({})
  useEffect(() => {
    (() => {
      if (dataClientes?.length > 0) {
        const client = dataClientes?.find((client) => {
          return client && client?.cliId === values?.cliId
        })
        setClient(client)
      }
    })()
  }, [dataClientes, values.cliId])
  const {
    clientName,
    ccClient,
    ClientAddress,
    clientNumber
  } = client || {}
  return (
    <Ticket>
      <div className='ticket' id='ticket'>
        <h5>{storeName ?? 'Nombre Empresa'}</h5>
        <Text>NIT:</Text>
        <Text>Direccion: {addressStore ?? ULocation}</Text>
        <Text>Telf: {storePhone ?? uPhoNum} </Text>
        <Text>Fecha: {yearMonthDay + ' ' +  hourMinutes12 + ' ' + longDayName} </Text>
        <Text fontSize='20px' fontWeight='500'>Cliente</Text>
        <Text>Nombre: {clientName}</Text>
        <Text>Direccion: {ClientAddress}</Text>
        <Text>Numero: {clientNumber}</Text>
        <Text>CC: {ccClient}</Text>

        <div className='ticket-image'>
          <Image
            alt={''}
            blurDataURL='/images/DEFAULTBANNER.png'
            className='store_image'
            height={400}
            objectFit='contain'
            src={src ?? '/images/DEFAULTBANNER.png'}
            width={400}
          />
        </div>
        <Text className='centrado' fontWeight='800'>TICKET DE VENTA</Text>
        <Item>
          <span className='title'>REF</span>
          <span className='title'>Cantidad</span>
          <span className='title'>$ PRECIO</span>
        </Item>
        <Content>
          {data.map((item, i) => {return (
            <Item key={i + 1}>
              <span>{item?.pName}</span>
              <span>{item?.ProQuantity}</span>
              <span>${numberFormat(item?.ProPrice)}</span>
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