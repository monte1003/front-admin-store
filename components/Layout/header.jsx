import { Context } from 'context/Context'
import Link from 'next/link'
import React, {
  useCallback,
  useContext,
  useEffect,
  useState } from 'react'
import styled from 'styled-components'
import {
  DarkSilver,
  PColor,
  SECBGColor
} from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { IconLogo, IconSales } from '../../public/icons'
import useScrollHook, { useScrollColor } from '../hooks/useScroll'
import { Options } from './options'
import { useRouter } from 'next/router'
import { AwesomeModal } from 'components/AwesomeModal'
import Text from 'components/common/Atoms/Text'
import Column from 'components/common/Atoms/Column'
import { useMobile } from 'npm-pkg-hook'
import { Hamburguer } from './Burguer'
import Row from '../common/Atoms/Row'


export const Header = () => {
  const style = useScrollHook()
  const {
    setSalesOpen,
    salesOpen,
    setAlertBox
  } = useContext(Context)
  const { client } = useApolloClient()
  const { scrollNav } = useScrollColor()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const location = useRouter()

  const onClickLogout = useCallback(async () => {
    setLoading(true)
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          localStorage.removeItem('session')
          localStorage.removeItem('usuario')
          localStorage.removeItem('restaurant')
          client?.clearStore()
          location.replace('/entrar')
          setLoading(false)
        }
      })
      .catch(() => {
        setError(true)
        setAlertBox({ message: 'Ocurrió un error al cerrar session' })
      })
    setLoading(false)
  }, [client, location, setAlertBox])


  const { isMobile } = useMobile()
  const [timer, setTimer] = useState(0)
  const [isOn, setIsOn] = useState(false)
  useEffect(() => {
    let interval
    if (process.env.NODE_ENV !== 'production' && isOn) {
      interval = setInterval(() => {return setTimer(timer => {return timer + 1})}, 1000)
    }
    window.addEventListener('focus', () => {
      setIsOn(false)
      clearInterval(interval)
      setTimer(0)
    })
    window.addEventListener('blur', () => {
      setIsOn(true)
    })
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', () => { return })
      window.removeEventListener('blur', () => { return })
    }
  }, [isOn])
  const [openAlerCloseSessions, setOpenAlertCloseSessions] = useState(false)
  useEffect(() => {
    if (timer >= 300) {
      setOpenAlertCloseSessions(true)
    }
    if (timer >= 700) {
      // eslint-disable-next-line
      onClickLogout().catch(() => {return console.log('logout cancelled')})
    }
  }, [onClickLogout, timer])
  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <AwesomeModal
        backdrop='static'
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        height={'200px'}
        onCancel={() => { return false }}
        onHide={() => { return setOpenAlertCloseSessions(!openAlerCloseSessions) }}
        padding={'30px'}
        show={openAlerCloseSessions}
        size='20%'
        zIndex='9999'
      >
        <Column>
          <Text size='20px'>Tu session terminara pronto</Text>
        </Column>
        <button onClick={() => {return setOpenAlertCloseSessions(!openAlerCloseSessions)}}>
          cancelar
        </button>
        <button onClick={() => {return onClickLogout()}}>
          cerrar session
        </button>
      </AwesomeModal>
      <Row alignItems='center'>
        {isMobile && <Hamburguer />}
        &nbsp;
        &nbsp;
        <Link href={'/dashboard'}>
          <a>
            <IconLogo color={PColor} size={isMobile ? '40px' : '80px'} />
          </a>
        </Link>
      </Row>
      <CtnItemOps>
        {!isMobile
        && <Options
          error={error}
          loading={loading}
          onClickLogout={onClickLogout}
        />}
        <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }} style={style}>
          <IconSales size={30} />
          <div className='info-sales'>
            <span>Crear una venta</span>
            <span>Total de ventas hoy {10}</span>
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
  )
}

export const CtnItemOps = styled.div`
  display: flex;
  width: fit-content;
  place-content: center;
  place-items: center;
`
export const HeaderWrapperButton = styled.div`
    display: flex;
    flex-direction: row;
    grid-column-gap: 12px;
    column-gap: 12px;
    align-items: center;
    width: max-content;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 12px;
    border-radius: 200px;
    transition: background-color .3s ease-in-out;
    border: 0;
    cursor: pointer;
    background-color: ${SECBGColor};
    margin-left: 30px;
    &:hover {
      background-color: ${SECBGColor};
    }
    .info-sales {
    margin: 0 0 0 6px;
    color: ${DarkSilver};
    transition: background-color .3s ease-in-out;
    white-space: nowrap;
    text-align: left;
    }
    span {
    font-size: .75rem;
    line-height: 1rem;
    display: block;
    }
`
export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 1.2em;
    display: flex;
    height: 80px;
    z-index: 990;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    @media (max-width: 992px) {
      padding: 0 0.2em;
    }
    `