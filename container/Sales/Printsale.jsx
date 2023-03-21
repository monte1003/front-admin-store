import {
  useStore,
  numberFormat,
  useFormatDate
} from 'npm-pkg-hook'
import { Text } from 'pkg-components'
import Image from 'next/image'
import {
  ContainerTicket,
  Content,
  Item,
  Ticket
} from './styled'
import { useEffect, useState } from 'react'
import { Loading } from '~/components/Loading'
import { generatePdfDocumentInvoice } from './PdfStatement'
import { RippleButton } from '~/components/Ripple'
import { IconSales } from './../../public/icons/index'
import { BGColor } from '@/public/colors'
import { Ticket as TemplateTicket } from '../Sales/Ticket'

export const Prints = ({
  data,
  code,
  change,
  total,
  isPrinting,
  promiseResolveRef,
  componentRef,
  dataClientes = [],
  values,
  handleSubmit = () => { return }
}) => {
  const [dataStore] = useStore()
  const [client, setClient] = useState({})
  const {
    storeName,
    Image: src,
    storePhone,
    NitStore,
    ULocation,
    addressStore,
    uPhoNum
  } = dataStore || {}
  const { yearMonthDay, longDayName } = useFormatDate({})
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


  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
    // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current()
    }
  }, [isPrinting])
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {return setDate(new Date())}, 1000)
    return () => {return clearInterval(timer)}
  }, [])
  const localDate = date.toLocaleTimeString()
  const customDate = `${yearMonthDay + ' - ' + localDate + ' - ' + longDayName}`

  const dataToPrint = {
    products: data,
    urlLogo : src ? src : src ?? '/images/DEFAULTBANNER.png',
    addressStore: addressStore ?? ULocation ?? ClientAddress,
    storePhone: storePhone ?? uPhoNum,
    date: customDate,
    client: {
      clientName,
      clientNumber,
      ccClient,
      ...client
    },
    ref: code,
    total,
    change,
    NitStore,
    storeName,
    ...dataStore
  }
  // handleDownLoad(generatePdfDocumentInvoice({data: dataToPrint, titleFile}))

  return (
    <ContainerTicket>
      <div className='wrapper-action__footer'>
        <RippleButton
          height='60px'
          onClick={() => {return handleSubmit()}}
          radius='100%'
          widthButton='60px'
        >
          <IconSales color={BGColor} />
        </RippleButton>
      </div>
      {isPrinting && <Loading />}
      <TemplateTicket componentRef={componentRef} dataToPrint={dataToPrint} />
      <Ticket >
        <div
          className='ticket'
          id='ticket'
        >
          <div className='ticket-info_client_restaurant'>
            <div className='wrapper__arrow_button' />
            <h5>{storeName ?? 'Nombre Empresa'}</h5>
            <Text>NIT:</Text>
            <Text>Dirección: {addressStore ?? ULocation ?? ClientAddress}</Text>
            <Text>Teléfono: {storePhone ?? uPhoNum} </Text>
            <Text>Fecha: {customDate}</Text>
            {clientName && <Text fontSize='20px' fontWeight='800'>Cliente</Text>}
            {clientName && <Text>Nombre: {clientName}</Text>}
            {clientNumber && <Text>Numero: {clientNumber}</Text>}
            {ccClient && <Text>CC: {ccClient}</Text>}
          </div>

          <div className='ticket-image'>
            <Image
              alt={''}
              blurDataURL='/images/DEFAULTBANNER.png'
              className='store_image'
              height={200}
              objectFit='scale-down'
              src={src ? src : src ?? '/images/DEFAULTBANNER.png'}
              width={200}
            />
          </div>
          <div className='divider'>
            <div></div>
          </div>
          <Text className='centrado' fontWeight='800'>TICKET DE VENTA</Text>
          <Content>
            <Item>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </Item>
            {data.map((item) => {
              const ProPrice = `${numberFormat(item?.ProPrice)}`
              const unitPrice = `${numberFormat(item?.unitPrice)}`
              return (
                <Item key={item.pId}>
                  <span>{item?.pName || ''}</span>
                  <span>{item?.ProQuantity || 0}</span>
                  <span>{unitPrice || 0}</span>
                  <span>{ProPrice}</span>
                </Item>
              )})}
          </Content>
          {/* <span>Pedido</span>
          <span>{code}</span>
          <Item>
            <Text>FECHA</Text>
            <Text>{customDate}</Text>
            <Text fontWeight='bold'>SUB TOTAL</Text>
            <Text fontWeight='bold'>{(total)}</Text>
          </Item>
          */}
          <div className='wrapper__sub-items'>
            <div className='sub-items'>
              <div className='sub-item__values'>
              </div>
              <div className='sub-item__values'>
                {change &&
               <div className='item--values'>
                 <Text fontWeight='bold'>CAMBIO &nbsp;</Text>
                 <Text fontWeight='bold'>$ {numberFormat(change)}</Text>
               </div>
                }
                {total &&
               <div className='item--values'>
                 <Text fontWeight='bold'>TOTAL &nbsp;</Text>
                 <Text fontWeight='bold'>{total}</Text>
               </div>
                }

              </div>
            </div>
          </div>
          <Text
            align='center'
            as='h3'
            fontWeight='bold'
            justifyContent='center'
            margin='40px 0'
          >
            Gracias por su compra
          </Text>

          <div className='wrapper__arrow_button' style={{ display: 'flex' }}>
            {Array(25).fill('').map((ele, i) => {
              return (
                <div className='arrow_button' key={i} />
              )
            })}
          </div>
        </div>
      </Ticket>
    </ContainerTicket>
  )
}