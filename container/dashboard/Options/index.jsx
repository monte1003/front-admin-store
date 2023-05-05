import { Button } from 'pkg-components'
import { useContext } from 'react'
import { Context } from 'context/Context'
import { WrapperOptions } from '../styledStore'

export const ButtonsAction = ({ handle = () => { return } }) => {
  const { setShowComponentModal } = useContext(Context)
  return (
    <WrapperOptions>
      <Button
        fontFamily= 'PFont-Light'
        fontWeight='300'
        label='Subir productos'
        onClick={() => { return handle(3, 'product', true) }}
        size='small'
      />
      <Button
        fontFamily= 'PFont-Light'
        fontWeight='300'
        label='Categorías'
        onClick={() => { return handle(2, 'categories', true) }}
        size='small'
      />
      <Button
        fontFamily= 'PFont-Light'
        fontWeight='300'
        label='Organizar agenda'
        onClick={() => { return setShowComponentModal(1) }}
        size='small'
      />
    </WrapperOptions>
  )
}

ButtonsAction.propTypes = {}
