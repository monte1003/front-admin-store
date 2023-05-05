import { BGAColor, EColor } from '@/public/colors'
import { IconDelete } from '@/public/icons'
import {
  Button,
  InputHookProducts,
  QuantityButton
} from 'pkg-components'
import { AwesomeModal } from 'components/AwesomeModal'
import { Checkbox } from 'components/Checkbox'
import Row from 'components/common/Atoms/Row'
import { RippleButton } from 'components/Ripple'
import { numberFormat } from 'utils'
import {
  Action,
  ContentLinesItems,
  ContentModal
} from './styled'

export const CreateExtra = ({
  setModal,
  modal,
  LineItems,
  handleRemove,
  onSubmitUpdate,
  loading,
  handleAdd,
  CleanLines,
  handleLineChange,
  handleFocusChange
}) => {
  const disabled = LineItems?.Lines?.length <= 1
  return (
    <div>
      <AwesomeModal
        borderRadius='4px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='60vh'
        onCancel={() => { return setModal() }}
        onHide={() => { return setModal() }}
        padding={0}
        question={false}
        show={modal}
        size='900px'
        sizeIconClose='30px'
        title='Añade adicionales'
        zIndex='9999'
      >
        <ContentModal>
          <div className='.header'>
          </div>
          <div className='content'>
            {LineItems && LineItems?.Lines?.map((salesLine, i) => {
              return (
                <ContentLinesItems key={i}>
                  <Row noBorder >
                    <InputHookProducts
                      borderRadius='0px'
                      height='100px'
                      margin='0 10px 0 0'
                      name={salesLine.extraName}
                      onChange={value => { return handleLineChange(i, 'extraName', value) }}
                      onFocus={() => { return handleFocusChange(i) }}
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
                      onFocus={() => { return handleFocusChange(i) }}
                      padding='10px'
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
                    disabled={disabled}
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
            <Button
              bgColor={'transparent'}
              borderRadius='5px'
              child={<IconDelete color={BGAColor} size='20px' />}
              disabled={disabled}
              fontFamily='PFont-Light'
              fontWeight='300'
              margin='0px'
              onClick={() => { return CleanLines() }}
              padding='7px 10px'
              primary
              size='large'
              type='button'
              width='100px'
            >
              <IconDelete color={EColor} size='25px' />
            </Button>
            <QuantityButton
              handleIncrement={() => { return handleAdd() }}
              quantity={LineItems?.Lines?.length}
              showNegativeButton
              style={{ margin: '0 20px 0 0', width: '60%' }}
            />
            <Button
              borderRadius='5px'
              fontFamily='PFont-Light'
              fontWeight='300'
              label='Guardar'
              loading={loading}
              onClick={(e) => { e.preventDefault(); onSubmitUpdate() }}
              padding={loading ? '9px' : '13px'}
              primary
              size='large'
              width='140px'
            />
          </Action>
        </ContentModal>
      </AwesomeModal>
    </div>
  )
}
