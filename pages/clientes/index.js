import Head from 'next/head'
import { Clients } from 'container/clients'
import { withIronSessionSsr } from 'iron-session/next'
import { cookie, defaultReturnObject } from 'utils'

export default function Loyalty() {
  return (
    <>
      <Head>
        <title>Registra un cliente</title>
      </Head>
      <Clients />
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
