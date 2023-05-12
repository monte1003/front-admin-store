import { useGlobalState } from '../../context/GlobalState'

export function TransactionItem({ transaction: { id, description, amount } }) {
  const { deleteTransaction } = useGlobalState()
  const sign = amount < 0 ? '-' : '+'

  return (
    <li
      className={
        `bg-zinc-600 text-white px-3 py-1 rounded-lg mb-2 w-full flex justify-between items-center` +
        ` ${amount < 0 ? 'bg-red-700' : 'bg-green-700'}`
      }
      key={id}
    >
      {description}
      <div>
        <span>
          {sign}${Math.abs(amount)}
        </span>
        <button
          className='font-bold text-white rounded-lg ml-2'
          onClick={() => {return deleteTransaction(id)}}
        >
        </button>
      </div>
    </li>
  )
}
