import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_ONE_STORE } from '~/container/Restaurant/queries'

export const useStore = () => {
  const [store, setStore] = useState([])
  const { loading, error } = useQuery(GET_ONE_STORE, {
    onCompleted: (data) => {
      setStore(data?.getStore)
    }
  })
  return [store || [], { loading, error }]
}