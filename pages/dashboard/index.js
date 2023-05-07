import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'
import Dashboard from '../../container/dashboard'


export default function DASHBOARD({ user, idStore }) {
  const allProps = { user, idStore }
  return <Dashboard {...allProps} />
}

DASHBOARD.propTypes = {
  idStore: PropTypes.any,
  user: PropTypes.any
}

// eslint-disable-next-line
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || '',
          idStore: idStore || '',
          data: {}
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
