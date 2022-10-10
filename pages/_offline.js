import React from 'react'

const Offline = () => {
  return (
    <div>Offline</div>
  )
}

export default Offline

Offline.getLayout = function getLayout(page) {
  return (
    <>
      {page}
    </>
  )
}