import React, { useCallback, useEffect, useRef, useState } from 'react'

const colors = [
  'red',
  'green',
  'yellow',
  'black',
  'blue'
]

export const CanvasDrawn = () => {
  const canvasRef = useRef(null)
  const ctx = useRef(null)

  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [mouseDown, setMouseDown] = useState(false)
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d')
    }
  }, [])

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath()
      ctx.current.strokeStyle = selectedColor
      ctx.current.lineWidth = 10
      ctx.current.lineJoin = 'round'
      ctx.current.moveTo(lastPosition.x, lastPosition.y)
      ctx.current.lineTo(x, y)
      ctx.current.closePath()
      ctx.current.stroke()

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png')
    const blob = await (await fetch(image)).blob()
    const blobURL = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobURL
    link.download = 'image.png'
    link.click()
  }
  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }

  const onMouseUp = () => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  return (
    <div className='App'>
      <canvas
        height={400}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={canvasRef}
        style={{
          border: '1px solid #000'
        }}
        suppressHydrationWarning={true}
        width={400}
      />
      <br />
      <select
        onChange={(e) => { return setSelectedColor(e.target.value) }}
        value={selectedColor}
      >
        {
          colors.map(
            color => { return <option key={color} value={color}>{color}</option> }
          )
        }
      </select>
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
    </div>
  )
}
