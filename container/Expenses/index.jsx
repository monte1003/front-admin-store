import React from 'react'
import { GlobalProvider } from './context/GlobalState'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/transactions/TransactionList'
import { TransactionForm } from './components/transactions/TransactionForm'
import { ExpenseChart } from './components/ExpenseChart'

export const Expenses = () => {
  return (
    <GlobalProvider>
      <div className='bg-neutral-950 text-white h-screen flex justify-center items-center'>
        <div className='w-2/5 flex justify-center items-center'>
          <div className='bg-neutral-800 p-10 rounded-md w-full'>
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <div className='flex-1'>
                <IncomeExpenses />
                <Balance />
                <TransactionForm />
              </div>
              <div className='flex-1 flex flex-col'>
                <ExpenseChart />
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  )
}

Expenses.propTypes = {}
