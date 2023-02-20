import { useApolloClient } from '@apollo/client'
import { Context } from 'context/Context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMobile, useStore } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useContext,
  useState
} from 'react'
import { Overline } from '~/components/common/Reusable'
import { BGColor, PColor } from '../../../public/colors'
import {
  IconHome,
  IconHorario,
  IconLogo,
  IconLogout,
  IconShopping,
  IconUser,
  IconWallet
} from '../../../public/icons'
import ActiveLink from '../../common/Link'
import { ButtonOption } from '../styled'
import { Button } from 'pkg-components'
import {
  AnchorRouter,
  ButtonGlobalCreate,
  Card,
  ContainerAside,
  ContentAction,
  DynamicNav,
  Info,
  LeftNav,
  OptionButton,
  Router
} from './styled'

const MemoAside = () => {
  const { isMobile } = useMobile()
  const { client } = useApolloClient()
  const location = useRouter()
  const pathname = location.pathname === '/dashboard/[...name]'
  const {
    setShowComponentModal,
    countPedido,
    handleClick,
    sendNotification,
    setCollapsed,
    collapsed
  } = useContext(Context)

  const [show, setShow] = useState(false)
  const onClickLogout = useCallback(async () => {
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          // window.localStorage.clear()
          location.replace('/')
        }
      })
      .catch(() => {
        return sendNotification({ title: 'Se ha producido un error.', description: 'Error' })
      })

  }, [client, location])
  const [dataStore, { loading }] = useStore()
  const {
    storeName,
    idStore,
    uState
  } = dataStore || {}
  const handleOpenCreateProduct = () => {
    setShowComponentModal(3)
    handleClick(3)
    setShow(!show)
  }
  return (
    <>
      {isMobile &&
      <Overline
        bgColor='rgba(0,0,0,.4)'
        onClick={() => {return setCollapsed(!collapsed)}}
        show={collapsed}
        zIndex='999'
      />}
      <ContainerAside collapsed={isMobile ? collapsed : false}>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => { return setShow(!show) }}>
              Agregar Nuevo
            </ButtonGlobalCreate>
            <LeftNav show={show}>
              <Info>
                <h2>Productos</h2>
                <Button onClick={() => { return handleOpenCreateProduct() }}>
                  Productos
                </Button>
              </Info>
            </LeftNav>
            {(loading) ? null : (!pathname && <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
              <a>
                <h1 className='title_store'>{storeName}</h1>
              </a>
            </Link>)}
            {pathname &&
                <h1 className='title_store'>{storeName}</h1>
            }
            {uState == 1 &&
            <div className='program_state'>
              <IconLogo color={PColor} size='20px' />
              <h3 className='sub_title_store'>En pausa programada</h3>
            </div>
            }
          </Info>
          <Router>
            <ActiveLink activeClassName='active' href='/dashboard'>
              <AnchorRouter><IconHome size='15px' />Home</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/pedidos'>
              <AnchorRouter>
                <div className='count_pedidos'>{countPedido}</div>
                <IconShopping size='15px' />Pedidos
              </AnchorRouter>
            </ActiveLink>
            <DynamicNav>
              <ActiveLink activeClassName='active' href='/horarios'>
                <AnchorRouter><IconHorario size='15px' />Horarios</AnchorRouter>
              </ActiveLink>
              <ContentAction onClick={() => { return setShowComponentModal(1) }}>
                <IconHorario color={BGColor} size='15px' />
              </ContentAction>
            </DynamicNav>
            <ActiveLink activeClassName='active' href='/ventas'>
              <AnchorRouter><IconShopping size='15px' />Ventas</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/compras'>
              <AnchorRouter><IconShopping size='15px' />Compras</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/contactos'>
              <AnchorRouter><IconShopping size='15px' />Contactos</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/formas-de-pago'>
              <AnchorRouter><IconShopping size='15px' />Formas de pago</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/informes'>
              <AnchorRouter><IconShopping size='15px' />Informes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/'>
              <AnchorRouter><IconShopping size='15px' />Recomendaciones</AnchorRouter>
            </ActiveLink>

            <ActiveLink activeClassName='active' href='/clientes'>
              <AnchorRouter>  <IconUser size='20px' />Clientes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/billetera'>
              <AnchorRouter>  <IconWallet size='20px' />Billetera</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/categorias'>
              <AnchorRouter>  <IconWallet size='20px' />Categorías</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/employee'>
              <AnchorRouter>  <IconWallet size='20px' />Empleados</AnchorRouter>
            </ActiveLink>
            <OptionButton>
              <ButtonOption onClick={onClickLogout} space>
                <IconLogout color={PColor} size='20px' />
              </ButtonOption>
            </OptionButton>
            {/* {data?.map((m, i) => {
              return (
                <Options
                  active={menu === i}
                  handleClick={() => { return handleClick(i) }}
                  index={i}
                  key={m.mId}
                  label={m.mName}
                  path={m.mPath}
                // icon={<FontAwesomeIcon icon={iconModules[x.mIcon]} color={active === i ? '#a6b0cf' : '#a6b0cf'} size='lg' />}
                >
                  {!!m.subModules && m.subModules.map(sm => {
                    return <ActiveLink
                      href={`/${m.mPath}/${sm.smPath}`}
                      key={sm.smId}
                      onClick={e => { return e.stopPropagation() }}
                    >
                      <AnchorRouter><IconShopping size='15px' />{sm.smName}</AnchorRouter>
                    </ActiveLink>
                  })}
                </Options>

              )
            })} */}
          </Router>
        </Card>
      </ContainerAside>
    </>
  )
}
export default React.memo(MemoAside)

MemoAside.propTypes = {
  handleClickMenu: PropTypes.func,
  closeSession: PropTypes.func,
  filter: PropTypes.func,
  dataForm: PropTypes.object,
  currentUser: PropTypes.object,
  onChange: PropTypes.func,
  allCompany: PropTypes.array,
  dataCompany: PropTypes.object,
  active: PropTypes.bool,
  handleMenu: PropTypes.func
}
