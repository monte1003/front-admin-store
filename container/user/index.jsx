import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import { RippleButton } from '../../components/Ripple'
import { EColor, PLColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import { IconArrowLeft } from '../../public/icons'
import { useRouter } from 'next/router'
import {
  Content,
  Form,
  Card,
  GoBack
} from './styled'
import { Context } from '../../context/Context'
import fetchJson from '../../components/hooks/fetchJson'
import { URL_BASE } from '../../apollo/urls'
import { decodeToken, hiddenEmail } from 'utils'

export const RegisterUser = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  const body = {
    name: dataForm?.email,
    username: dataForm.email,
    lastName: dataForm.email,
    email: dataForm.email,
    password: dataForm.pass,
    locationFormat: 'galapa',
    useragent: 'window.navigator.userAgent',
    deviceid: '234232342423423asdasd'
  }
  const handleForm = (e) => {return handleSubmit({
    event: e,
    action: () => {
      return fetchJson(`${URL_BASE}auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(res => {
        setAlertBox({ message: `${res.message}`, color: 'success' })
        const decode = decodeToken(res?.token)
        localStorage.setItem('userlogin', JSON.stringify(decode))
        if (res?.storeUserId) {
          const { idStore, id } = res.storeUserId
          localStorage.setItem('restaurant', idStore)
          localStorage.setItem('usuario', id)
          localStorage.setItem('session', res.token)
          router.push('/dashboard')
        } else {
          router.push('/restaurante')
        }
      })
    },
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })}
  const [email, setEmail] = useState('')
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userlogin')
    const dataUser = JSON.parse(dataLocalStorage) || {}
    setEmail(dataUser.username)
  }, [email])
  return (
    <Content>
      <Card>
      </Card>
      <Form onSubmit={(e) => {return handleForm(e)}}>
        <GoBack onClick={() => {return router.back()}}>
          <IconArrowLeft color={`${PLColor}`} size='25px' />
        </GoBack>
        {email !== '' &&
                    <div>
                      <h2>quieres iniciar session nuevamente con :</h2>
                      <span>{email && hiddenEmail(email)}</span>
                    </div>
        }
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Informa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        <InputHooks
          error={errorForm?.pass}
          name='pass'
          onChange={handleChange}
          required
          title='Informa Contraseña.'
          value={dataForm?.pass}
          width='100%'
        />
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => { return }}
          type='submit'
          widthButton='100%'
        >Correo</RippleButton>
      </Form>
    </Content>
  )
}
