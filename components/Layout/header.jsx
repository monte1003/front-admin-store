import {
  useContext,
  useState
} from 'react'
import Link from 'next/link'
import {
  useMobile,
  useTotalSales,
  useLogout
} from 'npm-pkg-hook'
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
  const [onClickLogout] = useLogout({ setAlertBox })
  const { scrollNav } = useScrollColor()
  const [loading] = useState(false)
  const [error] = useState(false)
  const { isMobile } = useMobile()

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