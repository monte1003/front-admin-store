import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

export const Ticket = ({ componentRef, dataToPrint }) => {
  const {
    urlLogo,
    date,
    products,
    total,
    storeName,
    ref,
    client,
    change,
    addressStore,
    discount,
    storePhone
  } = dataToPrint || {}
  const {
    ccClient,
    clientName,
    clientNumber
  } = client || {}
  return (
    <Wrapper>
      <div id='ticket_wrapper' ref={componentRef}>
        <div id='ticket_header' style={{ display: 'block', textAlign: 'center' }} >
          <div id='company_name' style={{ fontWeight: 900, fontSize: '26px',textAlign: 'center' }}>{storeName || 'Nombre Empresa'}</div>
          <Image
            alt={storeName || 'ticket'}
            blurDataURL='/images/DEFAULTBANNER.png'
            className='logo'
            height={100}
            objectFit='contain'
            placeholder='blur'
            src={urlLogo ?? '/images/DEFAULTBANNER.png'}
            width={100}
          />
          <div className='center padding' style={{ padding: '10px 0', textAlign: 'center' }}>
            <div id='customer' style={{ textAlign: 'center', fontWeight: 600 }} >Ref de pago: {ref} </div>
            <div id='customer' style={{ textAlign: 'center' }} >Nit: {addressStore} </div>
            <div id='customer' style={{ textAlign: 'center' }} >Direcci&oacute;n: {addressStore} </div>
            <div id='customer' style={{ textAlign: 'center' }}>Fecha: {date}</div>
            <div id='customer' style={{ textAlign: 'center' }}>Telf: {storePhone}</div>
          </div>
          <div className='center padding' style={{ padding: '10px 0', textAlign: 'center' }}>
            <div id='customer' style={{ textAlign: 'center' }} >Cliente: {clientName || 'general'} <br /> CC: {ccClient}</div>
            <div id='customer' style={{ textAlign: 'center' }} >Direcci&oacute;n: Carrera 25 # -12 -44 </div>
            <div id='customer' style={{ textAlign: 'center' }} >Teléfono: {clientNumber}</div>
            <div id='customer' style={{ textAlign: 'center' }} >Vendedor: {storeName}</div>
          </div>
        </div>
        <table id='ticket_items'>
          <tbody>
            <tr style={{ padding: '10px 0' }}>
              <th style={{ width: '20%', textAlign: 'left' }}>Ref</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Cant</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Precio</th>
              <th colSpan='2' style={{ width: '20%', textAlign: 'right' }}>Total</th>
            </tr>
            {products.map((product) => {
              const {
                pName,
                ProQuantity,
                ProPrice,
                unitPrice
              } = product
              return (
                <React.Fragment key={product.pId}>
                  <tr><td colSpan='5'>{pName}</td></tr>
                  <tr style={{ padding: '10px 0' }}>
                    <td></td>
                    <td style={{ textAlign: 'center' }}>{ProQuantity}</td>
                    <td colSpan='2' style={{ textAlign: 'right' }}>$ {unitPrice}</td>
                    <td style={{ textAlign: 'right' }}>$ {ProPrice}</td>
                  </tr>
                  {product?.dataExtra?.length > 0 && product?.dataExtra?.map((extra) => {
                    return (
                      <React.Fragment key={extra.exPid}>
                        <tr><td colSpan='5'>{extra?.extraName || ''}</td></tr>
                        <tr style={{ padding: '10px 0' }}>
                          <td></td>
                          <td style={{ textAlign: 'center' }}>{extra.quantity || 0}</td>
                          <td colSpan='2' style={{ textAlign: 'right' }}>$ {extra?.extraPrice || 0}</td>
                          <td style={{ textAlign: 'right' }}>$ {extra.newExtraPrice}</td>
                        </tr>
                      </React.Fragment>
                    )
                  })}

                  {product?.dataOptional?.length > 0 && product?.dataOptional?.map((extraOptional) => {
                    return (
                      <React.Fragment key={extraOptional.opExPid}>
                        <tr><td colSpan='5' style={{ fontWeight: 'bold' }} >{extraOptional?.OptionalProName || ''}</td></tr>
                        {extraOptional.ExtProductFoodsSubOptionalAll.map((extraOptional) => {
                          return (
                            <React.Fragment key={extraOptional.exPid}>
                              <tr><td colSpan='5'>{extraOptional?.OptionalSubProName || '' || ''}</td></tr>
                              <tr style={{ padding: '10px 0' }}>
                                <td></td>
                                <td style={{ textAlign: 'center' }}>{1}</td>
                                <td colSpan='2' style={{ textAlign: 'right' }}>Gratis</td>
                                <td style={{ textAlign: 'right' }}>$ {0}</td>
                              </tr>
                            </React.Fragment>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>Subtotal</td>
              <td style={{ textAlign: 'right' }}>{total}</td>
            </tr>
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>IVA</td>
              <td style={{ textAlign: 'right' }}>$ 0</td>
            </tr>
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>Método de pago</td>
              <td style={{ textAlign: 'right' }}>{'Efectivo'}</td>
            </tr>
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>Descuento</td>
              <td style={{ textAlign: 'right' }}>{`${discount?.discount || 0} %`}</td>
            </tr>
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>Cambio</td>
              <td style={{ textAlign: 'right' }}>$ {change || 0}</td>
            </tr>
            <tr>
              <td colSpan='4' style={{ textAlign: 'right' }}>Total venta</td>
              <td style={{ textAlign: 'right' }}>{total}</td>
            </tr>
            <tr>
              <td colSpan='5'>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <div className='center'></div>
        <div className='center' style={{ paddingBottom: '-10px', textAlign: 'center' }}>
                    Gracias por su compra                </div>
        <br />
        {/* <div className='center'>Software POS Cloud: Vendty.com</div> */}
        <br />
      </div>
    </Wrapper>

  )
}
const Wrapper = styled.div`
#company_name {
    font-size: 150% !important;
    font-weight: bold;
    text-align: center;
}
.padding {
    margin-top: 20px;
}
#customer {
    justify-content: center;
    display: flex;
}
    #ticket_wrapper {
        font-family: PFont-Regular;
        opacity: 0;
        display: none;
        background-color: #fff;
        width: 40%;
        margin-left: auto;
        margin-right: auto;
        -webkit-box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.4);
    }
    #ticket_header {
        text-align: center;
        display: flex;
        flex-direction: column;
        place-content: center;
    }
    .center {
        text-align: center;
        display: flex;
        flex-direction: column;
        place-content: center;
    }
    #ticket_items {
    position: relative;
    border-collapse: collapse;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
}
table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: gray;
}
#company_almacen {
    position: relative;
    margin-top: 15px;
    margin-bottom: 15px;
}
`