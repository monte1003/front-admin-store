import PropTypes from 'prop-types'
import { TextH2Main } from 'components/common/h2'
import { BGColor, PColor } from 'public/colors'
import React from 'react'
import { numberFormat } from '../../utils'
import {
  Box,
  ContentCalcules,
  FlipTop
} from './styled'
import Button from 'components/common/Atoms/Button'

const FooterCalcules = ({
  setPrint,
  callback,
  totalProductPrice,
  counter,
  dispatch,
  disabled
}) => {
  return (
    <ContentCalcules>
      <Box display='flex' width='100%'>
        <Button
          background={PColor}
          color={BGColor}
          onClick={() => { return dispatch({ type: 'REMOVE_ALL_PRODUCTS' }) }}
        >
          ELIMINAR
        </Button>
        <FlipTop>
          <Button
            background={PColor}
            color={BGColor}
            disabled={disabled}
            onClick={() => { return setPrint({ callback }) }}
            radius='50%'
          >GUARDAR</Button>
        </FlipTop>
      </Box>
    </ContentCalcules>
  )
}

FooterCalcules.propTypes = {
  counter: PropTypes.number,
  dispatch: PropTypes.func,
  print: PropTypes.bool,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.number
}

export default FooterCalcules