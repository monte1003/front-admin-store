/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { ApolloProvider } from '@apollo/client'
import Noscript from 'components/Noscript'
import { useRouter } from 'next/router'
import Script from 'next/script'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useApollo } from '../apollo/apolloClient'
import Auth from '../apollo/Auth'
import { ProgressBar } from '../components/common/Nprogres'
import { Layout as MainLayout } from '../components/Layout'
import Context from '../context/Context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/tokens.css'
import '../styles/globals.css'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const router = useRouter()
  const [animating, setIsAnimating] = useState(false)
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => { return <MainLayout>{page}</MainLayout> })
  useEffect(() => {
    const handleStop = () => {
      setIsAnimating(false)
    }
    router.events.on('routeChangeStart', () => {
      setIsAnimating(true)
    })
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', () => {
        setIsAnimating(true)
      })
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [showChild])
  // useEffect(() => {
  //   setShowChild(true)
  //   if (process.env.NODE_ENV !== 'production') {
  //     document.addEventListener('contextmenu', event => {return event.preventDefault()})
  //     document.onkeydown = (e) => {
  //       // disable F12 key
  //       if (e.key == 123) {
  //         return false
  //       }
  
  //       // disable I key
  //       if (e.ctrlKey && e.shiftKey && e.key == 73) {
  //         return false
  //       }
  
  //       // disable J key
  //       if (e.ctrlKey && e.shiftKey && e.key == 74) {
  //         return false
  //       }
  
  //       // disable U key
  //       if (e.ctrlKey && e.key == 85) {
  //         return false
  //       }
  //     }
  //     return true
  //   }
  //   return true
  // }, [])

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/app/sw.js', {
  //     }).then(function (registration) {
  //       let serviceWorker
  //       if (registration.installing) {
  //         serviceWorker = registration.installing
  //         document.querySelector('#kind').textContent = 'installing'
  //       } else if (registration.waiting) {
  //         serviceWorker = registration.waiting
  //         document.querySelector('#kind').textContent = 'waiting'
  //       } else if (registration.active) {
  //         serviceWorker = registration.active
  //         document.querySelector('#kind').textContent = 'active'
  //       }
  //       if (serviceWorker) {
  //         // logState(serviceWorker.state)
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         serviceWorker.addEventListener('statechange', function (e) {
  //           // logState(e.target.state)
  //         })
  //         // console.log('🚀 ~ file: _app.js ~ line 69 ~ e', e)
  //       }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     }).catch(function (error) {
  //       // console.log('🚀 ~ file: _app.js ~ line 71 ~ useEffect ~ error', error)
  //       // Something went wrong during registration. The service-worker.js file
  //       // might be unavailable or contain a syntax error.
  //     })
  //   } else {
  //     // The current browser doesn't support service workers.
  //     // Perhaps it is too old or we are not in a Secure Context.
  //   }
  //   if ('serviceWorker' in navigator) {
  //     // checkValidServiceWorker('http://localhost:3001/app/sw.js')
  //     window.addEventListener('load', function (config) {
  //       // checkValidServiceWorker()
  //       navigator.serviceWorker.register('/app/sw.js')
  //         .then((registration) => {
  //           // console.log(registration)
  //           // console.log('Service Worker registration successful with scope: ', registration.scope)
  //           registration.onupdatefound = () => {
  //             const installingWorker = registration.installing
  //             if (installingWorker === null) {
  //               return
  //             }
  //             installingWorker.onstatechange = () => {
  //               if (installingWorker.state === 'installed') {
  //                 if (navigator.serviceWorker.controller) {
  //                   // At this point, the updated precached content has been fetched,
  //                   // but the previous service worker will still serve the older
  //                   // content until all client tabs are closed.
  //                   // console.log(
  //                   //   'New content is available and will be used when all ' +
  //                   //   'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
  //                   // )

  //                   // Execute callback
  //                   if (config && config.onUpdate) {
  //                     config.onUpdate(registration)
  //                   }
  //                 } else {
  //                   // At this point, everything has been precached.
  //                   // It's the perfect time to display a
  //                   // "Content is cached for offline use." message.
  //                   // console.log('Content is cached for offline use.')

  //                   // Execute callback
  //                   if (config && config.onSuccess) {
  //                     config.onSuccess(registration)
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         function (err) {
  //           // console.log('Service Worker registration failed: ', err)
  //         }
  //         )
  //     })
  //   }
  //   setShowChild(true)
  // }, [])
  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Context>

      <Script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-59SFH7N');
          `
        }}
        id='afterInteractive'
        strategy='afterInteractive'
      />
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <ProgressBar progress={animating} />
        <Noscript>
        </Noscript>
        {getLayout(<Auth>
          <Component {...{ ...pageProps, isMobile: false }} />
        </Auth>)}
      </ApolloProvider >
    </Context>
  )


}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node
}
