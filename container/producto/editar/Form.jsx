/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types'
import React from 'react'
import { InputHooks, RippleButton } from 'pkg-components'
import { PColor } from '@/public/colors'
import styled from 'styled-components'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { DisRestaurant } from 'container/PedidosStore/ListPedidos'
import Link from 'next/link'

export const Form = ({
  alt = '',
  src = '',
  errorForm = {},
  getStore = {},
  fileInputRef,
  dataForm = {},
  onFileInputChange = () => { return },
  handleForm = () => { return },
  handleChange = () => { return },
  onTargetClick = () => { return }
}) => {
  return (
    <form onSubmit={(e) => { return handleForm(e) }}>
      <InputHooks
        error={errorForm?.pName}
        name='pName'
        onChange={handleChange}
        required
        title='Nombre del Producto'
        value={dataForm?.pName}
        width={'100%'}
      />
      <InputHooks
        error={errorForm?.ProPrice}
        name='ProPrice'
        numeric
        onChange={handleChange}
        title='Precio'
        value={dataForm?.ProPrice}
        width='100%'
      />
      <InputHooks
        error={errorForm?.ProDescuento}
        name='ProDescuento'
        numeric
        onChange={handleChange}
        title='Descuento'
        value={dataForm?.ProDescuento}
        width='100%'
      />
      <InputHooks
        error={errorForm?.ValueDelivery}
        name='ValueDelivery'
        numeric
        onChange={handleChange}
        title='Costo de envio'
        value={dataForm?.ValueDelivery}
        width='100%'
      />
      <InputHooks
        TypeTextarea={true}
        error={errorForm?.ProDescription}
        name='ProDescription'
        onChange={handleChange}
        title='Description'
        value={dataForm?.ProDescription}
        width='100%'
      />
      {getStore &&
      <DisRestaurant>
        <Link href={`${CLIENT_URL_BASE}delivery/${getStore?.city?.cName?.toLocaleLowerCase()}-${getStore?.department?.dName?.toLocaleLowerCase()}/${getStore?.storeName}/${getStore?.idStore}`}>
          <a target='_blank'>
            <span color={PColor} margin={'0 0 0 10px'} >{getStore?.storeName}</span>
          </a>
        </Link>
      </DisRestaurant>
      }
      <ContentImage >
        <img
          alt={alt}
          onClick={(e) => { return onTargetClick(e) }}
          src={src}
        />
        <Inputdeker
          accept='.jpg, .png'
          id='iFile'
          onChange={(event) => { return onFileInputChange(event) }}
          ref={fileInputRef}
          type='file'
        />
      </ContentImage>
      <RippleButton
        margin='20px auto'
        type='submit'
        widthButton='100%'
      >
      Guardar y salir
      </RippleButton>
    </form>
  )
}

Form.propTypes = {
  alt: PropTypes.string,
  dataForm: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any,
    pName: PropTypes.any
  }),
  errorForm: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any,
    pName: PropTypes.string
  }),
  fileInputRef: PropTypes.any,
  getStore: PropTypes.shape({
    city: PropTypes.shape({
      cName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    department: PropTypes.shape({
      dName: PropTypes.shape({
        toLocaleLowerCase: PropTypes.func
      })
    }),
    idStore: PropTypes.string,
    storeName: PropTypes.string
  }),
  handleChange: PropTypes.func,
  handleForm: PropTypes.func,
  onFileInputChange: PropTypes.func,
  onTargetClick: PropTypes.func,
  src: PropTypes.string
}

const Inputdeker = styled.input`
    padding: 30px;
    border: 1px solid;
    display: none;
`
export const ContentImage = styled.div`
    display: flex;
    width: 100%;
    && > img {
        height: 300px; 
        min-height: 300px; 
        object-fit: cover;
        max-height: 300px; 
        width: 100%; 
    }
`