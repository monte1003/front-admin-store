import { PColor } from 'public/colors'
import Image from 'next/image'
import {
  useEffect,
  useState,
  memo
} from 'react'
import {
  ActionName,
  ButtonCard,
  InputFile,
  Section,
  MerchantBannerWrapperInfo,
  MerchantInfo,
  MerchantInfoTitle
} from '../styledStore'
import {
  IconDelete,
  IconEdit,
  IconPromo
} from 'public/icons'
import moment from 'moment'
import { Skeleton } from 'components/Skeleton/index'
import {
  useStore,
  useSchedule,
  useBanner,
  useSchedules,
  useImageStore
} from 'npm-pkg-hook'

const Banner = ({ isMobile }) => {
  // STATES
  const [day, setDay] = useState()
  const [Open, setOpen] = useState(false)
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
  } = useImageStore(data?.idStore)
  const [banner, { loading: loadBanner }] = useBanner()
  const [dataSchedule, { loading }] = useSchedule({ day: day })
  const [dataScheduleTow] = useSchedule({ day: day + 1 })
  const [dataSchedules, { loading: lsc }] = useSchedules({ schDay: 1 })
  const { path, bnImageFileName } = banner || {}
  const { schHoSta, schHoEnd } = dataSchedule || {}
  const { schHoSta: dateTow } = dataScheduleTow || {}
  const [endDate, setEndDate] = useState(false)
  useEffect(() => {
    (() => {
      const now = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      const hourDate = new Date(`1/1/1999 ${now}`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      let isClose = new Date('1/1/1999 ' + schHoEnd).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      setEndDate(hourDate >= isClose)
    })()
  }, [schHoEnd, schHoSta, dataSchedules])

  useEffect(() => {
    (() => {
      const newArray = dataSchedules?.map((date) => { return { open: date.schHoSta, close: date.schHoEnd } }) || []
      function isOpen(hour) {
        let opened = false
        newArray.forEach(item => {
          let open = new Date('1/1/1999 ' + item.open)
          let close = new Date('1/1/1999 ' + item.close)
          opened = opened || (hour >= open && close >= hour)
        })
        return opened
      }
      const now = moment().format('hh:mm')
      const testHours = [
        `${now}`,
        `${now}`,
        `${now}`,
        `${now}`,
        `${now}`,
        `${now}`,
        `${now}`
      ]
      testHours.forEach(hour => {
        const hourDate = new Date(`1/1/1999 ${hour}`)
        return (hour, isOpen(hourDate) ? 'ABIERTO' : 'CERRADO')
      })


      function dateObj(d) {
        if (!d) return null
        let parts = d.split(/:|\s/)
        let date = new Date()
        if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12
        date.setHours(+parts.shift())
        date.setMinutes(+parts.shift())
        return date
      }
      let now2 = new Date()
      let startDate = dateObj(schHoSta)
      let endDate = dateObj(schHoEnd)
      let open = now2 < endDate && now2 > startDate ? true : false
      setOpen(open)
    })()
  }, [dataSchedules, lsc, schHoEnd, schHoSta])
  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDay()
    setDay(currentDay)
  }, [])
  const isLoading = loadBanner || loaStore || loading
  return (
    <div>
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
          : <MerchantBannerWrapperInfo Open={Open} bannerImage={(path || src) ? `url(${path || src})` : `url('/images/DEFAULTBANNER.png')`} >
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
              <h2 className='merchant-banner__status-title'>{`Restaurante  ${Open ? 'Abierto' : 'Cerrado'}`}</h2>
              {/* {!Open && <h3 className='merchant-banner__status-message'>{`Abre ${endDate && dateTow ? 'mañana' : '' } a las ${dateTow}`}</h3>} */}
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
export const ManageBanner = memo(Banner)
