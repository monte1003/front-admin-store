import { ProductEdit } from 'container/producto/editar'
import { useRouter } from 'next/router'
import { ErrorBoundary } from 'pkg-components'

export default function ProductEditView() {
  const location = useRouter()
  const id = location.query.id
  if (!id) return <ErrorBoundary />
  return (<ProductEdit id={id} />)
}