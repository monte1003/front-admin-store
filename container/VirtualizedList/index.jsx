import * as React from 'react'

const ViewportContext = React.createContext(undefined)

// The purpose of the viewport is to create the bounding box in which the list is hosted,
// and to provide the intersection observer context.
export const Viewport = (
  props
) => {
  const { as, ...rest } = props
  const viewportRef = React.useRef()
  const RootElement = as || 'div'
  const [internalState] = React.useState({
    observer: undefined,
    observables: new Map(),
    scrollTop: 0,
    scrollBottom: 0
  })
  console.log('viewport render')

  const [api] = React.useState({
    observe: (element, callback, data) => {
      if (element) {
        internalState.observables.set(element, callback)
        if (internalState.observer) {
          // console.log('observing', element.textContent);
          internalState.observer.observe(element)
        }
      }
    },
    unobserve: element => {
      if (element) {
        internalState.observables.delete(element)
        if (internalState.observer) {
          // console.log('unobserving', element.textContent);
          internalState.observer.unobserve(element)
        }
      }
    }
  })

  React.useEffect(() => {
    if (viewportRef.current) {
      internalState.observer = new IntersectionObserver(
        entries =>
        {return entries.forEach(entry => {
          // console.log('observe change', entry.intersectionRect.height > 0, entry.target)
          const callback = internalState.observables.get(entry.target)
          if (callback) {
            callback({
              entry,
              scrollTop: internalState.scrollTop,
              scrollBottom: internalState.scrollBottom
            })
          }
        })},
        {
          root: viewportRef.current,
          rootMargin: '600px',
          threshold: [0, 1]
        }
      )

      // Hook up to all elements which want notifications.
      internalState.observables.forEach((value, element) =>
      {return internalState.observer.observe(element)}
      )
    }

    return () => {
      if (internalState.observer) {
        internalState.observer.disconnect()
        internalState.observer = undefined
      }
    }
  }, [internalState])

  const onScroll = ev => {
    internalState.scrollTop = ev.target.scrollTop
    internalState.scrollBottom = ev.target.clientHeight
  }

  return (
    <ViewportContext.Provider value={api}>
      <RootElement
        ref={viewportRef}
        style={{ background: 'red', overflowY: 'scroll', height: '100vh' }}
        {...rest}
        onScroll={onScroll}
      />
    </ViewportContext.Provider>
  )
}


export const _getSize = (
  sizeMap,
  defaultSize,
  start,
  end
) => {
  const startRect = sizeMap.get(start)
  const endRect = sizeMap.get(end)

  if (startRect && endRect) {
    return endRect.bottom - startRect.top
  }
  return (1 + end - start) * defaultSize
}

export const VirtualizedListPage = (props) => {
  const { items, start, end, renderItem, sizeMap, defaultSize } = props
  const viewport = React.useContext(ViewportContext)
  const [isVisible, setIsVisible] = React.useState(false)
  const [internalState] = React.useState({
    visibility: {
      spacer: false,
      first: false,
      last: false
    },
    observedElements: []
  })
  const spacerRef = React.useRef()
  const firstRef = React.useRef()
  const lastRef = React.useRef()

  function evalEntry({ entry, scrollTop, scrollBottom }) {
    const { visibility } = internalState
    if (
      entry.target === spacerRef.current &&
      visibility.spacer !== entry.isIntersecting
    ) {
      visibility.spacer = entry.isIntersecting
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    }

    if (
      entry.target === firstRef.current &&
      visibility.first !== entry.isIntersecting
    ) {
      visibility.first = entry.isIntersecting
      if (
        !entry.isIntersecting &&
        entry.boundingClientRect.top > scrollBottom
      ) {
        console.log('Virtualizing page', start, end)
        setIsVisible(false)
      }
    }

    if (
      entry.target === lastRef.current &&
      visibility.last !== entry.isIntersecting
    ) {
      visibility.last = entry.isIntersecting
      if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) {
        console.log('Virtualizing page', start, end)
        setIsVisible(false)
      }
    }
  }

  React.useEffect(() => {
    const { observedElements } = internalState;
    [spacerRef, firstRef, lastRef].forEach((ref) => {
      if (ref.current) {
        observedElements.push(ref.current)
        viewport.observe(ref.current, evalEntry)
      }
    })

    return () => {
      // console.log("unobserving", observedElements);

      observedElements.forEach(element => {return viewport.unobserve(element)})
      internalState.observedElements = []
    }
  }, [spacerRef.current, firstRef.current, lastRef.current])

  return isVisible ? (
    <>
      {items.slice(start, end + 1).map((item, index) => {
        const offsetIndex = index + start

        return renderItem({
          item,
          index: offsetIndex,
          ref:
            offsetIndex === start
              ? firstRef
              : offsetIndex == end
                ? lastRef
                : undefined
        })
      })}
    </>
  ) : (
    <div
      ref={spacerRef}
      style={{
        height: _getSize(sizeMap, defaultSize, start, end)
      }}
    />
  )
}
export const VirtualizedList = (props) => {
  const {
    as,
    items,
    renderItem,
    itemsPerPage = 20,
    itemSize = 40,
    defaultScrollIndex,
    reversedScroll,
    horizontal,
    ...rest
  } = props
  console.log(defaultScrollIndex)
  const RootElement = (props.as || 'ul')
  const [sizeMap] = React.useState(new Map())
  const pageCount = Math.ceil(items.length / itemsPerPage)
  return (
    <RootElement {...rest}>
      {Array.from({ length: pageCount }).map((item, index) => {return (
        <VirtualizedListPage
          defaultSize={itemSize}
          end={index * itemsPerPage + itemsPerPage - 1}
          items={items}
          key={index}
          renderItem={renderItem}
          sizeMap={sizeMap}
          start={index * itemsPerPage}
        />
      )})}
    </RootElement>
  )
}
