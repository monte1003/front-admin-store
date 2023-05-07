import PropTypes from 'prop-types'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2'

const dataTest = {
  labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
  datasets: [
    {
      label: 'ejemplo',
      data: [12, 19, 3, 5, 2, 3],
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

const optionsTest = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true
    }
  },
  type: 'doughnut'

}

export const HorizontalBarChart = ({ data, options }) => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Line data={data || dataTest} options={options || optionsTest} />
    </div>
  </>
)}

HorizontalBarChart.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

export const Circle = ({ data, options }) => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Pie data={data || dataTest} options={options || optionsTest} />
    </div>
  </>
)}

Circle.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}
export const DoughnutChar = ({ data, options }) => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Doughnut data={data || dataTest} options={options || optionsTest} />
    </div>
  </>
)}

DoughnutChar.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}
export const BarChat = ({ data, options }) => {return (
  <>
    <div className='header'>
      <div className='links'>
      </div>
      <Bar data={data || dataTest} options={options || optionsTest} />
    </div>
  </>
)}

BarChat.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}
