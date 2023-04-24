/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useApolloClient, useSubscription } from '@apollo/client'
import { AwesomeModal } from 'pkg-components'
import { BtnClose } from 'components/AwesomeModal/styled'
import { usePosition } from 'components/hooks/usePosition'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'
import { LateralModal } from 'container/dashboard/styled'
import { useRouter } from 'next/router'
import { Toast } from 'pkg-components'
import PropTypes from 'prop-types'
import { IconCancel } from 'public/icons'
import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import styled, { css } from 'styled-components'
import { Context } from '../../context/Context'
import { AlertBox } from '../AlertBox'
import { Footer } from './footer'
import { Header } from './header'
import { useConnection, useStore, useGetSale } from 'npm-pkg-hook'
import Aside from './Aside'
import { GET_ALL_PEDIDOS } from 'container/PedidosStore/queries'
import Head from 'next/head'
import { Food } from '~/container/update/Products/food'
import GenerateSales from 'container/Sales'
import { Overline } from '../common/Reusable'
import { Clients } from '~/container/clients'
import { BGColor, PColor } from '@/public/colors'
export const MemoLayout = ({
  children,
  watch,
  settings
}) => {
  const location = useRouter()

  const {
    error,
    setAlertBox,
    sendNotification,
    salesOpen,
    messagesToast,
    showModalComponent,
    setShowComponentModal,
    setSalesOpen
  } = useContext(Context)
  const { latitude, longitude } = usePosition(watch, settings)
  const dataLocation = usePosition(watch, settings)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
    if (latitude) {
      window.localStorage.setItem('latitude', latitude)
      window.localStorage.setItem('longitude', longitude)
      window.localStorage.setItem('location', JSON.stringify(dataLocation))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const NEW_NOTIFICATION = gql`
  subscription {
  newStoreOrder{
    pdpId
    id
    idStore
    pId
    ppState
    pCodeRef
    pPDate
    pSState
    pPStateP
    payMethodPState
    pPRecoger
    totalProductsPrice
    unidProducts
    pDatCre
    pDatMod
  }
}
  `
  const [dataStore] = useStore()
  const [newOrderModal, setNewOrderModal] = useState({
    open: false,
    order: []
  })
  const {
    getOnePedidoStore,
    data: sale,
    error: saleError,
    loading: saleLoading
  } = useGetSale()
  const globalClient = useApolloClient()


  useSubscription(NEW_NOTIFICATION, {
    onError: () => {
      return sendNotification({
        title: 'Error en el pedido',
        description: 'Error',
        backgroundColor: 'error'
      })
    },
    onData: ({ data, client }) => {
      const ourStore = data?.data?.newStoreOrder?.idStore === dataStore?.idStore
      const subscription = client.link.request({
        query: NEW_NOTIFICATION
      }).subscribe({
        next: (data) => {
          if(ourStore){
            console.log('')
          } else{
            subscription.unsubscribe()
          }
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log('Completed')
        }
      })
      if (!ourStore) {
        return subscription.unsubscribe()
      }
      if (ourStore) {
        const { pCodeRef } = data?.data?.newStoreOrder || {}
        getOnePedidoStore({
          variables: {
            pCodeRef: pCodeRef || ''
          }
        })
        location.push(
          {
            query: {
              ...location.query,
              saleId: pCodeRef
            }
          },
          undefined,
          { shallow: true }
        )
        setAlertBox({ message: 'Nuevo pedido', duration: 30000 })
        sendNotification({
          title: 'Pedido',
          description: 'Nuevo pedido',
          backgroundColor: 'success'
        })
      }

    }
  })

  const [connectionStatus, setConnectionStatus] = useState('initial')
  const statusConnection = connectionStatus ? 'Conexión a internet restablecida.' : 'Conexión a internet perdida.'

  useConnection({ setConnectionStatus })
  useEffect(() => {
    if (connectionStatus === 'initial') return
    if (connectionStatus === true) {
      setTimeout(() => {
        setConnectionStatus('initial')
      }, 3500)
    }
    
    sendNotification({
      title: 'Wifi',
      description: statusConnection,
      backgroundColor: !connectionStatus ? 'warning' : 'success'
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus])

  const component = {
    1:  <ScheduleTimings />,
    2: <Clients />,
    3: <Food />
  }
  const width = {
    1: '380px',
    2: '725px',
    3: '75%'
  }

  const height = {
    2: '100%'
  }
  return (
    <>
      <Head>
      </Head>
      <AlertBox err={error} />
      <Main aside={!['/'].find(x => { return x === location.pathname })} >
        <Header />
        <Aside />
        <div style={{ gridArea: 'main', overflowY: 'auto' }}>
          <button
            onClick={() => {
              return sendNotification({ 
                title: Math.floor(Math.random() * 101 + 1), 
                description: 'Esta es la descr',
                backgroundColor: 'error'
              })}
            }
          >WOW</button>
          {children}
          <AwesomeModal
            backdrop='static'
            borderRadius='0'
            btnCancel={true}
            btnConfirm={false}
            customHeight='calc(100vh - 60px)'
            footer={false}
            header={true}
            height='100vh'
            onCancel={() => { return false }}
            onHide={() => { return setSalesOpen(!salesOpen) }}
            padding={0}
            question={true}
            show={salesOpen}
            size='large'
            sizeIconClose='35px'
            title='Crea una venta'
            zIndex='9999'
          >
            <GenerateSales />
          </AwesomeModal>
          <Toast
            autoDelete={true}
            autoDeleteTime={5000}
            position={'bottom-right'}
            toastList={messagesToast}
          />
        </div>
        <Footer />
        <div style={{ gridArea: 'right' }}>
          <Overline
            bgColor='#00000012'
            onClick={() => { return setShowComponentModal(false) }}
            show={showModalComponent}
            zIndex='99990000'
          />
          <LateralModal
            height={height[showModalComponent]}
            open={showModalComponent}
            style={{ width: width[showModalComponent] }}
          >
            <BtnClose onClick={() => { return setShowComponentModal(false) }}>
              <IconCancel size='20px' />
            </BtnClose>
            {component[showModalComponent]}
          </LateralModal>
        </div>
        {/* <Messages /> */}
      </Main>
    </>
  )
}
export const Layout = React.memo(MemoLayout)
MemoLayout.propTypes = {
  children: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}
// https://www.conferecartoes.com.br/blog/portal-do-ifood
const Main = styled.main`
    display: grid;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    grid-template-rows: 75px 2fr;
    grid-template-columns: 180px 1fr;
    grid-template-areas:
    'aside head head head'
    'aside main main right'
    'aside main main right';
    text-align: center;
    grid-gap: 0.25rem;
    /* grid-gap: 10px; */
    @media (max-width: 960px) {
        grid-template-columns: min-content 1fr;
    }
    @media (min-width: 960px) {
        ${props => {
    return !props.aside &&
      css`
                /* grid-template-columns: 1fr; */
                display: flex;
                flex-direction: column;
                height: 100%;
            `}};
    }
`