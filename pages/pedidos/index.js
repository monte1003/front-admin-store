import { withIronSessionSsr } from 'iron-session/next'
import PedidosStore from 'container/PedidosStore'
import { cookie, defaultReturnObject } from 'utils'
import React from 'react'

export default function PedidosStoreView () {
  return (
    <>
      <PedidosStore />
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
