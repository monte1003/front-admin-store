import { useEffect, useState } from 'react'
// import "./styles.css";

// Notes:
// This example is for one input only. Need to test for more inputs
// Articles: https://medium.com/@DavideRama/removeeventlistener-and-anonymous-functions-ab9dbabd3e7b

export default function App() {
  const [changed, setChanged] = useState(false)
  const [value, setValue] = useState('')

  // Add the value and set the setChange to true or false
  const addValue = (element) => {
    let value = element.target.value
    setValue(value)
    value.length > 0 ? setChanged(true) : setChanged(false)
  }

  function onBeforeUnload(event) {
    // Cancel the event
    event.preventDefault()
    // Chrome requires returnValue to be set
    event.returnValue = ''
  }

  useEffect(() => {
    // Activate beforeunload listener
    function activateListener() {
      // console.log('The add event is activating')
      window.addEventListener('beforeunload', onBeforeUnload)
    }

    // Deactivate beforeunload listener
    // Issues: It seems that after the listener was activated, it cannot be deactivated.
    // Need to research how to do that
    function deactivateListener() {
      // console.log('The remove event is activating')
      window.removeEventListener('beforeunload', onBeforeUnload)
    }

    // Check if the input has value, and if it has then show the alert
    if (changed && value.length > 5) {
      activateListener()
    } else {
      deactivateListener()
    }

    // Just testing how the values change
    // console.log(`Changed: ${changed} and value: ${value}`)
  }, [changed, value])

  return (
    <div className='App'>
      <h1>Popup</h1>
      <p>This is just a demo based on the onBeforeUnload listener</p>
      <form id='form'>
        <input
          name='input1'
          onChange={addValue}
          type='text'
          value={value}
        />
        <br />
        <button onClick={() => {return setChanged(false)}} type='button'>
          Reset
        </button>
      </form>
    </div>
  )
}
