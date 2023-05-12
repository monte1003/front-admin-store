import PropTypes from 'prop-types'
import { Checkbox } from 'components/Checkbox'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { numberFormat } from 'utils'
import { InputHook } from '../Input'
import { CardInput, FormProducts } from '../styled'

const FormProduct = ({
  names,
  handleChange,
  values,
  setName,
  dataCategoriesProducts,
  handleCheckFreeShipping,
  check,
  errors
}) => {
  return (
    <FormProducts className='form-horizontal'>
      <InputHook
        error={errors.names}
        label='Nombre del producto'
        name='name'
        onChange={e => { return setName(e.target.value) }}
        placeholder='Nombre del producto'
        range={{ min: 0, max: 180 }}
        required
        type='text'
        value={names}
      />
      <CardInput>
        <InputHook
          error={errors.ProPrice}
          label='Precio de producto'
          name='ProPrice'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          required
          value={numberFormat(values?.ProPrice)}
        />
        <InputHook
          error={errors.ProDescuento}
          label='Descuento'
          name='ProDescuento'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          value={numberFormat(values?.ProDescuento)}
        />
      </CardInput>
      <CardInput>
        <InputHook
          disabled={check.desc}
          error={errors.ValueDelivery}
          label='Costo de envío'
          name='ValueDelivery'
          onChange={handleChange}
          range={{ min: 0, max: 180 }}
          required
          value={numberFormat(values?.ValueDelivery)}
        />
        <CardInput onChange={handleCheckFreeShipping}>
          <Checkbox
            checked={check?.desc}
            id='checkboxF'
            label='Envío gratis'
            name='desc'
            onChange={handleCheckFreeShipping}
            value={check?.desc}
          />
        </CardInput>
      </CardInput>
      <NewSelect
        error={errors.carProId}
        id='carProId'
        name='carProId'
        onChange={handleChange}
        optionName='pName'
        options={dataCategoriesProducts || []}
        title='Categoría'
        value={values?.carProId}
      />
      <InputHooks
        TypeTextarea
        height='200px'
        name='ProDescription'
        onChange={handleChange}
        range={{ min: 0, max: 180 }}
        title='Description'
        value={values?.ProDescription}
      />
    </FormProducts>
  )
}

FormProduct.propTypes = {
  check: PropTypes.shape({
    desc: PropTypes.any
  }),
  dataCategoriesProducts: PropTypes.array,
  errors: PropTypes.shape({
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any,
    carProId: PropTypes.any,
    names: PropTypes.any
  }),
  handleChange: PropTypes.any,
  handleCheckFreeShipping: PropTypes.any,
  names: PropTypes.any,
  setName: PropTypes.func,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any,
    carProId: PropTypes.any
  })
}

export default FormProduct