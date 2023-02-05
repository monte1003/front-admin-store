/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react'

export const Context = createContext()

const Provider = ({ children }) => {
  // STATE
  const router = useRouter()
  const [error, setError] = useState({})
  const [showModalComponent, setShowComponentModal] = useState(null)
  const pathname = router.pathname === '/dashboard/[...name]'

  const handleMenuLateral = index => {
    if (pathname && index === 3) return setShowComponentModal(false) 
    return setShowComponentModal(index === showModalComponent ? false : index) 
  }

  const [show, setShow] = useState(null)

  const handleClick = index => { return setShow(index === show ? false : index) }

  // State to Session
  const [isCompany, setCompany] = useState({})
  // Effects para el Toast
  useEffect(() => {
    !!error?.message &&
      setTimeout(() => { return setError('') }, error.duration || 7000)
  }, [error])
  const [collapsed, setCollapsed] = useState(false)
  // Context to setCompanyLink
  const DataCompany = useMemo(
    () => {
      return {
        isCompany
      }
    },
    [isCompany]
  )
  const setCompanyLink = useCallback(
    sessionValue => { return setCompany(sessionValue) },
    []
  )
  // Verify state
  const [menu, setMenu] = useState(0)
  const [countPedido, setCountPedido] = useState(0)
  const handleMenu = index => { return setMenu(index === menu ? false : index) }
  const initialCompanyState = {
    idStore: undefined
  }
  // Context LastCompany
  const [company, setCompanyId] = useState(initialCompanyState)
  const useCompany = useCallback(idStore => {
    setCompanyId({
      ...company,
      idStore
    })
    if (typeof idStore !== 'undefined') {
      localStorage.setItem('idStore', idStore)
    }
  }, [company])
  useEffect(() => {
    if (localStorage.getItem('idStore') !== company.idStore) {
      setCompanyId({
        ...company,
        idStore: localStorage.getItem('idStore')
      })
    }
  }, [company])

  // Context to session
  const [isSession, setIsSession] = useState()
  const [salesOpen, setSalesOpenModal] = useState(false)
  const setSessionActive = useCallback(
    sessionValue => { return setIsSession(sessionValue) },
    []
  )
  const setSalesOpen = () => {
    setSalesOpenModal(!salesOpen)
    router.push(
      {
        query: {
          ...router.query,
          sale: salesOpen ? '' : 'true'
        }
      },
      undefined,
      { shallow: true }
    )
  }
  useEffect(() => {
    if (router.query.sale === 'true') {
      setSalesOpenModal(true)
    }
    handleMenu(false)
    setCollapsed(false)
    setStatus('close')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (!isSession) {
      setIsSession(null)
    } else {
      setIsSession(isSession)
    }
  }, [isSession])
  const [messagesToast, setMessagesToast] = useState([])

  const sendNotification = ({
    title,
    description,
    backgroundColor
  }) => {
    if (messagesToast.length >= 10) {
      const deleteToast = (id) => {
        const listItemIndex = messagesToast.findIndex((e) => {return e.id === id})
        messagesToast.splice(listItemIndex, 1)
        setMessagesToast([...messagesToast])
      }
      deleteToast(messagesToast[0].id)
    }
    const id = Math.floor(Math.random() * 101 + 1)
    const newMessage = {
      id,
      title,
      backgroundColor,
      description
    }
    setMessagesToast([...messagesToast, newMessage ])
  }
  const authData = useMemo(
    () => {
      return {
        isSession
      }
    },
    [isSession]
  )
  const [alert] = useState(false)
  const initialState = {
    PRODUCT: []
  }
  const product = (state, action) => {
    //   ADD TO CARD
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCard'))
    switch (action.type) {
      case 'ADD_PRODUCT':
        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCart, ...state?.PRODUCT }))
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT: [...state?.PRODUCT, action?.payload]

        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT: state?.PRODUCT?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT: state?.PRODUCT.map((t, idx) => { return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t })
        }
      default:
        return state
    }
  }
  const [state_product_card, dispatch] = useReducer(product, initialState)
  const [hidden, setHidden] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const setStoreChatActive = useCallback(sessionValue => {
    setSelectedStore(sessionValue)
  },
  [selectedStore, hidden]
  )

  const [status, setStatus] = useState('close')


  const value = useMemo(
    () => {
      return {
        error,
        messagesToast,
        setStatus,
        hidden,
        setSelectedStore,
        status,
        setShowComponentModal: handleMenuLateral,
        setSalesOpen,
        salesOpen,
        showModalComponent,
        setHidden,
        selectedStore,
        setStoreChatActive,
        DataCompany,
        // Link
        setCompanyLink,
        setCollapsed,
        setCountPedido,
        countPedido,
        isCompany,
        handleMenu,
        // Menu Ctx
        menu,
        collapsed,
        isSession,
        setIsSession,
        // State login
        authData,
        show,
        setSessionActive,
        sendNotification,
        // UseCompany
        useCompany,
        handleClick,
        company,
        // setAlertBox
        alert,
        // add products
        state_product_card,
        dispatch,
        setAlertBox: err => { return setError(err) }
      }
    },
    [
      alert,
      authData,
      collapsed,
      company,
      countPedido,
      DataCompany,
      error,
      hidden,
      show,
      isCompany,
      isSession,
      menu,
      messagesToast,
      salesOpen,
      selectedStore,
      showModalComponent,
      state_product_card,
      status,
      handleMenu,
      sendNotification,
      setCompanyLink,
      setSalesOpen,
      setSessionActive,
      setShowComponentModal,
      handleClick,
      setStoreChatActive,
      useCompany
    ]
  )

  return <Context.Provider value={value}>
    {children}
  </Context.Provider>
}
const useAuth = () => { return useContext(Context) }

export { Provider as default, useAuth }

