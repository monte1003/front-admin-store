import { RegisterUser } from '../../container/user'
export default function RegisterView() { return (<RegisterUser /> ) }

RegisterView.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}