import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import AuthPassthrough from 'container/services/auth'
import { cookie, defaultReturnObject } from 'utils'

export default function AuthPassthroughPage({ user, idStore }) {

  return (
    <AuthPassthrough idStore={idStore} user={user} />
  )
}

AuthPassthroughPage.propTypes = {
  idStore: PropTypes.any,
  user: PropTypes.any
}

AuthPassthroughPage.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || {},
          idStore: null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)