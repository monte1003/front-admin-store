import {
  useFormTools,
  useGetStoreContacts,
  useGetOneUseStoreContacts,
  filterKeyObject,
  useEditOneUseStoreContacts,
  useCreateContacts
} from 'npm-pkg-hook'
import { useSetState } from 'components/hooks/useState'
import { InputHooks, AwesomeModal } from 'pkg-components'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useState } from 'react'
import { Loading } from '../../components/Loading'
import moment from 'moment'
import { GET_ALL_CONTACTS } from './queries'
import { Button, Item, Container } from './styled'
import { updateCache } from 'utils'
import { Formulario } from './formulario'
import ErrorBoundary from '../../components/Error'

export const Contact = () => {
  const OPEN_MODAL = useSetState()
  const [showMoreContact, setShowMoreContacts] = useState(100)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()

  const [data, { loading, error, fetchMore: fetchMoreContacts }] = useGetStoreContacts({
    max: showMoreContact,
    search: dataForm.search || ''
  })
  const [createContacts, { loading: loadingDelContact, error: errorDelContact }] = useCreateContacts()
  const [editOneContacts, { loading: loadingEditContact, error: errorEditContact }] = useEditOneUseStoreContacts()
  const [getOneContacts] = useGetOneUseStoreContacts()

  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      if (dataForm.update) {
        const updateNewContact = filterKeyObject(dataForm, ['update', '__typename'])
        return editOneContacts({
          variables: {
            input: {
              updateNewContact
            }
          }, update: (cache, { data: { getAllContacts } }) => {return updateCache({
            cache,
            query: GET_ALL_CONTACTS,
            nameFun: 'getAllContacts',
            dataNew: getAllContacts
          })}
        })
      }
      return createContacts({
        variables: {
          input: {
            ...dataForm
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

  const handleGetOne = (contactId) => {
    getOneContacts({
      variables: {
        contactId
      }
    }).then((response) => {
      OPEN_MODAL.setState(!OPEN_MODAL.state)
      const responseClient = response?.data?.getOneContacts || {}
      setDataValue({ ...responseClient, update: true})
    })
  }
  if (error || errorDelContact || errorEditContact) {
    return <ErrorBoundary customMessage='error' />
  }
  return (
    <Container>
      {(loading || loadingDelContact || loadingEditContact) && <Loading />}
      <Formulario />
      <RippleButton
        onClick={() => {
          setDataValue({})
          return OPEN_MODAL.setState(!OPEN_MODAL.state)}
        }
      >
        Crear nuevo
      </RippleButton>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        customHeight='calc(50vh - 100px)'
        footer={false}
        header={true}
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='small'
        zIndex='9999'
      >
        <form onSubmit={(e) => {return handleForm(e)}} style={{ display: 'flex' }}>
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
            error={errorForm?.cntName}
            name='cntNumberPhone'
            onChange={handleChange}
            required
            title='Numero de celular'
            value={dataForm?.cntNumberPhone}
            width={'100%'}
          />
          <InputHooks
            error={errorForm?.cntComments}
            name='cntComments'
            onChange={handleChange}
            title='Comentario'
            value={dataForm?.cntComments}
            width={'100%'}
          />
          <RippleButton type='submit' widthButton='100%' >{dataForm.update ? 'Actualizar' : 'Crear'}</RippleButton>
        </form>
      </AwesomeModal>
      <form>
        <InputHooks
          error={errorForm?.search}
          name='search'
          onChange={handleChange}
          title='Nombre'
          value={dataForm?.search}
          width='100%'
        />
      </form>
      <Table
        data={data || []}
        labelBtn='Product'
        renderBody={(dataB, titles) => {return dataB?.map((x, i) => {return <Section
          columnWidth={titles}
          key={i}
          odd
          padding='10px 0'
        >
          <Item>
            <span> {i + 1}</span>
          </Item>
          <Item>
            <span> {x.cntName}</span>
          </Item>
          <Item>
            <span> {x.cntComments}</span>
          </Item>
          <Item>
            <span> {moment(x.createAt).format('DD-MM-YYYY')}</span>
          </Item>
          <Item>
            <span> {x.cntNumberPhone}</span>
          </Item>
          <Item>
            <Button onClick={() => {return handleGetOne(x.contactId)}}>
                            Ver detalles
            </Button>
          </Item>
        </Section>})}}
        titles={[
          { name: '#', justify: 'flex-start', width: '1fr' },
          { name: 'Nombre', key: 'cntName', justify: 'flex-start', width: '1fr' },
          { name: 'Comentario', justify: 'flex-start', width: '1fr' },
          { name: 'Date', justify: 'flex-start', width: '1fr' },
          { name: 'numero', justify: 'flex-start', width: '1fr' },
          { name: '', justify: 'flex-start', width: '1fr' }
        ]}
      />
      <RippleButton
        margin='20px auto'
        onClick={() => {
          setShowMoreContacts(s => {return s + 50})
          fetchMoreContacts({
            variables: { max: showMoreContact, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              if (Array.isArray(prevResult)) {
                let getAllContacts = [...prevResult.getAllContacts]
                return {
                  getAllContacts: [
                    getAllContacts,
                    ...fetchMoreResult.getAllContacts]
                }
              }
            }
          })
        }}
        widthButton='100%'
      > {loading ? '...Cargando' : 'CARGAR MÁS'}</RippleButton>
    </Container>
  )
}
