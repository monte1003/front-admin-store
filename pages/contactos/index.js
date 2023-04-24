import { Contact } from 'container/contactos'
import { withIronSessionSsr } from 'iron-session/next'
import Head from 'next/head'
import { cookie, defaultReturnObject } from 'utils'

export default function shopping() {
  return (
    <>
      <Head>
        <title>Contactos</title>
      </Head>
      <Contact />
    </>
  )
}

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