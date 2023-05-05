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
import { Text } from 'pkg-components'

const FooterCalcules = ({
  counter = 0,
  disabled = false,
  totalProductPrice,
  callback = () => { return },
  dispatch = () => { return },
  setPrint = () => { return }
}) => {
  return (
    <ContentCalcules>
      {/* {counter} */}
      <Box display='flex' width='100%'>
        <Text as='h2' fontSize='1em'>
          $ {numberFormat(totalProductPrice)}
        </Text>
        &nbsp;
        &nbsp;
        <Button
          background={PColor}
          color={BGColor}
          onClick={() => { return dispatch({ type: 'REMOVE_ALL_PRODUCTS' }) }}
          padding='13.5px'
        >
          ELIMINAR
        </Button>
        <FlipTop>
          <Button
            background={PColor}

            color={BGColor}
            disabled={disabled}
            onClick={() => { return setPrint({ callback }) }}
            padding='13.5px'
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