import React from 'react'
import { ContentQuery } from './styled'
import { Button } from 'pkg-components'
import { numberFormat } from 'npm-pkg-hook'

export const ContentQueryCard = ({ 
  day = 'hoy',
  delivery,
  restaurant,
  totalSales
}) => {
  return (
    <ContentQuery>
      <div className='container-card'>
        <div className='card'>
          <div className='card-header'>
            <div className='card-title'>
            Total Pedidos de {day}
            </div>
          </div>
          <div className='card-title'>
            <span>0</span> Pedidos
          </div>
          <div className='card-content__price'>
            <div className='card-price'>
              <span>Deli</span>
            $ {numberFormat(delivery) || '0.00'}
            </div>
            <div className='card-price'>
              <span>Restaurante</span>
            $ {numberFormat(restaurant) || '0.00'}
            </div>

          </div>
        </div>
        <div className='card'>
          <div className='card-header'>
            <div className='card-title'>
                Total
            </div>
          </div>
          <div className='card-title'>
            <span style={{ fontSize: '30px' }}>$ {numberFormat(totalSales) || '0.00'}</span>
          </div>
          <div className='card-price'>
            <Button>Ver mas information</Button>
          </div>
        </div>
      </div>
    </ContentQuery>
  )
}

