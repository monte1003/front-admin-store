import { gql, useSubscription } from '@apollo/client'
import { AwesomeModal } from 'components/AwesomeModal'
import { BtnClose } from 'components/AwesomeModal/styled'
import { usePosition } from 'components/hooks/usePosition'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'
import { LateralModal } from 'container/dashboard/styled'
import GenerateSales from 'container/Sales'
import { useRouter } from 'next/router'
import { Toast } from 'pkg-components'
import PropTypes from 'prop-types'
import { IconCancel } from 'public/icons'
import React, { useContext, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Context } from '../../context/Context'
import { AlertBox } from '../AlertBox'
import Aside from './Aside'
import { Footer } from './footer'
import { Header } from './header'

export const MemoLayout = ({
  children,
  watch,
  settings
}) => {
  const location = useRouter()
  const {
    error,
    setAlertBox,
    openSchedule,
    setOpenSchedule,
    sendNotification,
    salesOpen,
    messagesToast,
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
  const { data: dataWS } = useSubscription(NEW_NOTIFICATION, {
    onSubscriptionData: ({ subscriptionData }) => {
      setAlertBox({ message: 'Nuevo pedido', duration: 30000 })
      sendNotification({ title: 'Pedido', description: 'Nuevo pedido' })
    }
  })
  // useEffect(() => {
  //   if (dataWS) {
  //     setAlertBox({ message: dataWS?.newNotification, duration: 30000 })
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataWS])

  return (
    <>
      <AlertBox err={error} />
      <Main aside={!['/'].find(x => { return x === location.pathname })} >
        <Header />
        <Aside />
        <div style={{ gridArea: 'main', overflowY: 'auto' }}>
          <button onClick={() => {return sendNotification({ title: Math.floor(Math.random() * 101 + 1), description: 'Esta es la descr' })}}>WOW</button>
          {children}
          <AwesomeModal
            backdrop='static'
            borderRadius='10px'
            btnCancel={true}
            btnConfirm={false}
            footer={false}
            header={true}
            height='100vh'
            onCancel={() => { return false }}
            onHide={() => { return setSalesOpen(!salesOpen) }}
            padding={0}
            question={true}
            show={salesOpen}
            // show={true}
            size='large'
            title='Crea una venta'
            zIndex='9999'
          >
            {salesOpen && <GenerateSales />}
          </AwesomeModal>
          <Toast
            autoDelete={true}
            autoDeleteTime={7000}
            position={'bottom-right'}
            toastList={messagesToast}
          />
        </div>
        <Footer />
        <div style={{ gridArea: 'right' }}>
          <LateralModal openSchedule={openSchedule}>
            <BtnClose onClick={() => { return setOpenSchedule(!openSchedule) }}><IconCancel size='20px' /></BtnClose>
            {openSchedule && <ScheduleTimings />}
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