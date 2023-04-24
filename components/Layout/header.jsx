// import { useApolloClient } from '@apollo/client'
import { AwesomeModal } from 'components/AwesomeModal'
import Column from 'components/common/Atoms/Column'
import Text from 'components/common/Atoms/Text'
import Link from 'next/link'
import { useMobile, useTotalSales } from 'npm-pkg-hook'
import styled from 'styled-components'
import { IconLogo, IconSales } from '../../public/icons'
import Row from '../common/Atoms/Row'
import { Hamburguer } from './Burguer'
import { Options } from './options'
import {
  DarkSilver,
  PColor,
  SECBGColor
} from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import { Context } from '~/context/Context'
import useScrollHook, { useScrollColor } from '../hooks/useScroll'


// export const MemoHeader = () => {
//   const style = useScrollHook()
//   const {
//     setSalesOpen,
//     salesOpen,
//     setAlertBox
//   } = useContext(Context)
//   const { client } = useApolloClient()
//   const { scrollNav } = useScrollColor()
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)
//   const location = useRouter()

//   const onClickLogout = useCallback(async () => {
//     setLoading(true)
//     await window
//       .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
//       .then(res => {
//         if (res) {
//           localStorage.removeItem('session')
//           localStorage.removeItem('usuario')
//           localStorage.removeItem('restaurant')
//           client?.clearStore()
//           location.replace('/entrar')
//           setLoading(false)
//         }
//       })
//       .catch(() => {
//         setError(true)
//         setAlertBox({ message: 'Ocurrió un error al cerrar session' })
//       })
//     setLoading(false)
//   }, [client, location, setAlertBox])
//   // useEffect(() => {
//   //   //localStorage.clear();
//   //   manage_crash()
//   //   //Create a windows ID for each windows that is oppened
//   //   let current_window_id = Date.now() + ''//convert to string
//   //   let time_period = 3000//ms
//   //   //Check to see if PageVisibility API is supported or not
//   //   let PV_API = page_visibility_API_check()
//   //   /************************
//   //  ** PAGE VISIBILITY API **
//   //  *************************/
//   //   function page_visibility_API_check ()
//   //   {
//   //     let page_visibility_API = false
//   //     let visibility_change_handler = false
//   //     if ('hidden' in document)
//   //     {
//   //       page_visibility_API = 'hidden'
//   //       visibility_change_handler = 'visibilitychange'
//   //     }
//   //     else
//   //     {
//   //       let prefixes = ['webkit','moz','ms','o']
//   //       //loop over all the known prefixes
//   //       for (const element of prefixes){
//   //         if ((element + 'Hidden') in document)
//   //         {
//   //           page_visibility_API = element + 'Hidden'
//   //           visibility_change_handler = element + 'visibilitychange'
//   //         }
//   //       }
//   //     }
       
//   //     if (!page_visibility_API)
//   //     {
//   //       //PageVisibility API is not supported in this device
//   //       return page_visibility_API
//   //     }
       
//   //     return {'hidden': page_visibility_API, 'handler': visibility_change_handler}
//   //   }
   
//   //   if (PV_API)
//   //   {
//   //     document.addEventListener(PV_API.handler, function(){
//   //       //console.log("current_window_id", current_window_id, "document[PV_API.hidden]", document[PV_API.hidden]);
//   //       if (document[PV_API.hidden])
//   //       {
//   //         //windows is hidden now
//   //         remove_from_active_windows(current_window_id)
//   //         //skip_once = true;
//   //       }
//   //       else
//   //       {
//   //         //windows is visible now
//   //         //add_to_active_windows(current_window_id);
//   //         //skip_once = false;
//   //         check_current_window_status ()
//   //       }
//   //     }, false)
//   //   }
//   //   /********************************************
//   //  ** ADD CURRENT WINDOW TO main_windows LIST **
//   //  *********************************************/
//   //   add_to_main_windows_list(current_window_id)
//   //   //update active_window to current window
//   //   localStorage.active_window = current_window_id
//   //   /**************************************************************************
//   //  ** REMOVE CURRENT WINDOWS FROM THE main_windows LIST ON CLOSE OR REFRESH **
//   //  ***************************************************************************/
//   //   window.addEventListener('beforeunload', function ()
//   //   {
//   //     remove_from_main_windows_list(current_window_id)
//   //   })
//   //   /*****************************
//   //  ** ADD TO main_windows LIST **
//   //  ******************************/
//   //   function add_to_main_windows_list(window_id)
//   //   {
//   //     let temp_main_windows_list = get_main_windows_list()
//   //     let index = temp_main_windows_list.indexOf(window_id)
//   //     if (index < 0)
//   //     {
//   //       //this windows is not in the list currently
//   //       temp_main_windows_list.push(window_id)
//   //     }
//   //     localStorage.main_windows = temp_main_windows_list.join(',')
//   //     return temp_main_windows_list
//   //   }
//   //   /**************************
//   //  ** GET main_windows LIST **
//   //  ***************************/
//   //   function get_main_windows_list()
//   //   {
//   //     let temp_main_windows_list = []
//   //     if (localStorage.main_windows)
//   //     {
//   //       temp_main_windows_list = (localStorage.main_windows).split(',')
//   //     }
//   //     return temp_main_windows_list
//   //   }
//   //   /**********************************************
//   //  ** REMOVE WINDOWS FROM THE main_windows LIST **
//   //  ***********************************************/
//   //   function remove_from_main_windows_list(window_id)
//   //   {
//   //     let temp_main_windows_list = []
//   //     if (localStorage.main_windows)
//   //     {
//   //       temp_main_windows_list = (localStorage.main_windows).split(',')
//   //     }
//   //     let index = temp_main_windows_list.indexOf(window_id)
//   //     if (index > -1) {
//   //       temp_main_windows_list.splice(index, 1)
//   //     }
       
