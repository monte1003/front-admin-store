import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFormTools } from 'npm-pkg-hook'
import {
  Container,
  ContainerLeft,
  ContentImage,
  Form
} from './styled'


const Index = () => {
  const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm }] = useFormTools()
  const router = useRouter()
  const handleRedirect = () => {
    router.push('/entrar')

  }
  return (
    <div>
      <Container>
        <ContainerLeft>
          <ContentImage>
            <Image
              alt={'Picture of the author'}
              blurDataURL='/images/sign-in_3f701ac0c6.png'
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              src={'/images/sign-in_3f701ac0c6.png'}
            />
          </ContentImage>
        </ContainerLeft>
        <Form onSubmit={(e) => { return }}>
          <InputHooks
            error={errorForm?.correo}
            name='correo'
            onChange={handleChange}
            required
            title='Correo'
            value={dataForm?.correo}
            width='100%'
          />
          <InputHooks
            error={errorForm?.pass}
            name='pass'
            onChange={handleChange}
            required
            title='pass'
            value={dataForm?.pass}
            width='100%'
          />
          <RippleButton
            margin='20px auto'
            onClick={(e) => {return handleRedirect(e)}}
            widthButton='100%'
          >Login</RippleButton>
          {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
        </Form>
      </Container>
    </div>
  )
}

Index.propTypes = {}

export default Index
export const Home = () => {
  const [handleChange, handleSubmitMain, setDataValue, { dataForm, errorForm }] = useFormTools()

  return (
    <Container>
      <ContainerLeft>
        <ContentImage>
          <Image
            alt={'Picture of the author'}
            blurDataURL='/images/sign-in_3f701ac0c6.png'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            src={'/images/sign-in_3f701ac0c6.png'}
          />
        </ContentImage>
      </ContainerLeft>
      <Form onSubmit={() => { return }}>
        <InputHooks
          error={errorForm?.correo}
          name='correo'
          onChange={handleChange}
          required
          title='Correo'
          value={dataForm?.correo}
          width='100%'
        />
        <InputHooks
          error={errorForm?.pass}
          name='pass'
          onChange={handleChange}
          required
          title='pass'
          value={dataForm?.pass}
          width='100%'
        />
        <RippleButton
          margin='20px auto'
          onClick={() => { return }}
          widthButton='100%'
        >
          Loginsdfsd
        </RippleButton>
        {/* <RippleButton widthButton='100%' margin='20px auto' onClick={() => console.log()}>Login</RippleButton> */}
      </Form>
    </Container>
  )
}
