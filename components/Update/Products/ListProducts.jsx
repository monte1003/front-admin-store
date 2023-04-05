import { CardProducts } from 'components/CartProduct'
import { RippleButton } from 'components/Ripple'
import { Skeleton } from 'components/Skeleton'
import { Button } from 'pkg-components'
import PropTypes from 'prop-types'
import { InputHook } from './Input'
import {
  ContainerCardProduct,
  ContainerFilter,
  ContentProducts,
  Text,
  WrapperProducts
} from './styled'

export const ListProducts = ({
  onClickClear,
  data,
  organice,
  pState,
  filter,
  OPEN_MODAL_ORGANICE,
  dataFree,
  handleDelete,
  handleChangeFilter,
  search,
  showMore,
  fetchMore,
  loading,
  setShowMore
}) => {
  const isData = data?.length > 0
  return (
    <div>
      <ContentProducts>
        {isData && <Text size='30px'>Lista de productos registrados {pState === 1 ? 'Activos' : 'Desactivados'}</Text>}
        {organice && <ContainerFilter>
          <Button
            fontFamily='PFont-Light'
            fontWeight='300'
            label='Ordenar'
            onClick={() => { return OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }}
          />
          <Button
            fontFamily='PFont-Light'
            fontWeight='300'
            label='Limpio'
            onClick={() => { return onClickClear() }}
          />
          <Button
            fontFamily='PFont-Light'
            fontWeight='300'
            label={data?.length ? `${data?.length} Productos` : 'No hay productos'}
          ></Button>
          <Button
            fontFamily='PFont-Light'
            fontWeight='300'
            label={dataFree?.length ? `${dataFree?.length} Productos con envío gratis` : 'No hay productos con envío gratis'}
          />
        </ContainerFilter>}
        {filter &&
        <>
          <Text size='30px'>Filtrar productos </Text>
          <InputHook
            label='Busca tus productos'
            name='search'
            onChange={handleChangeFilter}
            type='text'
            value={search}
          />
        </>}
        <WrapperProducts className='filter'>
          <ContainerCardProduct>
            {!isData ? <Skeleton height='400' numberObject={8} /> : data?.map(producto => {
              return (
                <CardProducts
                  {...producto}
                  del={true}
                  edit={true}
                  handleDelete={() => {return handleDelete(producto)}}
                  key={producto.pId}
                />
              )
            })}
          </ContainerCardProduct>
        </WrapperProducts>
        {isData && <RippleButton
          margin='20px auto'
          onClick={() => {
            setShowMore(s => { return s + 5 })
            fetchMore({
              variables: { max: showMore, min: 0 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult
                return {
                  productFoodsAll: [...fetchMoreResult.productFoodsAll]

                }
              }
            })
          }}
          widthButton='100%'
        >{loading ? 'Cargando...' : 'CARGAR MÁS'}</RippleButton>}
      </ContentProducts>
    </div>
  )
}

ListProducts.propTypes = {
  OPEN_MODAL_ORGANICE: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  }),
  data: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  dataFree: PropTypes.shape({
    length: PropTypes.any
  }),
  fetchMore: PropTypes.func,
  filter: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleDelete: PropTypes.func,
  loading: PropTypes.any,
  onClickClear: PropTypes.func,
  organice: PropTypes.any,
  pState: PropTypes.number,
  search: PropTypes.any,
  setShowMore: PropTypes.func,
  showMore: PropTypes.any
}
