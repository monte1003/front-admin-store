import { ListProducts } from 'components/Update/Products/ListProducts'
import { useProductsFood } from 'hooks/useProductsFood'

export default function ProductsDisabled() {
  let search = ''
  const [data, { error, fetchMore, setShowMore, showMore }] = useProductsFood({ search })
  return (<ListProducts
    data={data}
    error={error}
    fetchMore={fetchMore}
    pState={0}
    setShowMore={setShowMore}
    showMore={showMore}
  />)
}
