import React, { useState } from 'react'
import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { ListPedidos } from './ListPedidos'
import Tabs from 'components/Tabs'
import { useOrders } from 'hooks/useOrders'
import { useFormTools } from 'components/BaseForm'

const PedidosStoreOld = () => {
  // STATES
  const [
    handleChange,
    handleSubmit,
    setDataValue,
    { dataForm, errorForm, setForcedError }
  ] = useFormTools()
  const [more, setMore] = useState(100)
  const ACEPTA_STATUS_ORDER = 0
  const PROCESSING_STATUS_ORDER = 2
  const READY_STATUS_ORDER = 3
  const CONCLUDES_STATUS_ORDER = 4
  const RECHAZADOS_STATUS_ORDER = 5

  const [data, { loading: a, fetchMore }] = useOrders({
    statusOrder: ACEPTA_STATUS_ORDER
  })
  const [dataProgressOrder] = useOrders({
    statusOrder: PROCESSING_STATUS_ORDER
  })
  const [dataReadyOrder] = useOrders({
    statusOrder: READY_STATUS_ORDER
  })
  const [dataConcludes] = useOrders({
    statusOrder: CONCLUDES_STATUS_ORDER
  })
  const [dataRechazados] = useOrders({
    statusOrder: RECHAZADOS_STATUS_ORDER
  })
  return (
    <div>
      <Container>
        <LocationName />
        
        {/* <Column>
        <Row as='form' flexWrap={'wrap'} $draggable={'blue'} draggable={true}>
          <InputHooks
            error={errorForm?.Desde}
            name='Desde'
            onChange={handleChange}
            required
            title='Desde'
            type='date'
            value={dataForm?.Desde}
            width={'20%'}
          />
          <InputHooks
            error={errorForm?.ProDescuento}
            name='ProDescuento'
            onChange={handleChange}
            required
            title='Hasta'
            type='date'
            value={dataForm?.ProDescuento}
            width='20%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            onChange={handleChange}
            required
            title='Numero'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            numeric
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <NewSelect
            id='colorId'
            name='colorId'
            onChange={handleChange}
            optionName='colorName'
            options={[1, 2]}
            title='STATUS'
            value={dataForm?.Color}
            width='33.33%'
          />
          <Column>
          <Button type='submit'>Mas opciones</Button>
          <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
          <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
          </Column>
        </Row>
      </Column> */}
        <Tabs width={['20%', '20%', '20%', '20%', '20%']}>
          <Tabs.Panel label={`Pedidos entrantes (${data?.length || 0})`}>
            {data?.length > 0 ? (
              <ListPedidos
                data={data} 
                dataForm={dataForm}
                errorForm={errorForm}
                fetchMore={fetchMore}
                handleChange={handleChange}
                more={more}
                setMore={setMore}
              />
            ) : (
              <span>No hay datos</span>
            )}
          </Tabs.Panel>
          <Tabs.Panel
            label={`pedidos en progreso (${dataProgressOrder?.length || 0})`}
          >
            {dataProgressOrder?.length > 0 ? (
              <ListPedidos
                data={dataProgressOrder}
                dataForm={dataForm}
                errorForm={errorForm}
                fetchMore={fetchMore}
                handleChange={handleChange}
                more={more}
                setMore={setMore}
              />
            ) : (
              <span>No hay datos</span>
            )}
          </Tabs.Panel>
          <Tabs.Panel
            label={`Pedidos listos para entrega (${
              dataReadyOrder?.length || 0
            })`}
          >
            {dataReadyOrder?.length > 0 ? (
              <ListPedidos
                data={dataReadyOrder}
                dataForm={dataForm}
                errorForm={errorForm}
                fetchMore={fetchMore}
                handleChange={handleChange}
                more={more}
                setMore={setMore}
              />
            ) : (
              <span>No hay Datos</span>
            )}
          </Tabs.Panel>
          <Tabs.Panel label={`Pedidos concluidos (${dataConcludes?.length})`}>
            {dataConcludes?.length > 0 ? (
              <ListPedidos
                data={dataConcludes}
                dataForm={dataForm}
                errorForm={errorForm}
                fetchMore={fetchMore}
                handleChange={handleChange}
                more={more}
                setMore={setMore}
              />
            ) : (
              <span>No hay datos</span>
            )}
          </Tabs.Panel>
          <Tabs.Panel label={`Rechazados (${dataRechazados?.length || 0})`}>
            {dataRechazados?.length > 0 ? (
              <ListPedidos
                data={dataRechazados}
                dataForm={dataForm}
                errorForm={errorForm}
                fetchMore={fetchMore}
                handleChange={handleChange}
                more={more}
                setMore={setMore}
              />
            ) : (
              <span>No hay datos</span>
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </div>
  )
}

PedidosStoreOld.propTypes = {}

export default PedidosStoreOld
