import {
  useCallback,
  useContext,
  useState
} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useMobile, useTotalSales } from 'npm-pkg-hook'
import { AwesomeModal } from 'components/AwesomeModal'
import Column from 'components/common/Atoms/Column'
import Text from 'components/common/Atoms/Text'
import { Context } from 'context/Context'
import { IconLogo, IconSales } from '../../public/icons'
import Row from '../common/Atoms/Row'
import { PColor } from '../../public/colors'
import { Hamburguer } from './Burguer'
import { Options } from './options'
import useScrollHook, { useScrollColor } from '../hooks/useScroll'
import {
  HeaderC,
  CtnItemOps,
  HeaderWrapperButton
} from './styled'

export const Header = () => {
  const [count, { loading: loadingCount }] = useTotalSales()
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
  const { isMobile } = useMobile()

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
        onHide={() => { return }}
        padding={'30px'}
        show={false}
        size='20%'
        zIndex='9999'
      >
        <Column>
          <Text size='20px'>Tu session terminara pronto</Text>
        </Column>
        <button onClick={() => { return }}>
          cancelar
        </button>
        <button onClick={() => { return onClickLogout() }}>
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
            {loadingCount ? <span>Cargando...</span> : <span>Total de ventas hoy  {count}</span>}
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
  )
}