import { useState } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { InputHooks } from 'pkg-components'

export function TransactionForm() {
  const { addTransaction } = useGlobalState()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      amount: +amount
    })

    setDescription('')
    setAmount(0)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputHooks
          className='bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full'
          onChange={(e) => {return setDescription(e.target.value)}}
          placeholder='Enter a description'
          type='text'
          value={description}
        />
        <InputHooks
          className='bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full'
          onChange={(e) => {return setAmount(e.target.value)}}
          placeholder='0.00'
          step='0.01'
          type='number'
          value={amount}
        />
        <button
          className='bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full disabled:opacity-50'
          disabled={!description || !amount}
        >
          Adicionar Transacción
        </button>
      </form>
    </div>
  )
}
