import { useMemo } from 'react'
import { Circle } from '../../../components/Chart'
import { useGlobalState } from '../context/GlobalState'

export function ExpenseChart() {
  const { transactions } = useGlobalState()

  const calculateTotalIncomes = (transactions) => {
    return transactions
      .filter((transaction) => {return transaction.amount > 0})
      .reduce((acc, transaction) => {return acc + transaction.amount}, 0)
  }

  const calculateTotalExpenses = (transactions) => {
    return transactions
      .filter((transaction) => {return transaction.amount < 0})
      .reduce((acc, transaction) => {return acc + transaction.amount}, 0) * -1
  }

  const totalIncomes = useMemo(() => {return calculateTotalIncomes(transactions)}, [transactions])

  const totalExpenses = useMemo(() => {return calculateTotalExpenses(transactions)}, [transactions])

  const expensesPercentage = Math.round((totalExpenses / totalIncomes) * 100)
  const incomesPercentage = 100 - (expensesPercentage)

  if (totalIncomes === 0 && totalExpenses === 0) {
    return (
      <div className='bg-zinc-900 p-4 my-2'>
        <div className='h-full flex items-center justify-center w-full flex-col'>
          <h1 className='text-3xl font-bold my-2'>Aun no hay datos</h1>
        </div>
      </div>
    )
  }
  const chartData = {
    labels: ['Expenses', 'Incomes'],
    datasets: [
      {
        data: [expensesPercentage, incomesPercentage],
        backgroundColor: ['#e74c3c', '#2ecc71'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    animation: {
      duration: 2000
    },
    legend: {
      labels: {
        fontColor: 'white'
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index]
        }
      }
    }
  }
  return (
    <div className='bg-zinc-950' style={{ height: '300px', width: '300px' }}>
      <Circle data={chartData} options={chartOptions} />
    </div>
  )
}
