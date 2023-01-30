import InputHooks from 'components/InputHooks/InputHooks'
import styled from 'styled-components'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BGColor, PLColor, SFColor } from 'public/colors'
import React, { useEffect, useState } from 'react'
import { numberFormat, SPANISH_MONTHS } from '../../utils'
import { GET_ALL_SALES, GET_ONE_SALES } from './queries'
import moment from 'moment'
import { BarChat, DoughnutChar, HorizontalBarChart } from 'components/Chart'
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
import { useMobile } from 'npm-pkg-hook'

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
  const [active, setActive] = useState(2)
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
    console.log(pCodeRef)
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
  const propsModal = {
    // openAction,
    dataModal,
    totalProductsPrice: numberFormat(Math.abs(dataModal?.totalProductsPrice)),
    dataStore,
    pDatCre: useFormatDate({date: dataModal?.pDatCre}),
    loading: false,
    edit: false,
    onClose: () => {return setOpen(!open)}

  }
  return (
    <div>
      {loading && <Loading />}
      {/* <GetOneSales
        data={dataOneSales?.getOneSalesStore || []}
        open={open}
        setOpen={setOpen}
      /> */}
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
                <span> {moment(x.pDatCre).format('DD-MM-YYYY')} - {moment(x.pDatCre).format('HH:mm A')}</span>
              </Item>
              <Item>
                <span> DELIVERY-APP </span>
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
  // Construcción del nuevo array:
  const { data, loading } = useQuery(GET_ALL_SALES)
  // const array = filterKeyObject(data?.getAllSalesStore, ['__typename'])
  let result = []
  data?.getAllSalesStore?.length > 0 && data?.getAllSalesStore.reduce(function (res, value) {
    // Creamos la posición del array para cada mes
    let mes = new Date(value.pDatCre).getMonth()
    if (!res[mes]) {
      res[mes] = { Mes: mes }
      // Inicializamos a 0 el valor de cada key
      Object.keys(value).forEach((key) => {
        if (key != 'pDatCre') {
          res[mes][key] = 0
        }
      })

      result.push(res[mes])
    }
    // Sumamos el valor de cada clave dentro de un bucle
    Object.keys(value).forEach(function (key) {
      if (key != 'pDatCre') {
        res[mes]['totalProductsPrice'] += value['totalProductsPrice']
      }
    })
    return res
  }, {})
  let allMonths = Array.from({length: 12}, (_, i) => {return i})
  let missingMonths = allMonths.filter(month => {return !result.some(data => {return data.Mes === month})})

  for (const element of missingMonths) {
    result.push({
      'Mes': element,
      'totalProductsPrice': 0
    })
  }

  result.sort((a, b) => { return a.Mes - b.Mes})


  // Resultado:
  const dataChat = {
    labels: result.map(data => {
      return SPANISH_MONTHS[data.Mes]
    }),
    datasets: [
      {

        label: 'Ventas por meses del año',
        data: result.map(data => { return data.totalProductsPrice }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }
  const [chartType, setChartType] = useState('bar')
  const options = {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false }
        }
      ]
    }
  }
  const { isMobile } = useMobile()

  return (
    <div>
      {loading ?
        <Skeleton height={300} margin={'20px 0'} />
        : !isMobile && <MainCard title={`Ventas por meses del año`} weight={'200'}>
          <ContainerSelect>
            <select onChange={e => {return setChartType(e.target.value)}} value={chartType}>
              <option value='bar'>Gráfico de Barras</option>
              <option value='line'>Gráfico de Líneas</option>
            </select>
          </ContainerSelect>
          <ContainChart>
            {chartType === 'bar' ? (
              <BarChat data={dataChat || []} options={options} />
            ) : (
              <HorizontalBarChart data={dataChat || []} options={options} />
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