//   //     localStorage.main_windows = temp_main_windows_list.join(',')
       
//   //     //remove from active windows too
//   //     remove_from_active_windows(window_id)
       
//   //     return temp_main_windows_list
//   //   }
   
//   //   /**************************
//   //  ** GET active_windows LIST **
//   //  ***************************/
//   //   function get_active_windows_list()
//   //   {
//   //     let temp_active_windows_list = []
//   //     if (localStorage.actived_windows)
//   //     {
//   //       temp_active_windows_list = (localStorage.actived_windows).split(',')
//   //     }
//   //     return temp_active_windows_list
//   //   }
//   //   /*************************************
//   //  ** REMOVE FROM actived_windows LIST **
//   //  **************************************/
//   //   function remove_from_active_windows(window_id)
//   //   {
//   //     let temp_active_windows_list = get_active_windows_list()
//   //     let index = temp_active_windows_list.indexOf(window_id)
//   //     if (index > -1) {
//   //       temp_active_windows_list.splice(index, 1)
//   //     }
//   //     localStorage.actived_windows = temp_active_windows_list.join(',')
//   //     return temp_active_windows_list
//   //   }
//   //   /********************************
//   //  ** ADD TO actived_windows LIST **
//   //  *********************************/
//   //   function add_to_active_windows(window_id)
//   //   {
//   //     let temp_active_windows_list = get_active_windows_list()
//   //     let index = temp_active_windows_list.indexOf(window_id)
//   //     if (index < 0)
//   //     {
//   //       //this windows is not in active list currently
//   //       temp_active_windows_list.push(window_id)
//   //     }

//   //     localStorage.actived_windows = temp_active_windows_list.join(',')
//   //     return temp_active_windows_list
//   //   }
//   //   /*****************
//   //  ** MANAGE CRASH **
//   //  ******************/
//   //   //If the last update didn't happened recently (more than time_period*2)
//   //   //we will clear saved localStorage's data and reload the page
//   //   function manage_crash()
//   //   {
//   //     if (localStorage.last_update)
//   //     {
//   //       if (parseInt(localStorage.last_update) + (time_period * 2) < Date.now())
//   //       {
//   //         //seems a crash came! who knows!?
//   //         //localStorage.clear();
//   //         localStorage.removeItem('main_windows')
//   //         localStorage.removeItem('actived_windows')
//   //         localStorage.removeItem('active_window')
//   //         localStorage.removeItem('last_update')
//   //         location.reload()
//   //       }
//   //     }
//   //   }
//   //   /********************************
//   //  ** CHECK CURRENT WINDOW STATUS **
//   //  *********************************/
//   //   function check_current_window_status(test)
//   //   {
//   //     manage_crash()
//   //     if (PV_API)
//   //     {
//   //       let active_status = 'Inactive'
//   //       let windows_list = get_main_windows_list()
//   //       let active_windows_list = get_active_windows_list()
//   //       if (windows_list.indexOf(localStorage.active_window) < 0)
//   //       {
//   //         //last actived windows is not alive anymore!
//   //         //remove_from_main_windows_list(localStorage.active_window);
//   //         //set the last added window, as active_window
//   //         localStorage.active_window = windows_list[windows_list.length - 1]
//   //       }
//   //       if (!document[PV_API.hidden])
//   //       {
//   //         //Window's page is visible
//   //         localStorage.active_window = current_window_id
//   //       }
//   //       if (localStorage.active_window === current_window_id) { active_status = 'Active' }
//   //       if (active_status === 'Active')
//   //       {
//   //         window.document.title = 'Active'
//   //         active_windows_list = add_to_active_windows(current_window_id)
//   //       }
//   //       else
//   //       {
//   //         active_windows_list = remove_from_active_windows(current_window_id)
//   //         window.document.title = 'InActive'

