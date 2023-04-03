import { AwesomeModal } from 'pkg-components'
import { useSetState } from 'components/hooks/useState'
import { RippleButton } from 'components/Ripple'
import {
  Button,
  Item,
  Container
} from './styled'
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_ONE_CLIENTS, GET_ALL_CLIENTS } from './queries'
import { updateCache } from 'utils'
import { FormClients } from './Form'
import { Table } from '~/components/Table'
import { useState } from 'react'
import { Section } from '~/components/Table/styled'
import { Loading } from '~/components/Loading'

export const Clients = () => {
  const [deleteClient] = useMutation(DELETE_ONE_CLIENTS)
  const [loading, setLoading] = useState(false)
  const DeleteOneClient = ({ clState, cliId }) => {
    setLoading(true)
    deleteClient({
      variables: {
        clState,
        cliId
      },
      update: (cache, { data: { getAllClients } }) => {
        return updateCache({
          cache,
          query: GET_ALL_CLIENTS,
          nameFun: 'getAllClients',
          dataNew: getAllClients
        })
      }
    }).then(() => {
      setLoading(false)
    }).cath(() => {
      setLoading(false)
    })
  }
  const OPEN_MODAL = useSetState()
  const { data: clients } = useQuery(GET_ALL_CLIENTS)
  return (
    <Container>
      {loading && <Loading /> }
      <div className='header-action'>
        <RippleButton onClick={() => { return OPEN_MODAL.setState(!OPEN_MODAL.state) }}>Crear nuevo</RippleButton>
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
        <FormClients OPEN_MODAL={OPEN_MODAL} setLoading={setLoading} />
      </AwesomeModal>
      <div className='container-list__clients'>
        <Table
          data={clients?.getAllClients?.length > 0 ? clients?.getAllClients : []}
          labelBtn='Product'
          renderBody={(dataB, titles) => {return dataB?.map((client, i) => {
            const {
              cliId,
              clientName,
              clState,
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
                <span> 32432</span>
              </Item>
              <Item>
                <span>{fullDate ?? ''}</span>
              </Item>
              <Item>
                <Button onClick={() => {return DeleteOneClient({ cliId, clState })}}>
                      Eliminar
                </Button>
              </Item>
            </Section>})}}
          titles={[
            { name: '#', justify: 'flex-start', width: '1fr' },
            { name: 'Nombre', key: 'clientName', justify: 'flex-start', width: '1fr' },
            { name: 'Apellido', key: 'clientLastName', justify: 'flex-start', width: '1fr' },
            { name: 'Comentario', justify: 'flex-start', width: '1fr' },
            { name: 'Date', justify: 'flex-start', width: '1fr' },
            { name: '', justify: 'flex-start', width: '1fr' }
          ]}
        />
      </div>
    </Container>
  )
}
