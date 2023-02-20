/* eslint-disable react-hooks/exhaustive-deps */
import React,
{
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  useLazyQuery,
  useSubscription,
  useMutation,
  useQuery
} from '@apollo/client'
import { useUser } from 'components/hooks/useUser'
import { MessageComp } from 'components/Messages'
import { ContainerContextMessage } from 'components/Messages/styled'
import {
  GET_MESSAGES,
  NEW_MESSAGE,
  SEND_MESSAGES
} from 'gql/Messages'
import { GET_ALL_STORY_ACTIVE_MESSAGE_ORDER } from './queries'
import { Context } from 'context/Context'

export const Messages = () => {
  //ESTADOS
  const { setAlertBox, selectedStore, setStoreChatActive, hidden } = useContext(Context)
  const [show, setShow] = useState(false)
  const [dataUser] = useUser()
  const { id } = dataUser || {}
  const [values, setValues] = useState({})

  const [errors, setErrors] = useState({})
  const [search, setSearch] = useState('')
  const handleChangeFilter = e => {
    setSearch(e.target.value)
  }
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  // QUERIES

  const [getMessages, { data: messageData }] = useLazyQuery(GET_MESSAGES, {
    context: { clientName: 'admin-server' },
    // fetchPolicy: 'network-only',
    onError: err => {return setAlertBox({
      message: `${err}`,
      duration: 10000,
      color: 'warning'
    })}
  })
  const { data: dataStoreActiveOrder } = useQuery(GET_ALL_STORY_ACTIVE_MESSAGE_ORDER, {
    // fetchPolicy: 'network-only'
  })
  const { data: messageDataNew, error: messageError } = useSubscription(NEW_MESSAGE, {
    pollInterval: 10
    // onSubscriptionData: () => {
    // client.writeQuery({
    //     query: GET_MESSAGES,
    //     // data: {
    //     //     ...messageData?.getMessages,
    //     //     getMessages: [
    //     //         ...messageData?.getMessages,
    //     //         newMessage,
    //     //     ]
    //     // }
    // })
    // }
  })
  const [dataMessage, setDataMessage] = useState([])
  useEffect(() => {
    messageData?.getMessages && setDataMessage([...messageData.getMessages])
    if (messageDataNew) {
      setDataMessage([...dataMessage, messageDataNew?.newMessage ])
    }
  }, [messageError, messageDataNew, messageData])

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGES, {
    context: { clientName: 'admin-server' }
    // fetchPolicy: 'cache-and-network',
  })
  //EFECTOS
  useEffect(() => {
    if (selectedStore) {
      getMessages({ variables: { from: selectedStore?.getOneStore?.idStore } })
    }
  }, [selectedStore])

  // HANDLESS
  const input = useRef('')
  const messagesEndRef = useRef('')
  const { content } = values || {}
  useEffect(() => {
    let objDiv = document.getElementById('scroll')
    if (messagesEndRef && objDiv) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      objDiv.scrollTop = objDiv.scrollHeight
    }
  }, [messageData])

  const handleSendMessage = async e => {
    e.preventDefault()
    input.current.focus()
    try {
      if (selectedStore && id && !!content) {
        sendMessage({
          variables: { to: id, content: content }
        }).catch(() => {
          input.current.value = ''
          setValues({})
        }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
      }
    } catch (error) {
      setAlertBox({
        message: error.message,
        duration: 10000,
        color: 'warning'
      })
    }

  }
  // subscription's mensajes
  return (
    <ContainerContextMessage>
      <MessageComp
        data={dataStoreActiveOrder?.getAllStoreActiveChat || []}
        handleChange={handleChange}
        handleChangeFilter={handleChangeFilter}
        handleSendMessage={handleSendMessage}
        hidden={hidden}
        id={id}
        input={input}
        loading={loading}
        messageData={dataMessage || []}
        messagesEndRef={messagesEndRef}
        search={search}
        selectedStore={selectedStore}
        setShow={setShow}
        setStoreChatActive={setStoreChatActive}
        show={show}
        values={values}
      />
    </ContainerContextMessage>
  )
}
