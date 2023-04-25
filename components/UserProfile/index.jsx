import PropTypes from 'prop-types'
import { ContentInfo } from './style'
import {
  Form,
  Container,
  Card
} from './styled'
import { InputHooks, RippleButton } from 'pkg-components'
import { useFormatDate } from 'npm-pkg-hook'

const UserProfileSettings = ({
  dataForm = {},
  handleSubmit = () => { return },
  onChange = () => { return }
}) => {
  const formatDate = useFormatDate({ date: dataForm?.upDateBir })
  return <div>
    <Container>
      <Card >
        <Form onSubmit={handleSubmit}>
          <InputHooks
            name='upPhone'
            onChange={onChange}
            title='Número de Teléfono'
            value={dataForm?.upPhone || ''}
          />
          <InputHooks
            name='email'
            onChange={onChange}
            value={dataForm?.email || ''}
          />
          <InputHooks
            name='lastName'
            onChange={onChange}
            value={dataForm?.lastName || ''}
          />
          <InputHooks
            name='username'
            onChange={onChange}
            value={dataForm?.username || ''}
          />
          <InputHooks
            name='upDateBir'
            onChange={onChange}
            type='date'
            value={formatDate.yearMonthDay}
          />
          <InputHooks
            name='upAddress'
            onChange={onChange}
            title='dirección'
            type='text'
            value={dataForm?.upAddress}
          />
          <InputHooks
            name='upZipCode'
            onChange={onChange}
            title='Zip Code'
            type='text'
            value={dataForm?.upZipCode}
          />
          <ContentInfo>
            <RippleButton type='submit'>Guardar Cambios</RippleButton>
          </ContentInfo>
        </Form>
      </Card>
    </Container >
  </div>
}

UserProfileSettings.propTypes = {
  dataForm: PropTypes.shape({
    email: PropTypes.string,
    lastName: PropTypes.string,
    upAddress: PropTypes.any,
    upDateBir: PropTypes.any,
    upPhone: PropTypes.string,
    upZipCode: PropTypes.any,
    username: PropTypes.string
  }),
  handleSubmit: PropTypes.any,
  onChange: PropTypes.any
}

export default UserProfileSettings
