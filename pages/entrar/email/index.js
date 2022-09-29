import { Email } from '../../../container/entrar/Email'

export default function EmailView() { return (<Email /> ) }

EmailView.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}