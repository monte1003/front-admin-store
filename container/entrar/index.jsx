import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import { GoogleLogin } from 'react-google-login'
import {
  Content,
  Form,
  Card,
  Text,
  ButtonSubmit
} from './styled'
import { RippleButton } from '../../components/Ripple'
import {
  BGColor,
  DarkSilver,
  EColor
} from '../../public/colors'
import ActiveLink from '../../components/common/Link'
import fetchJson from '../../components/hooks/fetchJson'
import { useRouter } from 'next/router'
import { getDeviceId } from 'apollo/apolloClient'
import { Context } from 'context/Context'
import Portal from 'components/portal'
import { Facebook, IconGoogleFullColor } from '@/public/icons'
import { LoadEllipsis } from './../../components/LoadingButton/index'

export const Login = () => {
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  const [locationFormat, setLocationFormat] = useState('')
  useEffect(() => {
    const data = window.localStorage.getItem('location')
    setLocation(JSON.parse(data))
  }, [])
  const { latitude, longitude } = location || {}
  const fetchData = async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude}&key=${process.env.REACT_APP_API_KEY_GOOGLE_MAPS}`
    fetch(API)
      .then(response => { return response.json() })
      .then(response => {
        setLocationFormat(response?.results)
      })
      .catch(() => { return })
    return locationFormat ?? locationFormat[0].formatted_address
  }

  const handleLogin = async (response) => {
    await fetchData()
    const device = await getDeviceId()
    window.localStorage.setItem('sessionGoogle', JSON.stringify(response?.profileObj))
    const { name, imageUrl } = response?.profileObj || {}
    const body = {
      name: name,
      username: name,
      lastName: name,
      email: 'juvi69elpapu@gmail.com',
      password: '109872394149172618249',
      locationFormat: locationFormat[0]?.formatted_address,
      useragent: window.navigator.userAgent,
      deviceid: device,
      imageUrl: imageUrl
    }
    setLoading(true)
    await fetchJson(`${process.env.URL_BASE}api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => {
      setAlertBox({ message: `${res.message}`, color: 'success' })
      const { storeUserId, token } = res
      const { idStore, id } = storeUserId || {}
      if (storeUserId) {
        localStorage.setItem('restaurant', idStore)
        localStorage.setItem('usuario', id)
        localStorage.setItem('usuario', token)
        localStorage.setItem('session', token)
        router.push('/restaurante/getDataVerify')
      } else {
        router.push('/restaurante/getDataVerify')
      }
    }).catch(() => {
      setAlertBox({ message: 'Lo sentimos ha ocurrido un error', color: 'error' })
    }).finally(() => {
      setLoading(false)
    })
  }
  const responseGoogle = async (response) => {
    await fetchData()
    const device = await getDeviceId()
    window.localStorage.setItem('sessionGoogle', JSON.stringify(response?.profileObj))
    const { name, googleId, email, imageUrl } = response?.profileObj || {}
    const body = {
      name: name,
      username: name,
      lastName: name,
      email: email,
      password: googleId,
      locationFormat: locationFormat[0]?.formatted_address,
      useragent: window.navigator.userAgent,
      deviceid: device,
      imageUrl: imageUrl
    }
    setLoading(true)
    await fetchJson(`${process.env.URL_BASE}api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(res => {
      setAlertBox({ message: `${res.message}`, color: 'success' })
      const { storeUserId, token } = res
      const { idStore, id } = storeUserId || {}
      if (storeUserId) {
        localStorage.setItem('restaurant', idStore)
        localStorage.setItem('usuario', id)
        localStorage.setItem('usuario', token)
        localStorage.setItem('session', token)
        router.push('/restaurante/getDataVerify')
      } else {
        router.push('/restaurante/getDataVerify')
      }
    }).catch(() => {
      setAlertBox({ message: 'Lo sentimos ha ocurrido un error', color: 'error' })
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    router.prefetch('/dashboard')
  }, [router])
  const showDevelop = process.env.NODE_ENV === 'development'

  return (
    <Portal selector={'portal'}>
      <Content>
        <Card>
        </Card>
        <Form>
          <span id='kind'></span>
          <Text size='30px'>¡Falta poco para saciar tu hambre!</Text>
          <Text size='15px'>¿Cómo deseas continuar?</Text>
          <ButtonSubmit
            color='1'
            // disabled={renderProps.disabled}
            height='40px'
            onClick={responseGoogle}
            size='14px'
            type='button'
          >
            <Facebook color={BGColor} size='30px' />
            Login
            <div style={{ width: 'min-content' }} /> 
          </ButtonSubmit>
          <ButtonSubmit
            color='2'
            colorFont={DarkSilver}
            height='40px'
            onClick={(e) => {
              e.preventDefault()
              return handleLogin()
            }}
            size='14px'
          >
            <IconGoogleFullColor size='30px' />  {loading ? <LoadEllipsis /> : 'Continue with Google false'}
            <div style={{ width: 'min-content' }} />
          </ButtonSubmit>
          <GoogleLogin
            autoLoad={false}
            clientId='58758655786-u323tp1dpi6broro865rrm488gh4mnpu.apps.googleusercontent.com'
            cookiePolicy={'single_host_origin'}
            onFailure={responseGoogle}
            onSuccess={responseGoogle}
            render={renderProps => {
              return (
                <div>
                  <ButtonSubmit
                    color='2'
                    colorFont={DarkSilver}
                    disabled={renderProps.disabled}
                    height='40px'
                    onClick={renderProps.onClick}
                    size='14px'
                  ><IconGoogleFullColor size='30px' /> Continue with Google<div style={{ width: 'min-content' }} /> </ButtonSubmit>
                </div>
              )
            }}
          />
          <ActiveLink activeClassName='active' href='/entrar/email'>
            <a>
              <RippleButton
                bgColor={EColor}
                margin='20px auto'
                type='button'
                widthButton='100%'
              >
                Correo
              </RippleButton>
            </a>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/register'>
            <a>
              <RippleButton
                bgColor={EColor}
                margin='20px auto'
                type='button'
                widthButton='100%'
              >Register</RippleButton>
            </a>
          </ActiveLink>
        </Form>
      </Content>

    </Portal>
  )
}
