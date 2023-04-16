/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from 'components/Error'
import Noscript from 'components/Noscript'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import PropTypes from 'prop-types'
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useApollo } from '../apollo/apolloClient'
import Auth from '../apollo/Auth'
import 'cropperjs/dist/cropper.css'

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
  const getErrorBoundary = Component.getErrorBoundary ?? ((page) => { return <ErrorBoundary>{page}</ErrorBoundary> })

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
  const timerId = useRef()
  // eslint-disabled-next-line
  const onClickLogout = useCallback(async () => {
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          localStorage.removeItem('session')
          localStorage.removeItem('usuario')
          localStorage.removeItem('restaurant')
          router.replace('/entrar')
        }
      })
      .catch(() => {
        return
      })
  }, [router])
  const handleMouseMove = () => {
    clearInterval(timerId.current)
    timerId.current = setInterval(() => {
      // onClickLogout()
    }, 3000)
  }
  useEffect(() => {
    clearInterval(timerId.current)
    timerId.current = setInterval(() => {
      // onClickLogout()
    }, 3000)
  }, [])
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [showChild])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <div onMouseMove={() => { return {} }}>
      <Context>
        <Head>
          <link
            href='/images/favicon.ico'
            rel='icon'
            type='image/x-icon'
          />
          <meta name='theme-color'></meta>
          <link href='/manifest.json' rel='manifest' />
          <link
            href='/images/favicon.ico'
            rel='icon'
            type='image/svg+xml'
          />
          <meta content='#317EFB' name='theme-color'/>
          <link href='/images/favicon.ico' rel='apple-touch-icon'/>
        </Head>
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
        <ProgressBar progress={animating} />
        <ApolloProvider client={apolloClient}>
          <GlobalStyle />
          <Noscript>
          </Noscript>
          {getLayout(
            <Auth>
              {getErrorBoundary(
                <Component {...{ ...pageProps, isMobile: false }} />
              )}
            </Auth>
          )}
        </ApolloProvider >
      </Context>
    </div>
  )


}


// const [isSaved, setIsSaved] = useState(false);
// console.log(isSaved)
// useEffect(() => {
//   function handleKeyDown(event: any): void {
//     if (event.ctrlKey && event.key === "s") {
//       event.preventDefault();
//       setIsSaved(true);
//       setTimeout(() => {
//         setIsSaved(false)
//       }, 2000)
//     }
//   }
//   document.addEventListener("keydown", handleKeyDown);
//   return () => {
//     document.removeEventListener("keydown", handleKeyDown);
//   };
// }, [])

// function MyComponent() {
//   const isCtrlSPressed = useMultiKeyPress("Control", "s");
  
//   useEffect(() => {
//     function handleKeyDown(event) {
//       if (isCtrlSPressed) {
//         event.preventDefault();
//         console.log("Ctrl + S presionado!");
//         // Realizar la acción deseada sin enviar el formulario
//       }
//     }
  
//     window.addEventListener("keydown", handleKeyDown);
  
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isCtrlSPressed]);
  
//   return (
//     <div>
//       <h1>Presiona Ctrl + S para realizar una acción</h1>
//       <input type="text" />
//     </div>
//   );
// }
  
App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node
}