//   //       }
//   //       let element_holder = document.getElementById('holder_element')
//   //       if (element_holder?.insertAdjacentHTML) {
//   //         // element_holder?.insertAdjacentHTML('afterbegin', '<div>'+element_holder.childElementCount+') Current Windows is '+ active_status +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+active_windows_list.length+' window(s) is visible and active of '+ windows_list.length +' windows</div>')
//   //       }
//   //     }
//   //     else
//   //     {
//   //       console.log('PageVisibility API is not supported :(')
//   //       //our INACTIVE pages, will remain INACTIVE forever, you need to make some action in this case!
//   //     }
//   //     localStorage.last_update = Date.now()
//   //   }
//   //   //check storage continuously
//   //   setInterval(function(){
//   //     check_current_window_status ()
//   //   }, time_period)
   
//   //   //initial check
//   //   check_current_window_status ()
//   // }, [location])

//   const [timer, setTimer] = useState(0)
//   const [isOn, setIsOn] = useState(false)
//   const [count, { loading: loadingCount }] = useTotalSales()
//   useEffect(() => {
//     let interval
//     if (process.env.NODE_ENV !== 'production' && isOn) {
//       interval = setInterval(() => {return setTimer(timer => {return timer + 1})}, 1000)
//     }
//     window.addEventListener('focus', () => {
//       setIsOn(false)
//       clearInterval(interval)
//       setTimer(0)
//     })
//     window.addEventListener('blur', () => {
//       setIsOn(true)
//     })
//     return () => {
//       clearInterval(interval)
//       window.removeEventListener('focus', () => { return })
//       window.removeEventListener('blur', () => { return })
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <HeaderC scrollNav={scrollNav} style={style} >
//       <div id='holder_element'></div>
//       <AwesomeModal
//         backdrop='static'
//         borderRadius='10px'
//         btnCancel={false}
//         btnConfirm={false}
//         footer={false}
//         header={false}
//         height={'200px'}
//         onCancel={() => { return false }}
//         onHide={() => { return setOpenAlertCloseSessions(!openAlerCloseSessions) }}
//         padding={'30px'}
//         show={openAlerCloseSessions}
//         size='20%'
//         zIndex='9999'
//       >
//         <Column>
//           <Text size='20px'>Tu session terminara pronto</Text>
//         </Column>
//         <button onClick={() => {return setOpenAlertCloseSessions(!openAlerCloseSessions)}}>
//           cancelar
//         </button>
//         <button onClick={() => {return onClickLogout()}}>
//           cerrar session
//         </button>
//       </AwesomeModal>
//       <Row alignItems='center'>
//         {isMobile && <Hamburguer />}
//         &nbsp;
//         &nbsp;
//         <Link href={'/dashboard'}>
//           <a>
//             <IconLogo color={PColor} size={isMobile ? '40px' : '80px'} />
//           </a>
//         </Link>
//       </Row>
//       <CtnItemOps>
//         {!isMobile
//         && <Options
//           error={error}
//           loading={loading}
//           onClickLogout={onClickLogout}
//         />}
//         <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }} style={style}>
//           <IconSales size={30} />
//           <div className='info-sales'>
//             <span>Crear una venta</span>
//             {loadingCount ? <span>Cargando...</span> : <span>Total de ventas hoy  {count}</span>}
//           </div>
//         </HeaderWrapperButton>
//       </CtnItemOps>
//     </HeaderC>
//   )
// }

// export const Header = React.memo(MemoHeader)

