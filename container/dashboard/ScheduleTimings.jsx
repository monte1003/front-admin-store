import { useMutation } from '@apollo/client'
import { useSchedules, useFormatDate } from 'npm-pkg-hook'
import {
  useContext, useEffect,
  useState
} from 'react'
import styled, { css } from 'styled-components'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { RippleButton } from '../../components/Ripple'
import { Context } from '../../context/Context'
import {
  BGColor,
  GraniteGray,
  PVColor,
  TFSColor
} from '../../public/colors'
import { CREATE_STORE_CALENDAR } from './queries'
import { GET_ONE_SCHEDULE_STORE, GET_SCHEDULE_STORE } from './queriesStore'
import { Card } from './styled'

export const ScheduleTimings = () => {
  const { setAlertBox } = useContext(Context)
  const [data, { loading: lsc }] = useSchedules({ schDay: 1 })
  const [showTiming, setShowTiming] = useState(1)
  const SHOW_TIMING = useSetState(false)
  const handleClick = n => {
    setShowTiming(n)
    SHOW_TIMING.setState(!SHOW_TIMING.state)
  }
  const { handleHourPmAM } = useFormatDate({ })

  useEffect(() => {
    const date = new Date()
    const currentDay = date.getDay()
    setShowTiming(currentDay)
  }, [])
  const [values, setValues] = useState({})
  const handleChange = e => { return setValues({ ...values, [e.target.name]: e.target.value }) }
  const [setStoreSchedule, { loading }] = useMutation(CREATE_STORE_CALENDAR)
  const { startTime, endTime } = values || {}

  // eslint-disable-next-line
  const handleValidateDates = () => {
    const start = startTime
    const now = new Date()
    const dateStart = new Date(now)
    dateStart.setHours(start.split(':')[0])
    dateStart.setMinutes(start.split(':')[1])
    const end = endTime
    const dateEnd = new Date(now)
    dateEnd.setHours(end.split(':')[0])
    dateEnd.setMinutes(end.split(':')[1])
    // validamos que la fecha de ingreso sea menor que la de salida
    const validate = dateStart < dateEnd
    return validate
  }
  // eslint-disable-next-line
  const handleForm = (e) => {
    e.preventDefault()
    const val = handleValidateDates()
    if (!startTime && !endTime) return setAlertBox({ message: 'Llena todos los campos' })
    if (!val) return setAlertBox({ message: 'Error, la hora de ingreso debe ser menor que la de salida' })
    setStoreSchedule({
      variables: {
        input: {
          schHoSta: startTime,
          schHoEnd: endTime,
          schState: 1,
          schDay: showTiming
        }
      }, update(cache) {
        cache.modify({
          fields: {
            getStoreSchedules(dataOld = []) {
              return cache.writeQuery({ query: GET_SCHEDULE_STORE, data: dataOld })
            }
          }
        })
        cache.modify({
          fields: {
            getOneStoreSchedules(dataOld = []) {
              return cache.writeQuery({ query: GET_ONE_SCHEDULE_STORE, data: dataOld })
            }
          }
        })
      }
    }).then(() => {
      SHOW_TIMING.setState(!SHOW_TIMING.state)
      // setValues({
      //   endTime: null,
      //   startTime: null
      // })
    })
    // }
  }
  const days = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sabado',
    0: 'Domingo'
  }
  // eslint-disable-next-line
  const PortalContent = (
    <AwesomeModal
      backdrop='static'
      borderRadius='10px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='50vh'
      onCancel={() => {return false}}
      onHide={() => { SHOW_TIMING.setState(!SHOW_TIMING.state) }}
      padding='25px'
      show={SHOW_TIMING.state}
      size='small'
      title={days[showTiming]}
      zIndex='9990'
    >
      <Form onSubmit={(e) => {return handleForm(e)}}>
        <label>
          Hora Inicial
          <input
            name='startTime'
            onChange={handleChange}
            style={{ width: '100%' }}
            type='time'
            value={values.schHoSta}
          />
        </label>
        <label>
        Hora Final
          <input
            disabled={!startTime}
            id='tiempo12'
            name='endTime'
            onChange={handleChange}
            pattern='^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$'
            style={{ width: '100%' }}
            title='Hora Final'
            type='time'
            
            value={values.schHoEnd}
          />
        </label>
        <RippleButton
          disabled={loading || lsc || !endTime || !startTime}
          type={'submit'}
        >
          {loading ? 'Cargando...' : 'Guardar'}
        </RippleButton>
      </Form>
    </AwesomeModal>
  )

  return (
    <div>
      {PortalContent}
      <ScheduleHeader>
        <ScheduleHeaderNav current={showTiming === 1 && 1} onClick={() => {return handleClick(1)}}>Lunes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 2 && 1} onClick={() => {return handleClick(2)}}>Martes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 3 && 1} onClick={() => {return handleClick(3)}}>Miércoles</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 4 && 1} onClick={() => {return handleClick(4)}}>Jueves</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 5 && 1} onClick={() => {return handleClick(5)}}>Viernes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 6 && 1} onClick={() => {return handleClick(6)}}>Sábado</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 0 && 1} onClick={() => {return handleClick(0)}}>Domingo</ScheduleHeaderNav>
      </ScheduleHeader>
      <ScheduleHeader>
        {data ? data?.map((s, i) => {
          const start = handleHourPmAM(s.schHoSta)
          const end = handleHourPmAM(s.schHoEnd)
          return (
            <Card
              active={s.schDay === showTiming}
              current={s.schDay === showTiming}
              direction='column'
              key={i + 1}
              margin='10px'
              onClick={() => {return handleClick(s.schDay)}}
            >
              <Text>
                {days[s.schDay]}</Text>
              <Text size='1em'>
                {start} - {end}
              </Text>
            </Card>
          )}) : <div>Agenda tus horarios</div>}
      </ScheduleHeader>
    </div>

  )

}
export const Text = styled.h3`
  color: ${TFSColor};
  font-family:  PFont-Light;
  font-size: ${({ size }) => {return size || '13px'}};
  font-weight: 400;
  padding: 7px 0;
`
export const Select = styled.select`
  background-color: ${BGColor};
  border-radius: 4px;
  border: 1px solid ${GraniteGray};
  color: ${GraniteGray};
  font-size: 1rem;
  height: 48px;
  padding: 13px 20px;
  width: 100%;
`
export const CardSelectLabel = styled.label`
    margin: 20px 0px 12px 0px;
    font-size: 15px;
`
export const Form = styled.form`
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ScheduleHeader = styled.div`
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat( auto-fit,minmax(150px,1fr) );
`
export const CardSelect = styled.select`
    font-size: 16px;
    padding: 7px 17px;
    border: 1px solid ${({ theme }) => {return theme.PLVColor}};
    background-color: ${({ theme }) => {return theme.BGAColor}};
    width: 200px;
