import { Button } from 'pkg-components'

const Offline = () => {
  return (
    <div>
      <h2>
      Me parece que tu estas sin conexión
      </h2>
      <span>
      Por favor, revise tu internet e intente nuevamente
      </span>
      <Button>
      Inténtalo de nuevo
      </Button>
    </div>
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