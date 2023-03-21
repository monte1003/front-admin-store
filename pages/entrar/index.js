import ErrorBoundary from '~/components/Error'
import { Login } from '../../container/entrar'

export default function LoginView() {
  return (
    <Login />
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
