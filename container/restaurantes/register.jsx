/* eslint-disable no-unused-vars */
import React from 'react'
import { RippleButton } from '../../components/Ripple'
import { EColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import { Content, Form } from './styled'

export const RegisterRestaurant = () => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  return (
    <Content>
      <Form>
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Informa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return}}
          type='button'
          widthButton='100%'
        >Correo</RippleButton>
      </Form>
    </Content>
  )
}
