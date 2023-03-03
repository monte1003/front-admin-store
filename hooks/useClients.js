import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_CLIENTS } from 'container/clients/queries'

export const useGetClients = () => {
  const [clientes, setClients] = useState()
  const { loading, error } = useQuery(GET_ALL_CLIENTS, {
    onCompleted: (data) => {
      setClients(data)
    }
  })
  return [clientes?.getAllClients || [], { loading, error }]
}
