import DashboardStore from 'container/dashboard/store'
import { withIronSessionSsr } from 'iron-session/next'
import Head from 'next/head'
import { cookie, defaultReturnObject } from 'utils'

export default function dashboard () {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <DashboardStore />
      {/* {auth ? <ErrorBoundary message='error' /> : <DashboardStore />} */}
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req, query }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    try {

      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || null,
          auth: idStore !== query.name[1],
          idStore: idStore || null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
