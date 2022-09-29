/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react'
import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'npm-pkg-hook'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { useMutation } from '@apollo/client'
import { CREATE_CONTACTS, GET_ALL_CONTACTS } from './queries'
import { Container, GridContainer, StatisticHours } from './styled'
import { updateCache } from 'utils'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'

export const Horarios = () => {
  const OPEN_MODAL = useSetState()
  const [createContacts] = useMutation(CREATE_CONTACTS)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      return createContacts({
        variables: {
          input: {
            cntName: dataForm.cntName,
            cntComments: dataForm?.cntComments
          }
        }, update: (cache, { data: { getAllContacts } }) => {return updateCache({
          cache,
          query: GET_ALL_CONTACTS,
          nameFun: 'getAllContacts',
          dataNew: getAllContacts
        })}
      })
    }
  })}

  return (
    <Container>
      {/* <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton> */}
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='small'
        zIndex='9999'
      >
        <form onSubmit={(e) => {return handleForm(e)}}>
          <InputHooks
            error={errorForm?.cntName}
            name='cntName'
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.cntName}
            width={'100%'}
          />
          <InputHooks
            error={errorForm?.cntComments}
            name='cntComments'
            onChange={handleChange}
            required
            title='Comentario'
            value={dataForm?.cntComments}
            width={'100%'}
          />
          <RippleButton type='submit' widthButton='100%' >Crear</RippleButton>
        </form>
      </AwesomeModal>
      <MainCard size='1em' title={'Escoja los horarios que su restaurante va abrir'}>
        <GridContainer>
          <h2>
                        Recomendaciones de Deliver
          </h2>

        </GridContainer>
      </MainCard>
      <RippleButton margin={'20px 0'} onClick={() => {return OPEN_MODAL.setState(!OPEN_MODAL.state)}}>Adicionar Horario</RippleButton>

      <StatisticHours>
        <div>
          <h2>
                        42h-30m
          </h2>
          <p>Total en semana</p>
        </div>
        <div>
          <h2>
                        42h-30m
          </h2>
          <p>Total en semana</p>
        </div>
        <div>
          <h2>
                        42h-30m
          </h2>
          <p>Total en semana</p>
        </div>
      </StatisticHours>
      <ScheduleTimings />
    </Container>
  )
}
