import { AwesomeModal } from 'pkg-components'
import { useSetState } from 'components/hooks/useState'
import { RippleButton, InputHooks } from 'pkg-components'
import {
  Button,
  Item,
  Container
} from './styled'
import { GET_ALL_CLIENTS } from './queries'
import { FormClients } from './Form'
import { Table } from 'components/Table'
import { useContext, useState } from 'react'
import { Section } from 'components/Table/styled'
import { Loading } from 'components/Loading'
import {
  useDeleteClients,
  updateCacheMod,
  filterKeyObject,
  useFormTools,
  useGetOneClient,
  useEditClient,
  useGetClients
} from 'npm-pkg-hook'
import { Context } from 'context/Context'

export const Clients = () => {
  const { sendNotification } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools({ sendNotification })
  const [deleteClient, { loading: loadingDelClient }] = useDeleteClients({ sendNotification })
  const [editOneClient, { loading: loadingEditClient }] = useEditClient({ sendNotification })
  const [getOneClients] = useGetOneClient({ sendNotification })
  const OPEN_MODAL = useSetState()
  const [clients, { loading: loadingClients }] = useGetClients({
    max: 100,
    search: dataForm.search
  })

  const handleEditOneClient = () => {
    const updateNewClient = filterKeyObject(dataForm, ['update', '__typename', 'idUser', 'idStore'])
    editOneClient({
      variables: {
        input: {
          ...updateNewClient
        }
      }
    })
  }
  const handleGetOneClient = ({ cliId }) => {
    getOneClients({
      variables: {
        cliId: cliId
      }
    }).then((res) => {
      if (res?.data?.getOneClients) {
        setDataValue({ ...res?.data?.getOneClients, update: true})
        OPEN_MODAL.setState(!OPEN_MODAL.state)
      }
    })
  }
  const handleDeleteOneClient = ({ clState, cliId }) => {
    setLoading(true)
    deleteClient({
      variables: {
        clState,
        cliId
      },
      update: (cache, { data: { deleteClient } }) => {
        return updateCacheMod({
          cache,
          query: GET_ALL_CLIENTS,
          nameFun: 'getAllClients',
          dataNew: deleteClient,
          id: cliId,
          type: 3
        })
      }
    }).then((response) => {
      if (response?.errors && response?.errors[0]?.message) {
        sendNotification({
          title:  'Error',
          description: response?.errors[0]?.message,
          backgroundColor: 'error'
        })
      }
      setLoading(false)
    }).finally(() => {
      setLoading(false)
    })

  }


  return (
    <Container>
      {(loading || loadingDelClient || loadingClients || loadingEditClient) && <Loading /> }
      <div className='header-action'>
        <RippleButton
          onClick={() => {
            setDataValue({})
            return OPEN_MODAL.setState(!OPEN_MODAL.state) 
          }}
        >Crear nuevo</RippleButton>
      </div>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        customHeight='450px'
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='20px'
        show={OPEN_MODAL.state}
        size='medium'
        zIndex='9999'
      >
        <FormClients
          OPEN_MODAL={OPEN_MODAL}
          dataForm={dataForm}
          errorForm={errorForm}
          handleChange={handleChange}
          handleEditOneClient={handleEditOneClient}
          handleSubmit={handleSubmit}
          setDataValue={setDataValue}
          setLoading={setLoading}
        />
      </AwesomeModal>
      <InputHooks
        error={errorForm?.search}
        name='search'
        onChange={handleChange}
        title='Nombre'
        value={dataForm?.search}
        width='100%'
      />
      <div className='container-list__clients'>
        <Table
          data={clients.length > 0 ? clients : []}
          labelBtn='Product'
          renderBody={(dataB, titles) => {return dataB?.map((client, i) => {
            const {
              cliId,
              clientName,
              clState,
              ccClient,
              createAt,
              clientLastName
            } = client
            const dateToFormat = new Date(createAt ?? Date.now())
            const fullDate = dateToFormat.toLocaleDateString('ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
            return <Section
              columnWidth={titles}
              key={cliId}
              odd
              padding='10px 0'
            >
              <Item>
                <span> {i + 1}</span>
              </Item>
              <Item>
                <span>{clientName}</span>
              </Item>
              <Item>
                <span> {clientLastName}</span>
              </Item>
              <Item>
                <span> {ccClient}</span>
              </Item>
              <Item>
                <span>{fullDate ?? ''}</span>
              </Item>
              <Item>
                <Button onClick={() => {return handleDeleteOneClient({ cliId, clState })}}>
                      Eliminar
                </Button>
              </Item>
              <Item>
                <Button onClick={() => {return handleGetOneClient({ cliId, clState })}}>
                    Ver detalles
                </Button>
              </Item>
            </Section>})}}
          titles={[
            { name: '#', justify: 'flex-start', width: '.5fr' },
            { name: 'Nombre', key: 'clientName', justify: 'flex-start', width: '.5fr' },
            { name: 'Apellido', key: 'clientLastName', justify: 'flex-start', width: '.5fr' },
            { name: 'Comentario', justify: 'flex-start', width: '.5fr' },
            { name: 'Date', justify: 'flex-start', width: '.5fr' },
            { name: '', justify: 'flex-start', width: '.5fr' },
            { name: '', justify: 'flex-start', width: '.5fr' }
          ]}
        />
      </div>
    </Container>
  )
}
