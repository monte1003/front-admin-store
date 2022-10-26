import { Viewport, VirtualizedList } from '~/container/VirtualizedList'
// https://codesandbox.io/s/61kjvj0pwz?file=/src/index.tsx:157-262
const virtualize = () => {
  const items = Array.from(
    { length: 1000 },
    (item, index) => {return `I am item ${index}`}
  )
  return (
    <Viewport>
      <VirtualizedList
        itemSize={0.1}
        items={items}
        itemsPerPage={10}
        renderItem={({ ref, item, index }) => {return (
          <div
            key={index}
            ref={ref}
            // style={{ height: '300px' }}
          >{`Item #${index}: ${item}`}</div>
        )}}
      />
    </Viewport>
  )
}

export default virtualize