`
export const ModalSelect = styled(CardSelect)`
    height: 36px;
    margin: 0px 20px 0px 0px;
`
const ScheduleHeaderNav = styled.button`
    margin: 10px;
    border: 1px solid ${TFSColor}; 
    padding: 7px 0;
    border-radius: 20px;
    flex-grow: 1;
    font-size: 11px;
    background-color: ${({ current }) => {return current ? PVColor : 'transparent'}};
    color: ${({ current }) => {return current ? BGColor : TFSColor}};
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    ${({ current }) => {return !current && css`
    :hover {
        background-color:${({ theme }) => {return theme.BGColor}};
        color:${({ theme }) => {return theme.SFColor}}; 
    }`} }
`
export const AModalRow = styled.div`
    padding: 10px;
`
export const AModalBtnDelete = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    margin-top: 50px;
    width: 68px;
    background-color: ${({ theme }) => {return theme.EColor}};
    color: ${({ theme }) => {return theme.BGAColor}};
    ${({ hide }) => {return hide === 0 && css`display:none;`}};
    border-radius: 5px;
    :hover{
        cursor:pointer;
    }
    @media only screen and (max-width: 860px){
        width:100%;
        margin-top: 30px;
    }
`
export const CardSelectOption = styled.option`
  :checked {
    background-color:${({ theme }) => {return theme.PLVColor}}
  }
`
export const CardSelectC = styled.div`
    display:flex;
    flex-direction: column;
`

export const ModalSelectC = styled(CardSelectC)`
    justify-content: flex-end;
    min-width: 200px;
    ${({ hide }) => {return hide === 0 && css`display:none;`}}
    @media only screen and (max-width: 860px){
        width:100%;
    }
`

// ----- SELECT DEL MODAL
