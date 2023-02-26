/* eslint-disable react-hooks/exhaustive-deps */
import { GET_ALL_SALES_STATISTICS } from 'container/ventas/queries'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Skeleton } from 'components/Skeleton'
import { useLazyQuery } from '@apollo/client'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Flex } from './styled'
import { numberFormat } from '../../utils'

export const SalesWeek = () => {
  const [getAllSalesStoreStatistic, { data, loading }] = useLazyQuery(GET_ALL_SALES_STATISTICS)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const [key, setSetKey] = useState([])
  const [GROUP_BY_DAYS, setGROUP_BY_DAYS] = useState([])
  let suma = 0
  useEffect(() => {
    let dt = new Date()
    getAllSalesStoreStatistic({ variables: { min: 0, fromDate: moment(dt.setDate(dt.getDate() - 30)).format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') } })
    data?.getAllSalesStoreStatistic?.forEach((a) => {
      const { totalProductsPrice } = a || {}
      const sumaFinal = suma += totalProductsPrice
      setTotalProductPrice(sumaFinal)
    })
    if (!loading && data) {
      const GROUP_BY_DAYS = data?.getAllSalesStoreStatistic?.map((elem) => { return elem })?.sort((a, b) => { return moment(a.pDatCre).day() - b }).reduce(function (r, a) {
        r[moment(a.pDatCre).day()] = r[moment(a.pDatCre).day()] || []
        r[moment(a.pDatCre).day()].push(a)
        return r
      }, Object.create(null))
      const dataKeyDays = Object?.keys(GROUP_BY_DAYS)
      setGROUP_BY_DAYS(GROUP_BY_DAYS)
      setSetKey(dataKeyDays)
    }
  }, [data])
  return (
    <React.Fragment>
      {loading ? <Skeleton height={300} margin={'20px 0'} /> :
        <MainCard title={`Últimos 30 Dias $ ${numberFormat(totalProductPrice || 0)}`} weight={'200'}>
          <Text color='#3f3e3e' size='.8em' >{`Media de ventas en los últimos  30 Dias $ ${numberFormat(totalProductPrice || 0)}`}</Text>
          <Container>
            {key?.map((day, i) => {
              let suma = 0
              let sumaNoOrder = 0
              const avg = GROUP_BY_DAYS[day]?.map((x, index) => { return (suma += x.pSState === 4) / (index + 1) })
              avg && ((avg[avg.length - 1]))
              const noOrder = GROUP_BY_DAYS[day]?.map((x, index) => { return (sumaNoOrder += x.pSState === 5) / (index + 1) })
              noOrder && ((noOrder[noOrder.length - 1]))
              return (
                <CardStatistic
                  OrderConcludes={!!avg && ((avg[avg.length - 1])?.toFixed(2))}
                  day={day == 1 ? 'Lunes' : day == 2 ? 'Martes' : day == 3 ? 'Miércoles' : day == 4 ? 'Jueves' : day == 5 ? 'viernes' : day == 6 ? 'Sábado' : 'Domingo'}
                  key={i + 1}
                  noOrder={!!noOrder && ((noOrder[noOrder.length - 1])?.toFixed(2))}
                  sales={GROUP_BY_DAYS[day]?.length}
                />
              )
            })}
          </Container>
        </MainCard>
      }
    </React.Fragment>


  )
}

export const CardStatistic = ({ day, sales, OrderConcludes, noOrder }) => {
  let num = 100
  let rounded = Math.round(num * noOrder) + '%'
  let roundedOrderConcludes = Math.round(num * OrderConcludes) + '%'

  return (
    <WrapperBox>
      <h2>{day || null}</h2>
      <Text
        color='#3f3e3e'
        margin='10px 0'
        size='1.2em'
      >
        Ventas
      </Text>
      <Text color='#3f3e3e' size='2em' >{sales || 0}</Text>
      <Orders>
        <Flex>
          <Text size='.8em'>Pedidos concluidos</Text>
          <Text align='end' size='1em'>{roundedOrderConcludes}</Text>
        </Flex>
        <Flex>
          <Text size='.8em'>Cancelados</Text>
          <Text align='end' size='1em'>{rounded}</Text>
        </Flex>
      </Orders>
    </WrapperBox>

  )
}

CardStatistic.propTypes = {
  OrderConcludes: PropTypes.any,
  day: PropTypes.any,
  noOrder: PropTypes.any,
  sales: PropTypes.number
}

const Orders = styled.div`
    border-top: 1px solid #3f3e3e17;
    margin-top: 4px;
    padding-top: 10px;

`
const Text = styled.h3`
    margin: 0;
    color: #3f3e3e;
    font-size: ${({ size }) => { return size || '1.5rem' }};
    text-align:  ${({ align }) => { return align || 'start' }};
    height: min-content;
    ${({ lineHeight }) => { return lineHeight && css`line-height: ${lineHeight};` }}
    font-weight: 400;
    ${({ weight }) => { return weight && css`font-weight: ${weight};` }}
    ${({ padding }) => { return padding && css`padding: ${padding};` }}
    margin: ${({ margin }) => { return margin || '0' }};
    color: ${({ color }) => { return color || '#3f3e3e   ' }};
    font-family: ${({ font }) => { return font || 'PFont-Light' }};
    word-break: break-word;
`
const WrapperBox = styled.div`
  background-color: #fafafa;
  border-radius: 5%;
  padding: 0.5em;
  h2 {
    line-height: 1.15;
    font-size: .899rem;
    text-align: start;
    height: min-content;
    font-weight: 400;
    font-weight: 200;
    margin: 0;
    color: #3f3e3e;
    display: flex;
    font-family: PFont-Light;
    word-break: break-word;
  }
`
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    width: 90%;
    grid-gap: 19px 12px;     
    height: 100%;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-bottom: 1px solid #3f3e3e69;
    &:last-child {
      
      border-bottom: none;
    }
`