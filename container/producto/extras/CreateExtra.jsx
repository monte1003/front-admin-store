import { BGColor, EColor } from '@/public/colors'
import { IconDelete, IconPlus } from '@/public/icons'
import React from 'react'
import { AwesomeModal } from '~/components/AwesomeModal'
import { Checkbox } from '~/components/Checkbox'
import Row from '~/components/common/Atoms/Row'
import { RippleButton } from '~/components/Ripple'
import { numberFormat } from '~/utils'
import { InputHookProducts } from '.'
import { Action, ContentLinesItems, ContentModal } from './styled'

export const CreateExtra = ({
  setModal,
  modal,
  LineItems,
  handleRemove,
  onSubmitUpdate,
  handleAdd,
  CleanLines,
  handleLineChange
}) => {
  return (
    <div>
      <AwesomeModal
        borderRadius='4px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={false}
        height='60vh'
        onCancel={() => { return setModal(false) }}
        onHide={() => { return setModal(false) }}
        padding={0}
        question={false}
        show={modal}
        size='600px'
        sizeIconClose='30px'
        title='Crea una venta'
        zIndex='9999'
      >
        <ContentModal>
          <div className='.header'>
          </div>
          <div className='content'>
            {LineItems && LineItems?.Lines?.map((salesLine, i) => {
              return (
                <ContentLinesItems key={salesLine._id}>
                  <Row noBorder >
                    <InputHookProducts
                      borderRadius='0px'
                      height='100px'
                      margin='0 10px 0 0'
                      name={salesLine.extraName}
                      onChange={value => { return handleLineChange(i, 'extraName', value) }}
                      outline='none'
                      padding='10px'
                      placeholder='Nombre'
                      value={salesLine.extraName}
                    />
                    <InputHookProducts
                      height='100px'
                      margin='0 15px 0 0'
                      name={salesLine.extraPrice}
                      onChange={value => { return handleLineChange(i, 'extraPrice', value) }}
                      placeholder='Precio'
                      value={numberFormat(salesLine.extraPrice)}
                    />
                  </Row>
                  <Checkbox
                    checked={salesLine.exState}
                    id={i}
                    margin='10px 0'
                    name={salesLine.exState}
                    onChange={value => { return handleLineChange(i, 'exState', value) }}
                  />
                  <RippleButton
                    bgColor='transparent'
                    margin='0px'
                    onClick={() => { return handleRemove(i) }}
                    type='button'
                    widthButton='min-content'
                  >
                    <IconDelete color={EColor} size='25px' />
                  </RippleButton>
                </ContentLinesItems>
              )
            })}
          </div>
          <Action>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => { return CleanLines() }}
              type='button'
              widthButton='240px'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
            <RippleButton
              margin='0px'
              onClick={() => { return handleAdd() }}
              type='button'
              widthButton='240px'
            >
              <IconPlus color={BGColor} size='20px' />
            </RippleButton>
            <RippleButton
              margin='0px'
              onClick={(e) => { e.preventDefault(); onSubmitUpdate() }}
              widthButton='240px'
            >
            Update
            </RippleButton>
          </Action>
        </ContentModal>
      </AwesomeModal>
    </div>
  )
}