// export const CtnItemOps = styled.div`
//   display: flex;
//   width: fit-content;
//   place-content: center;
//   place-items: center;
// `
// export const HeaderWrapperButton = styled.div`
//     display: flex;
//     flex-direction: row;
//     grid-column-gap: 12px;
//     column-gap: 12px;
//     align-items: center;
//     width: max-content;
//     display: flex;
//     align-items: center;
//     position: relative;
//     padding: 8px 12px;
//     border-radius: 200px;
//     transition: background-color .3s ease-in-out;
//     border: 0;
//     cursor: pointer;
//     background-color: ${SECBGColor};
//     margin-left: 30px;
//     &:hover {
//       background-color: ${SECBGColor};
//     }
//     .info-sales {
//     margin: 0 0 0 6px;
//     color: ${DarkSilver};
//     transition: background-color .3s ease-in-out;
//     white-space: nowrap;
//     text-align: left;
//     }
//     span {
//     font-size: .75rem;
//     line-height: 1rem;
//     display: block;
//     }
// `
// export const HeaderC = styled.header`
//     display: flex;
//     height: auto;
//     grid-area: head;
//     background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
//     flex-direction: row;
//     align-items: center;
//     width: 100%;
//     padding: 0 1.2em;
//     display: flex;
//     height: 80px;
//     z-index: 990;
//     justify-content: space-between;
//     box-shadow: inset 0 -1px 0 #dcdcdc;
//     @media (max-width: 992px) {
//       padding: 0 0.2em;
//     }
//     `


export const Header = () => {
  const [count, { loading: loadingCount }] = useTotalSales()
  const style = useScrollHook()
  const {
    setSalesOpen,
    salesOpen,
    setAlertBox
  } = useContext(Context)
  const { client } = useApolloClient()
  const { scrollNav } = useScrollColor()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const location = useRouter()
  const { isMobile } = useMobile()

  const onClickLogout = useCallback(async () => {
    setLoading(true)
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          localStorage.removeItem('session')
          localStorage.removeItem('usuario')
          localStorage.removeItem('restaurant')
          client?.clearStore()
          location.replace('/entrar')
          setLoading(false)
        }
      })
      .catch(() => {
        setError(true)
        setAlertBox({ message: 'Ocurrió un error al cerrar session' })
      })
    setLoading(false)
  }, [client, location, setAlertBox])
  // const [openAlerCloseSessions, setOpenAlertCloseSessions] = useState(false)
  // useEffect(() => {
  //   if (timer >= 300) {
  //     setOpenAlertCloseSessions(true)
  //   }
  //   if (timer >= 700) {
  //     // eslint-disable-next-line
  //     onClickLogout().catch(() => {return console.log('logout cancelled')})
  //   }
  // }, [onClickLogout, timer])

  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <AwesomeModal
        backdrop='static'
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={false}
        footer={false}
        header={false}
        height={'200px'}
        onCancel={() => { return false }}
        onHide={() => { return }}
        padding={'30px'}
        show={false}
        size='20%'
        zIndex='9999'
      >
        <Column>
          <Text size='20px'>Tu session terminara pronto</Text>
        </Column>
        <button onClick={() => { return }}>
          cancelar
        </button>
        <button onClick={() => {return onClickLogout()}}>
          cerrar session
        </button>
      </AwesomeModal>
      <Row alignItems='center'>
        {isMobile && <Hamburguer />}
        &nbsp;
        &nbsp;
        <Link href={'/dashboard'}>
          <a>
            <IconLogo color={PColor} size={isMobile ? '40px' : '80px'} />
          </a>
        </Link>
      </Row>
      <CtnItemOps>
        {!isMobile
        && <Options
          error={error}
          loading={loading}
          onClickLogout={onClickLogout}
        />}
        <HeaderWrapperButton onClick={() => { return setSalesOpen(!salesOpen) }} style={style}>
          <IconSales size={30} />
          <div className='info-sales'>
            <span>Crear una venta</span>
            {loadingCount ? <span>Cargando...</span> : <span>Total de ventas hoy  {count}</span>}
          </div>
        </HeaderWrapperButton>
      </CtnItemOps>
    </HeaderC>
  )
}

export const CtnItemOps = styled.div`
  display: flex;
  width: fit-content;
  place-content: center;
  place-items: center;
`
export const HeaderWrapperButton = styled.div`
    display: flex;
    flex-direction: row;
    grid-column-gap: 12px;
    column-gap: 12px;
    align-items: center;
    width: max-content;
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 12px;
    border-radius: 200px;
    transition: background-color .3s ease-in-out;
    border: 0;
    cursor: pointer;
    background-color: ${SECBGColor};
    margin-left: 30px;
    &:hover {
      background-color: ${SECBGColor};
    }
    .info-sales {
    margin: 0 0 0 6px;
    color: ${DarkSilver};
    transition: background-color .3s ease-in-out;
    white-space: nowrap;
    text-align: left;
    }
    span {
    font-size: .75rem;
    line-height: 1rem;
    display: block;
    }
`
export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0 1.2em;
    display: flex;
    height: 80px;
    z-index: 990;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    @media (max-width: 992px) {
      padding: 0 0.2em;
    }
    `
