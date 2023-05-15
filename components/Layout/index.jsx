/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import { gql, useSubscription } from '@apollo/client'
import { AwesomeModal, Toast } from 'pkg-components'
import { useConnection, useGetSale } from 'npm-pkg-hook'
import { Context } from 'context/Context'
import { IconCancel } from 'public/icons'
import { usePosition } from 'components/hooks/usePosition'
import { BtnClose } from 'components/AwesomeModal/styled'
import { Overline } from 'components/common/Reusable'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'
import { LateralModal } from 'container/dashboard/styled'
import { Clients } from 'container/clients'
import { Food } from 'container/update/Products/food'
import GenerateSales from 'container/Sales'
import { AlertBox } from '../AlertBox'
import { Footer } from './footer'
import { Header } from './header'
import Aside from './Aside'
import { Main } from './styled'

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
  const dataLocation = usePosition(watch, settings)
  useEffect(() => {
    const { latitude, longitude } = dataLocation
    if (latitude) {
      window.localStorage.setItem('latitude', latitude)
      window.localStorage.setItem('longitude', longitude)
      window.localStorage.setItem('location', JSON.stringify(dataLocation))
    }
    setAlertBox({ message: '', color: 'success' })
    
    // eslint-disable-next-line
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
  const {
    getOnePedidoStore
  } = useGetSale()
  useSubscription(NEW_NOTIFICATION, {
    onError: () => {
      return sendNotification({
        title: 'Error en el pedido',
        description: 'Error',
        backgroundColor: 'error'
      })
    },
    onData: ({ data, client }) => {
      const ourStore = true
      console.log(data)
      const subscription = client.link.request({
        query: NEW_NOTIFICATION
        // setContext: function () {
        //   throw new Error('Function not implemented.')
        // },
        // getContext: function () {
        //   throw new Error('Function not implemented.')
        // }
      }).subscribe({
        next: () => {
          if (ourStore) {
            console.log('')
          } else {
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
        // eslint-disable-next-line
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
    if (connectionStatus) {
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
    1: <ScheduleTimings />,
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
        <title>FoodApp</title>
      </Head>
      <AlertBox err={error} />
      <Main aside={'/' !== location.pathname} >
        <Header />
        <Aside />
        <div style={{ gridArea: 'main', overflowY: 'auto' }}>
          <button
            onClick={() => {
              return sendNotification({
                title: Math.floor(Math.random() * 101 + 1),
                description: 'Esta es la descr',
                backgroundColor: 'error'
              })
            }
            }
          >
            WOW
          </button>
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

MemoLayout.propTypes = {
  children: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}
export const Layout = React.memo(MemoLayout)