import { MainCard } from 'components/common/Reusable/ShadowCard'
import { LastedStatistic } from 'container/dashboard/LastedStatistic'
import { OurFood } from 'container/dashboard/OurFood'
import { SalesWeek } from 'container/dashboard/salesWeek'
import { SalesWeekShortDays } from 'container/dashboard/salesWeekShortDays'
import { ChatStatistic } from 'container/ventas/ListVentas'
import { Container } from './styled'
import { DeliveryFood } from '../dashboard/Delivery'
import { AlertStatistic } from '../dashboard/AlertClients'

export const ReportsC = () => {
  return (
    <Container>
      <MainCard title={`Ventas por meses del año`} weight={'200'}>
        <ChatStatistic />
      </MainCard>
      <SalesWeekShortDays />
      <SalesWeek />
      <LastedStatistic />
      <OurFood />
      <AlertStatistic />
      <DeliveryFood />
    </Container>
  )
}
