import React, { useEffect, useState } from 'react'
import { Container, StatisticHours } from './styled'
import { useSchedule, useSchedules } from 'npm-pkg-hook'
import { ScheduleTimings } from 'container/dashboard/ScheduleTimings'
import moment from 'moment'
import { lte } from 'lodash'

export const Horarios = () => {
  return (
    <Container>
      <ScheduleTimings />
    </Container>
  )
}
