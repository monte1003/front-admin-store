import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export function MyComponent() {
  const [lists, setLists] = useState([
    {
      title: 'List 1',
      items: [
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' }
      ]
    },
    {
      title: 'List 2',
      items: [{ id: '4', content: 'Item 4' }, { id: '5', content: 'Item 5' }]
    }
  ])

  const onDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    // reordering items in the same list
    if (source.droppableId === destination.droppableId) {
      const listIndex = lists.findIndex((list) => {return list.title === source.droppableId})
      const items = reorder(
        lists[listIndex].items,
        source.index,
        destination.index
      )

      setLists((oldState) => {
        const newState = [...oldState]
        newState[listIndex] = { ...newState[listIndex], items }
        return newState
      })
    } else {
      // moving items to a different list
      const sourceListIndex = lists.findIndex((list) => {return list.title === source.droppableId})
      const destinationListIndex = lists.findIndex(
        (list) => {return list.title === destination.droppableId}
      )
      const item = lists[sourceListIndex].items[source.index]

      setLists((oldState) => {
        const newState = [...oldState]
        newState[sourceListIndex].items.splice(source.index, 1)
        newState[destinationListIndex].items.splice(destination.index, 0, item)
        return newState
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {lists.map((list, listIndex) => {return (
          <div key={list.title}>
            <h2>{list.title}</h2>
            <Droppable droppableId={list.title}>
              {(provided) => {return (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {list.items.map((item, index) => {return (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => {return (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </li>
                      )}}
                    </Draggable>
                  )})}
                  {provided.placeholder}
                </ul>
              )}}
            </Droppable>
          </div>
        )})}
      </div>
    </DragDropContext>
  )
}

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
