import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Devices } from 'components/Devices'
import { TeamStore } from 'container/TeamStore'
import { ChatStatistic } from 'container/ventas/ListVentas'
import { useMultiKeyPress } from 'hooks/useKeypress'
import { AlertStatistic } from './AlertClients'
import { DeliveryFood } from './Delivery'
import { LastedStatistic } from './LastedStatistic'
import { Main } from './Main'
import { OurFood } from './OurFood'
import { SalesWeek } from './salesWeek'
import { SalesWeekShortDays } from './salesWeekShortDays'
import { ContentGrid, Wrapper } from './styled'
// import { Marquee } from 'pkg-components'

const Dashboard = ({ ...props }) => {
  // eslint-disable-next-line
  const happySadPress = useMultiKeyPress('Control', 'f')

  return (<>
    <Wrapper>
      <div
        direction
        gradient={false}
        pauseOnClick={true}
        pauseOnHover
        play={false}
        // loop
        // gradientColor={[]}
        // gradientWidth={200}
        // speed={100}
        // onFinish={() => { }}
        // onCycleComplete={() => { }}
      >
        <Main {...props} />
      </div>
      <ChatStatistic />
      <SalesWeekShortDays />
      <SalesWeek />
      <Addons />
      <LastedStatistic />
      <OurFood />
      <AlertStatistic />
      <DeliveryFood />
    </Wrapper >
  </>
  )
}

Dashboard.propTypes = {

}

export default Dashboard

export const Addons = () => {
  return (
    <ContentGrid>
      <MainCard title='Mi equipo'>
        <TeamStore />
      </MainCard>
      <MainCard title='Dispositivos conectados'>
        {/*  */}
      </MainCard>
      <MainCard title='Dispositivos conectados'>
        <Devices />
      </MainCard>
    </ContentGrid>
  )
}
