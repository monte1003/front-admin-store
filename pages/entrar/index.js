import Head from 'next/head'
import ErrorBoundary from '~/components/Error'
import { useEffect } from 'react'
import { Login } from '../../container/entrar'

export default function LoginView() {
  const onSuccess = googleUser => {
    console.log('Sessión iniciada')
    const userData = googleUser.getBasicProfile()
    console.log('ID', userData.getId())
    console.log('email', userData.getEmail())
    console.log('name', userData.getName())
    console.log('family name', userData.getFamilyName())
    console.log('Given name', userData.getGivenName())
    console.log('img url', userData.getImageUrl())
  }

  const onFailure = () => {
    alert('No ha sido posible iniciar sesión con google.')
  }

  useEffect(() => {
    console.log('Loading...')
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '767946516609-c7c931djmkgcshqf540rr1qqoluk8639.apps.googleusercontent.com'
        })
        console.log('Api inited')
        window.gapi.load('signin2', () => {
          window.gapi.signin2.render('loginButton', {
            scope: 'profile email',
            width: 240,
            height: 50,
            longtitle: true,
            theme: 'dark',
            onsuccess: onSuccess,
            onfailure: onFailure
          })
        })
      })
    }
  }, [window])
  return (
    <>
      <Head>
        <script
          async
          defer
          src='https://apis.google.com/js/platform.js'
        />
      </Head>
      <div>
        <div id='loginButton'></div>
      </div>
      <Login />
    </>
  )
}

LoginView.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}

LoginView.getErrorBoundary = (page) => {
  return (
    <ErrorBoundary customMessage={'Ocurrió un error en el inicio de session'}>
      {page}
    </ErrorBoundary>
  )
}
