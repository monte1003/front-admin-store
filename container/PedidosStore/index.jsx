import React from 'react'
import { LocationName } from 'components/hooks/useLocationName'
import { Container } from './styled'
import { useOrders } from 'hooks/useOrders'
import DragOrders from './DragOrders'

const PedidosStore = () => {
  // STATES
  const ACEPTA_STATUS_ORDER = 1
  const PROCESSING_STATUS_ORDER = 2
  const READY_STATUS_ORDER = 3
  const CONCLUDES_STATUS_ORDER = 4
  const RECHAZADOS_STATUS_ORDER = 5

  const [data] = useOrders({
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
        <DragOrders
          data={data}
          dataConcludes={dataConcludes}
          dataProgressOrder={dataProgressOrder}
          dataReadyOrder={dataReadyOrder}
          dataRechazados={dataRechazados}
        />
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
      </Container>
    </div>
  )
}

PedidosStore.propTypes = {}

export default PedidosStore
