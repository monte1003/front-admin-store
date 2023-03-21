import React from 'react'
import {
  AwesomeModal,
  Text,
  IconPizza,
  IconCarrot,
  IconFigure
} from 'pkg-components'
import { RippleButton } from '~/components/Ripple'
import { ContainerSuccessInvoice,Tooltip } from './styles'
import { IconDownload, IconSales } from '@/public/icons'
import { BGColor } from '@/public/colors'
import Image from 'next/image'
import { Loading } from '../../../components/Loading'

export const SuccessSaleModal = ({
  code,
  loading = false,
  openCurrentSale,
  products = [],
  setOpenCurrentSale = () => { return },
  handlePrint = () => { return },
  handleDownLoad = () => { return },
  handleCloseModal = () => { return }
}) => {
  const formatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
  const ListFormat = products.map(product => {
    return product?.pName
  }).slice(0, 3)
  const finalListFormat = formatter?.format(ListFormat) || ''
  return (
    <AwesomeModal
      btnConfirm={false}
      customHeight='100%'
      footer={false}
      header={true}
      height='100%'
      onCancel={() => { return setOpenCurrentSale(false) }}
      onHide={() => { return setOpenCurrentSale(false) }}
      show={openCurrentSale}
      size='100%'
      zIndex='9999999'
    >
      {loading && <Loading />}
      <ContainerSuccessInvoice>
        <div style={{ position: 'fixed' }}>
          <IconPizza />
        </div>
        <div className='wrapper__success-invoice'>
          <div className='wrapper__success-invoice__item'>
            <Image
              alt=''
              blurDataURL='/images/invoice.png'
              height={500}
              objectFit='cover'
              placeholder='/images/invoice.png'
              src={'/images/sales.webp'}
              width={500}
            />
            <Text
              color='#717171'
              fontSize='22px'
              margin='10px 0'
            >
                    Tu pedido se ha generado
            </Text>
            <Text
              color='#717171'
              fontFamily='PFont-Light'
              fontSize='20px'
              fontWeight='300'
              margin='10px 0'
            >
              {code}
            </Text>
            <RippleButton onClick={() => { return handleCloseModal() }}>
                Mirar pedido
                &nbsp; &nbsp;
              <IconSales color={BGColor} size={'20px'} />
            </RippleButton>
            <Tooltip className='hiddenInfo'>
              <h2 className='hiddenInfo--title'>
                    Puedes mirar el resumen del pedido y el estado.
              </h2>
              <h3 className='content'>
                  Ya sea {finalListFormat}
                <br /><br />
                  No te canses de vender!
              </h3>
            </Tooltip>
          </div>

          <div className='wrapper__success-invoice__item'>
            <Image
              alt=''
              height={500}
              objectFit='cover'
              placeholder='/images/marketstore.webp'
              src={'/images/marketstore.webp'}
              width={500}
            />
            <RippleButton onClick={() => { return handleDownLoad() }}>
                Descargar
                &nbsp; &nbsp;
              <IconDownload color={BGColor} size={'20px'} />
            </RippleButton>
            <Tooltip className='hiddenInfo'>
              <h2 className='hiddenInfo--title'>
                    Descarga tu pedido en formato PDF.
              </h2>
              <h3 className='content'>
                Ya sea  {finalListFormat}
                <br /><br />
                  No te canses de vender!
              </h3>
            </Tooltip>
          </div>
          <div className='wrapper__success-invoice__item'>
            <Image
              alt=''
              height={500}
              objectFit='cover'
              placeholder='/images/invoice.png'
              src={'/images/invoice.png'}
              width={500}
            />
            <Text
              color='#717171'
              fontFamily='PFont-Light'
              fontSize='22px'
              margin='10px 0'
            >
              Desea imprimir la factura de venta?
            </Text>
            <RippleButton onClick={() => { return handlePrint() }}>
            Imprimir &nbsp; &nbsp;
              <IconDownload color={BGColor} size={'20px'} />
            </RippleButton>
          </div>
        </div>
      </ContainerSuccessInvoice>
      <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
        <IconCarrot />
      </div>
      <div>
        <IconFigure style={{ position: 'fixed', right: '-60px', bottom: '-160px' }} />
      </div>
    </AwesomeModal>
  )
}

SuccessSaleModal.propTypes = {}
