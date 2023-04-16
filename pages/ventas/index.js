import VentasStores from 'container/ventas'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'

export default function PedidosStoreView() { return (<VentasStores /> ) }

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user,
          idStore: null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)