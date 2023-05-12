
import { Skeleton } from 'components/Skeleton/index'
import Image from 'next/image'
import {
  useBanner,
  useImageStore,
  useSchedule,
  useSchedules,
  useStore,
  useFormatDate
} from 'npm-pkg-hook'
import { PColor } from 'public/colors'
import {
  IconDelete,
  IconEdit,
  IconPromo
} from 'public/icons'
import React, {
  memo,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Context } from './../../../context/Context'
import {
  ActionName,
  ButtonCard,
  InputFile, MerchantBannerWrapperInfo,
  MerchantInfo,
  MerchantInfoTitle, Section
} from '../styledStore'

const Banner = ({ isMobile }) => {
  // STATES
  const { sendNotification } = useContext(Context)
  const [day, setDay] = useState()
  const [Open, setOpen] = useState('')
  const [openNow, setOpenNow] = useState(false)
  // HOOKS
  const [data, { loading: loaStore }] = useStore()
  const {
    altLogo,
    fileInputRef,
    fileInputRefLogo,
    HandleDeleteBanner,
    handleInputChangeLogo,
    handleUpdateBanner,
    onTargetClick,
    onTargetClickLogo,
    src,
    srcLogo
  } = useImageStore({ idStore: data?.idStore, sendNotification })
  const [banner, { loading: loadBanner }] = useBanner()
  const [dataSchedule, { loading }] = useSchedule({ day: day })
  const [dataScheduleTow] = useSchedule({ day: day >= 6 ? 0 : day })
  const [dataSchedules, { loading: lsc }] = useSchedules({ schDay: 1 })
  const { path, bnImageFileName } = banner || {}
  const { schHoSta, schHoEnd } = dataSchedule || {}
  const { schHoSta: dateTow } = dataScheduleTow || {}
  const { handleHourPmAM } = useFormatDate({ })
  const fullText = 'Pene suela'
  const useAnimationFrame = (callback, start, end, duration = 1000) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const functionRef = React.useRef()
    const delta = Math.abs(start - end)
    const frameCount = Math.ceil(60 * (duration / 1000))
    const iteration = React.useRef(frameCount)
    React.useEffect(() => {
      const animate = (rafId) => {
        if (iteration.current <= 0) {
          cancelAnimationFrame(rafId)
          iteration.current = frameCount
        }
  
        callback(Math.max(delta / iteration.current, 1))
        iteration.current--
      }
  
      if (delta > 0) functionRef.current = requestAnimationFrame(animate)
  
      return () => {return cancelAnimationFrame(functionRef.current)}
    }, [callback, delta, frameCount, iteration])
  }
  const handleMessageHour = (message, open) => {
    setOpen(message)
    setOpenNow(open)
  }
  const Counter = ({ numeral = 0 }) => {
    const [currentValue, setCurrentValue] = React.useState(0)
    const fxOperator = currentValue > numeral ? 'subtraction' : 'addition'
  
    useAnimationFrame(
      (diffValue) => {
        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCurrentValue((prevCount) =>
        {return fxOperator === 'addition'
          ? prevCount + diffValue
          : prevCount - diffValue}
        )
      },
      currentValue,
      numeral,
      300
    )
    return <div>{new Intl.NumberFormat().format(Math.round(currentValue))}</div>
  }
  const useAnimatedText = textMessage => {
    const fullTextRef = useRef(textMessage)
    const [text, setText] = useState('')
    const [index, setIndex] = useState(0)
    useEffect(() => {
      if (index < fullText.length) {
        window.requestAnimationFrame(() => {
        // eslint-disable-next-line
                setText(text => text + fullTextRef.current[index]);
          setIndex(() => {return index + 1})
        })
      }
    }, [index])
    useEffect(() => {
      if(fullText?.current) {
        fullText.current = textMessage
      }
    }, [textMessage])

    return text
  }
  useEffect(() => {
    (() => {
      // https://codereview.stackexchange.com/questions/268899/find-when-the-shop-will-next-open-or-close
      const openings = {
        'openingMon' : `${schHoSta} - ${schHoEnd}`,
        'openingTue' : `${schHoSta} - ${schHoEnd}`,
        'openingWed' : `${schHoSta} - ${schHoEnd}`,
        'openingThu' : `${schHoSta} - ${schHoEnd}`,
        'openingFri' : `${schHoSta} - ${schHoEnd}`,
        'openingSat' : `${schHoSta} - ${schHoEnd}`,
        'openingSun' : `${schHoSta} - ${schHoEnd}`
      }
      let timeToInt = function(text) {
        let hour = parseInt(text.substring(0, 2))
        let minute = parseInt(text.substring(3))
        return hour * 60 + minute
      }
      let set_opening = function (openings) {
        let date = new Date()
        let currentTime = date.getHours() * 60 + date.getMinutes()
        let startDay = date.getDay()
        let dayOfWeek = startDay
        let weekDayLookup = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const days = {
          Monday: 'Lunes',
          Tuesday: 'Martes',
          Wednesday: 'Miércoles',
          Thursday: 'Jueves',
          Friday: 'Viernes',
          Saturday: 'Sabado',
          Sunday: 'Domingo'
        }
        let nextTime = false
        for (; ;) {
          let dayName = weekDayLookup[dayOfWeek % 7]
          let opening = openings && openings['opening' + dayName.substring(0, 3)]
          let timeSpans = opening?.split(';').map(item => {return item.trim()})
          for (let span of timeSpans) {
            let hours = span.split('-').map(item => {return item.trim()})
            if (nextTime == false) {
              let openTime = timeToInt(hours[0])
              let closeTime = timeToInt(hours[1])
              if (currentTime >= openTime && currentTime <= closeTime)
                return handleMessageHour('Abierto Ahora - Cierra a las: ' + hours[1], true)
              nextTime = true
            }
            else {
              if (dayOfWeek === startDay) return handleMessageHour('Cerrado ahora - Abre hoy: ' + days[dayName] + ' ' + handleHourPmAM(schHoSta), false)
              // eslint-disable-next-line
              const openNextDay = (dayOfWeek - startDay == 1 ? 'Mañana' : dayName)
              // eslint-disable-next-line
              const tow = `A las ${dateTow ? dateTow : null}`
              return handleMessageHour(`Cerrado hoy - Abre: ${openNextDay} ${tow}`, false)
            }
          }
          dayOfWeek++
          if (dayOfWeek > 14 || !dateTow || !schHoSta || !schHoEnd)
            return handleMessageHour('Cerrado', false)
        }
      }
      set_opening(openings)
    })()
  }, [dataSchedules, lsc, schHoEnd, schHoSta, dateTow, handleHourPmAM])
  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDay()
    setDay(currentDay)
  }, [])
  // const isLoading = loadBanner || loaStore || loading
  const isLoading = false
  const text = useAnimatedText(fullText)
  const [digit, setDigit] = React.useState(1337)

  return (
    <div>
      {/* <span>{text} </span>
      <div>
        <Counter numeral={digit} />
        <input
          onChange={({ target: { value } }) =>
          {return setDigit(() => {
            return value
          })}
          }
          type='number'
          value={digit}
        />
      </div> */}
      <Section>
        <InputFile
          accept='.jpg, .png'
          id='iFile'
          onChange={handleUpdateBanner}
          ref={fileInputRef}
          type='file'
        />
        <InputFile
          accept='.jpg, .png'
          id='iFile'
          onChange={handleInputChangeLogo}
          ref={fileInputRefLogo}
          type='file'
        />
        {isLoading
          ? <Skeleton height={isMobile ? 118 : 250} />
          : <MerchantBannerWrapperInfo Open={openNow} bannerImage={(path || src) ? `url(${path || src})` : `url('/images/DEFAULTBANNER.png')`} >
            <span>
              <svg
                height={53}
                width={53}
                xmlns='http://www.w3.org/2000/svg'
              >
                <g fill='red' transform='translate(1 1)'>
                  <path d='M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z' />
                  <rect
                    height={1.895}
                    rx={0.947}
                    width={20.514}
                    x={15.243}
                    y={35.105}
                  />
                  <rect
                    height={1.895}
                    rx={0.947}
                    width={10.568}
                    x={20.216}
                    y={30.684}
                  />
                  <path d='M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z' />
                  <path d='M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z' />
                  <path d='M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z' />
                </g>
              </svg>
            </span>
            <div className='merchant-banner__status-description' data-test-id='merchant-banner-status-description'>
              <h2 className='merchant-banner__status-title'>{`Restaurante  ${Open}`}</h2>
            </div>
          </MerchantBannerWrapperInfo>}
        <ButtonCard onClick={() => { return path && bnImageFileName && HandleDeleteBanner() }}>
          <IconDelete color={PColor} size={20} />
          <ActionName >
            Eliminar
          </ActionName>
        </ButtonCard>
        <ButtonCard
          color={1}
          delay='.1s'
          onClick={onTargetClick}
          top={'60px'}
        >
          <IconEdit color={PColor} size={20} />
          <ActionName>
            Editar
          </ActionName>
        </ButtonCard>
        <ButtonCard
          delay='.2s'
          onClick={onTargetClick}
          top={'100px'}
        >
          <IconPromo color={PColor} size={20} />
          <ActionName>
            Subir
          </ActionName>
        </ButtonCard>
        <MerchantInfo >
          {data?.Image ?
            <Image
              alt={altLogo ?? 'logo'}
              className='logo'
              height={70}
              objectFit='contain'
              onClick={(e) => { return onTargetClickLogo(e) }}
              src={data?.Image ?? '/images/DEFAULTBANNER.png'}
              width={70}
            />
            :
            <Image
              alt={altLogo || 'logo'}
              blurDataURL='/images/DEFAULTBANNER.png'
              className='logo'
              height={70}
              objectFit='contain'
              onClick={(e) => { return onTargetClickLogo(e) }}
              placeholder='blur'
              src={srcLogo ?? '/images/DEFAULTBANNER.png'}
              width={70}
            />}
          <MerchantInfoTitle >
            {data?.storeName}
          </MerchantInfoTitle>
        </MerchantInfo>
      </Section>
    </div>
  )
}
export const ManageBanner = memo(Banner, (currentProps, nextProps) => {
  return currentProps.isMobile === nextProps.isMobile
})
