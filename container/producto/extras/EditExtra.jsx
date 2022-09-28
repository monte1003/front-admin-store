import { EColor } from '@/public/colors'
import { IconDelete } from '@/public/icons'
import moment from 'moment'
import React from 'react'
import { AwesomeModal } from '~/components/AwesomeModal'
import InputHooks from '~/components/InputHooks/InputHooks'
import { RippleButton } from '~/components/Ripple'
import { ContentModal, GarnishChoicesHeader } from './styled'

export const EditExtra = ({
  OPEN_MODAL_CAT_EXTRA,
  INFO_EXTRA,
  handleDeleteCatOptional,
  handleChange,
  dataForm
}) => {
  return (
    <div>
      <AwesomeModal
        backdrop
        bgColor='transparent'
        btnConfirm={false}
        footer={false}
        header={false}
        onCancel={() => { return OPEN_MODAL_CAT_EXTRA.setState(false) }}
        onHide={() => { return OPEN_MODAL_CAT_EXTRA.setState(false) }}
        padding='10px'
        show={OPEN_MODAL_CAT_EXTRA.state}
        size='70%'
        zIndex='99988'
      >
        <ContentModal height='400px'>
          <GarnishChoicesHeader>
            <div>
              <p className='garnish-choices__title'>{moment(INFO_EXTRA.state.pDatCre).format('YYYY-MM-DD')}</p>
              <p className='garnish-choices__title'>{INFO_EXTRA.state.OptionalProName}</p>
              <p className='garnish-choices__title-desc'>Escoge hasta {INFO_EXTRA.state.numbersOptionalOnly} opciones.</p>
            </div>
            {INFO_EXTRA.state.required === 1 ? <div className='garnish-choices'>
              <span className='marmita-minitag' span>OBLIGATORIO</span>
            </div> : null}
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => { return handleDeleteCatOptional(INFO_EXTRA.state) }}
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
          </GarnishChoicesHeader>
          <InputHooks
            name='OptionalProName'
            onChange={handleChange}
            required
            value={dataForm.OptionalProName}
          />

        </ContentModal>
      </AwesomeModal>
    </div>
  )
}
