/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import InputHooks from 'components/InputHooks/InputHooks'
import styled from 'styled-components'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useLazyQuery } from '@apollo/client'
import {
  BGColor,
  PLColor,
  SFColor,
  PColor
} from 'public/colors'
import React, { useEffect, useState } from 'react'
import { numberFormat } from '../../utils'
import { GET_ONE_SALES } from './queries'
import { BarChat, HorizontalBarChart } from 'components/Chart'
import { Skeleton } from 'components/Skeleton'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import Button from 'components/common/Atoms/Button'
import {
  useReport,
  useStore,
  useFormTools,
  useGetSale,
  useFormatDate
} from 'npm-pkg-hook'
import { ContainerQuery } from './styled'
import { ContentQueryCard } from './ContentQueryCard'
import { Loading } from '~/components/Loading'
import { ModalDetailOrder } from 'pkg-components'
import { useMobile, useChartData } from 'npm-pkg-hook'
import { useRouter } from 'next/router'

// https://codesandbox.io/s/custom-graph-bar-forked-1v6jk9?file=/src/components/graph/graph.tsx
export const ListVentas = () => {
  let total = 0
  let suma = 0
  let dt = new Date()
  const [more, setMore] = useState(50)
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const [open, setOpen] = useState(false)
  const toDay = useFormatDate({}).yearMonthDay
  const [valuesDates, setValuesDates] = useState({ fromDate: toDay, toDate: toDay })
  const [handleChange, { dataForm, errorForm }] = useFormTools()
  const [dataModal, setDataModal] = useState({})

  //  HANDLESS
  const onChangeInput = (e) => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }
  const [getOneSalesStore, { data: dataOneSales }] = useLazyQuery(GET_ONE_SALES)

  useEffect(() => {
    data?.getAllSalesStore.forEach((a) => {
      const { totalProductsPrice } = a || {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      suma += totalProductsPrice
      setTotalProductPrice(suma)
    })
  }, [totalProductPrice, suma, total, data])
  const {
    getOnePedidoStore,
    data: sale

  } = useGetSale()
  const HandleGetOne = (pCodeRef) => {
    getOnePedidoStore({
      variables: {
        pCodeRef: pCodeRef ?? ''
      }
    })
    setDataModal(sale)
    setOpen(!open)
  }

  const {
    data,
    fetchMore,
    loading,
    totalSales,
    delivery,
    restaurant
  } = useReport({
    more
  })

  const getFromDataToData = async () => {
    const { fromDate, toDate } = valuesDates
    fetchMore({
      variables: {
        max: more,
        min: 0,
        fromDate: fromDate,
        toDate: toDate
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult
        return {
          getAllSalesStore: [...fetchMoreResult.getAllSalesStore]

        }
      }
    })
  }
  const [dataStore] = useStore()

  const dataReportToday = useReport({
    fromDate: useFormatDate({})?.yearMonthDay,
    toDate: useFormatDate({})?.yearMonthDay
  })
  const dataReportYesterday = useReport({
    fromDate:  useFormatDate({ date: dt.setDate(dt.getDate() - 2)})?.yearMonthDay,
    toDate: useFormatDate({})?.yearMonthDay
  })
  const three = new Date()
  const dataReportThreeDaysAgo = useReport({
    fromDate: useFormatDate({ date: three.setDate(three.getDate() - 3)})?.yearMonthDay,
    toDate: useFormatDate({})?.yearMonthDay
  })

  const propsToday = {
    day: 'hoy',
    ...dataReportToday
  }
  const propsYesterday = {
    day: 'Ayer',
    ...dataReportYesterday
  }

  const propsThreeDaysAgo = {
    day: 'hace 3 días',
    ...dataReportThreeDaysAgo
  }
  const router = useRouter()

  const onClose = () => {
    setOpen(!open)
    router.push(
      {
        query: {
          ...router.query,
          saleId: ''
        }
      },
      undefined,
      { shallow: true }
    )
  }
  const propsModal = {
    // openAction,
    dataModal,
    totalProductsPrice: numberFormat(Math.abs(dataModal?.totalProductsPrice)),
    dataStore,
    pDatCre: useFormatDate({ date: dataModal?.pDatCre }),
    loading: false,
    edit: false,
    onClose: () => { return onClose() }
  }
  const { handleHourPmAM } = useFormatDate()

  return (
    <div>
      {loading && <Loading />}
      {open && <ModalDetailOrder {...propsModal} />}
      <Card>
        <form>
          <InputHooks
            name='fromDate'
            onChange={onChangeInput}
            required
            title='Desde'
            type='date'
            value={valuesDates?.fromDate}
            width={'20%'}
          />
          <InputHooks
            name='toDate'
            onChange={onChangeInput}
            required
            title='Hasta'
            type='date'
            value={valuesDates?.toDate}
            width='20%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            onChange={handleChange}
            required
            title='Numero de venta'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <InputHooks
            error={errorForm?.ProPrice}
            name='ProPrice'
            numeric
            onChange={handleChange}
            required
            title='Precio'
            value={dataForm?.ProPrice}
            width='30%'
          />
          <Button type='submit'>
            Mas opciones
          </Button>
          <RippleButton
            margin='30px'
            onClick={() => {
              getFromDataToData()
            }}
            padding='10px'
            type='button'
          >
            Consultar
          </RippleButton>
        </form>
      </Card>
      <ContainerQuery>
        <ContentQueryCard {...propsToday} />
        <ContentQueryCard {...propsYesterday} />
        <ContentQueryCard {...propsThreeDaysAgo} />
      </ContainerQuery>
      <Table
        data={data?.getAllSalesStore || []}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            const pCodeRef = x.pCodeRef
            const dateToFormat = new Date(x?.pDatCre ?? null)
            const shortDayName = x?.pDatCre ? dateToFormat.toLocaleDateString('ES', { weekday: 'short' }) : ''
            const yearMonthDay = dateToFormat.toLocaleDateString('en-CA')
            const date = `${yearMonthDay} ${shortDayName} `
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
              <Item>
                <span> {i + 1}</span>
              </Item>
              <Item>
                <span> Restaurante</span>
              </Item>
              <Item>
                <span> {pCodeRef}</span>
              </Item>
              <Item>
                <span> {date}</span>
              </Item>
              <Item>
                <span> {x.channel === 1 ? 'RESTAURANTE' : 'DELIVERY-APP' } </span>
              </Item>
              <Item>
                <span> {x.payMethodPState === 1 ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
              </Item>
              <Item>
                <span> $ {numberFormat(x.totalProductsPrice)}</span>
              </Item>

              <Item>
                <Button onClick={() => { return HandleGetOne(pCodeRef) }}>
                  Ver detalles
                </Button>
              </Item>
            </Section>
          })
        }}
        titles={[
          { name: 'Numero', justify: 'flex-center', width: '.5fr' },
          { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
          { name: 'Date', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
          { name: 'Valor de venta', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}
      />
      <Action>
        <RippleButton
          margin='30px 0'
          onClick={() => {
            setMore(more + 100)
            fetchMore({
              variables: { max: more, min: 0 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult
                return {
                  getAllSalesStore: [...fetchMoreResult.getAllSalesStore]
                }
              }
            })
          }}
          padding='10px'
        >{loading ? '...Cargando' : 'Cargar Mas'}</RippleButton>
      </Action>
      <CardInfo>
        <div className='wrapper-card-info'>
          <div className='item'>
            <span>Total de ventas realizadas </span>
            <h3>$ {numberFormat(totalSales)}</h3>
            <Button>Ver mas information</Button>
          </div>
          <div className='wrapper-acquisition__card'>
            <div>
              <span>Por Delivery </span>
              <h3>$ {numberFormat(delivery)}</h3>

            </div>
            <div>
              <span>Por Restaurante </span>
              <h3>$ {numberFormat(restaurant)}</h3>
            </div>
          </div>

        </div>
        <div className='wrapper-card-info'>
          <span>Total de ventas realizadas </span>
          <h3>$ {numberFormat(totalSales)}</h3>
          <Button>Ver mas information</Button>
        </div>
      </CardInfo>
    </div>
  )
}

export const ChatStatistic = () => {
  const { isMobile } = useMobile()
  const {
    loading,
    dataChart,
    chartTypeYear,
    labelTitle,
    years,
    options,
    setChartType,
    handleChangeYear,
    asFilter,
    cleanFilter,
    chartType
  } = useChartData({ })
  const showFilter = years.length
  return (
    <div style={{ margin: '50px 0 0 0' }}>
      {loading ?
        <Skeleton height={300} margin={'20px 0'} />
        : !isMobile && <MainCard title={labelTitle} weight={'200'}>
          <ContainerSelect>
            <select onChange={e => {return setChartType(e.target.value)}} value={chartType}>
              <option value='bar'>Gráfico de Barras</option>
              <option value='line'>Gráfico de Líneas</option>
            </select>
            {showFilter &&
            <select onChange={e => {return handleChangeYear(e.target.value)}} value={chartTypeYear}>
              {years.map((year) => {
                const currentYear = year == new Date().getFullYear()
                return <option
                  defaultChecked={currentYear}
                  defaultValue={currentYear}
                  disabled={!year}
                  key={year}
                  name={year}
                  value={year}
                >
                  {year}
                </option>
              })}
            </select>}
            {showFilter &&
            <Button
              backgroundColor={PColor}
              color={BGColor}
              disabled={!asFilter}
              margin='0 0 0 10px'
              onClick={() => { return cleanFilter()}}
              padding='10px'
            >
              Limpiar
            </Button>
            }
          </ContainerSelect>
          <ContainChart>
            {chartType === 'bar' ? (
              <BarChat data={dataChart || []} options={options} />
            ) : (
              <HorizontalBarChart data={dataChart || []} options={options} />
            )}
          </ContainChart>
        </MainCard>}
    </div>
  )
}

const Action = styled.div`
    display: flex;
    justify-content: space-between;
`
const ContainerSelect = styled.div`
  select {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
  width: 200px;
}

select:focus {
  border-color: #333333;
  outline: none;
}

option {
  background-color: #f2f2f2;
  padding: 10px;
}

`

const CardInfo = styled.div`
    display: grid;
    grid-template-columns: 50% repeat(auto-fill, 50%);
    gap: 10px;
    padding: 40px 0;
    place-content: space-between;
    .wrapper-card-info {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        height: auto;
        span {
            color: ${PLColor};
            font-family: PFont-Light;
        }
        h3 {
            font-family: PFont-Light;
            font-size: 30px;
            color: ${SFColor};

        }
        font-family:  PFont-Light;
        .item {
            padding: 20px;
            border-bottom: 1px solid #ccc;
        }
        .wrapper-acquisition__card {
            padding: 20px;
            display: grid;
            grid-template-columns: 50% repeat(auto-fill, 50%);
        }
    }

`
const ContainChart = styled.div`
    display: grid;
    grid-gap: 19px 12px;
    grid-template-columns: repeat( auto-fit,minmax(250px, 1fr) );
    margin: 10px 0;
    padding: 10px;
    position: relative;
    width: 100%;
    width: 90%;
`
const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    & form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

    }
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    /* background-color: ${BGColor}; */
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`