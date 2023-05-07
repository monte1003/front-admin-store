/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import { Restaurant } from '../../container/Restaurant'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, decodeToken } from 'utils'

export default function RestaurantView({ user }) {
  const { token } = user || {}
  const userToken = decodeToken(token)
  return <Restaurant userToken={userToken} />
}

RestaurantView.propTypes = {
  user: PropTypes.object
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session || {}
    try {
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

RestaurantView.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}
