import React, { useState, useContext } from 'react'
import { GET_ALL_CLIENTS } from './queries'
import { updateCache } from '~/utils'
import { InputHooks, Checkbox } from 'pkg-components'
import { RippleButton } from '~/components/Ripple'
import Column from '~/components/common/Atoms/Column'
import { useCreateClient } from 'npm-pkg-hook'
import { Context } from '~/context/Context'
import { Loading } from '~/components/Loading'

export const FormClients = ({
  dataForm,
  errorForm,
  OPEN_MODAL,
  setLoading = () => { return },
  handleSubmit = () => { return },
  setDataValue = () => { return },
  handleChange = () => { return },
  handleEditOneClient = () => { return }
}) => {
  const { sendNotification } = useContext(Context)
  const [createClients, { loading }] = useCreateClient({
    sendNotification
  })
  const [setCheck, setChecker] = useState({
    gender: 1
  })
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
  }

  const handleForm = (e) => {
    handleSubmit({
      event: e,
      action: () => {
        setLoading(true)
        return createClients({
          variables: {
            input: {
              ...dataForm,
              gender: setCheck.gender
            }
          },
          update: (cache, { data: { getAllClients } }) => {
            return updateCache({
              cache,
              query: GET_ALL_CLIENTS,
              nameFun: 'getAllClients',
              dataNew: getAllClients
            })
          }
        }).then((response) => {
          if (response?.errors && response?.errors[0]?.message) {
            sendNotification({
              title: response?.errors[0]?.message,
              description: 'Alerta',
              backgroundColor: 'warning'
            })
          }
          if (!response?.errors[0]?.message === 'El numero de identificación ya existe') {
            OPEN_MODAL.setState(!OPEN_MODAL.state)
            setDataValue({})
            setLoading(false)
          }
        }).catch(() => {
          OPEN_MODAL.setState(!OPEN_MODAL.state)
          setDataValue({})
          setLoading(false)
          return sendNotification({
            title: 'No se pudo crear el cliente, intenta nuevamente', 
            description: 'Error',
            backgroundColor: 'error'
          })
        })
      }
    })
    setLoading(false)
  }
  return (
    <>
      {loading && <Loading />}
      <Column position='relative'>
        <>
          <Checkbox
            checked={!!setCheck?.gender && setCheck?.gender === 1}
            disabled={false}
            id='gender'
            label={setCheck?.gender === 1 ? 'Femenino' : 'Masculino'}
            name='gender'
            onChange={(e) => { return handleCheck(e) }}
            value={setCheck?.gender}
          />
          <input
            name='gender'
            onChange={(e) => { return handleCheck(e) }}
            style={{ backgroundColor: 'transparent', opacity: '0', border: '1px solid', position: 'absolute', top: '5px'}}
            type='checkbox'
            value={setCheck.gender}
          />
        </>
      </Column>
      <Column
        as='form'
        display='flex'
        flexWrap='wrap'
        onSubmit={(e) => {
          e.preventDefault()
          return dataForm.update ? handleEditOneClient() : handleForm(e)
        }}
      >
        <InputHooks
          error={errorForm?.clientName}
          letters
          name='clientName'
          onChange={handleChange}
          onInvalid={() => { return }}
          required
          title='Nombre'
          value={dataForm?.clientName}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.clientLastName}
          letters
          name='clientLastName'
          onChange={handleChange}
          title='Apellido'
          value={dataForm?.clientLastName}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.ClientAddress}
          name='ClientAddress'
          onChange={handleChange}
          title='Dirección'
          value={dataForm?.ClientAddress}
          width={'50%'}
        />
        <InputHooks
          error={errorForm?.ccClient}
          name='ccClient'
          onChange={handleChange}
          title='# Identidad'
          value={dataForm?.ccClient}
          width={'50%'}

        />
        <InputHooks
          error={errorForm?.clientNumber}
          name='clientNumber'
          numeric
          onChange={handleChange}
          title='Numero de celular'
          type='tel'
          value={dataForm?.clientNumber}
          width={'50%'}
        />
        <RippleButton type='submit' widthButton='100% ' >{dataForm.update ? 'Actualizar' : 'Guardar'}</RippleButton>
      </Column>
    </>
  )
}
