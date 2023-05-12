import React, { useState } from 'react'
import { LocationName } from 'components/hooks/useLocationName'
import { InputHooks, Button, ErrorBoundary } from 'pkg-components'
import { Container } from './styled'
import { useFormTools,useFormatDate, useStore, useOrdersFromStore } from 'npm-pkg-hook'
import DragOrders from './DragOrders'
import { QuickFiltersButton } from './QuickFiltersButton'
import { IconSearch } from '../../public/icons'
import { Loading } from './../../components/Loading/index'
import { PColor } from '@/public/colors'

const PedidosStore = () => {
  const useFormAndStore = () => {
    const [handleChange, _handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const [dataStore] = useStore()
    const { createdAt } = dataStore || {}
    const { yearMonthDay } = useFormatDate({ date: createdAt })

    return { handleChange, dataForm, errorForm, yearMonthDay, setDataValue }
  }

  const useOrderData = ({ fromDate, toDate, search }) => {
    const [data, { loading, error }] = useOrdersFromStore({ fromDate, toDate, search })

    return [data, { loading, error }]
  }
  const { dataForm, yearMonthDay, handleChange, setDataValue } = useFormAndStore()
  const [valuesDates, setValuesDates] = useState({ fromDate: yearMonthDay, toDate: '' })
  const { fromDate, toDate } = valuesDates

  const [data, { loading, error }] = useOrderData({ fromDate: fromDate, toDate: toDate, search: dataForm.search })

  const onChangeInput = (e) => {
    setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })
  }
  if (error) return <ErrorBoundary />
  return (
    <div>
      {loading && <Loading />}
      <Container>
        <LocationName />
        <div className='quick-filters' style={{ display: 'flex' }}>
          <div className='search-container'>
            <input
              className='search-input'
              name='search'
              onChange={handleChange}
              placeholder='Buscar ordenes'
              type='text'
              value={dataForm.search}
            />
            <IconSearch
              className='search-icon'
              color={PColor}
              size={20}
            />
          </div>
          <QuickFiltersButton
            onClick={() => {
            // handleFilter()
            }}
          />
          <InputHooks
            name='fromDate'
            onChange={onChangeInput}
            title='Desde'
            type='date'
            value={valuesDates?.fromDate}
            width={'20%'}
          />
          <InputHooks
            name='toDate'
            onChange={onChangeInput}
            title='Hasta'
            type='date'
            value={valuesDates?.toDate}
            width='20%'
          />
          <Button
            borderRadius='0'
            onClick={() => {
              setDataValue({
                ...dataForm,
                search: ''
              })
              setValuesDates({
                fromDate: null,
                toDate: null,
                search: ''
              })
            }}
            padding='15px'
          >
          Borrar filtro
          </Button>
        </div>
        <div className='form-container-orders'>
        </div>
        <DragOrders
          data={data.ACEPTA}
          dataConcludes={data.CONCLUDES}
          dataProgressOrder={data.PROCESSING}
          dataReadyOrder={data.READY}
          dataRechazados={data.RECHAZADOS}
        />
      </Container>
    </div>
  )
}

PedidosStore.propTypes = {}

export default PedidosStore
