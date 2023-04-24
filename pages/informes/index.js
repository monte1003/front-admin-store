import Head from 'next/head'
import { ReportsC } from 'container/reports'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'

export default function Reports() {
  return (
    <>
      <Head>
        <title>Informes</title>
      </Head>
      <ReportsC />
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    try {
      if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
      return {
        props: {
          user: user || null,
          idStore: idStore || null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)
