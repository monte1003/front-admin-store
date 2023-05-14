/* eslint-disable no-console */
import Head from 'next/head'
import ErrorBoundary from 'components/Error'
import { Login } from 'container/entrar'

export default function LoginView() {
  return (
    <>
      <Head>
        <script
          async
          defer
          src='https://apis.google.com/js/platform.js'
        />
      </Head>
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
