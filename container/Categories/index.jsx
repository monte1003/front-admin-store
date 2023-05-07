import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { RippleButton, AwesomeModal, InputHooks } from 'pkg-components'
import { PColor, WColor } from 'public/colors'
import { Item } from 'components/Update/Products/styled'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import {
  useCategoryInStore,
  useFormTools
} from 'npm-pkg-hook'
import { Context } from 'context/Context'
import { IconDelete } from '../../public/icons'
import {
  DELETE_ONE_CAT_PRODUCTS_FINAL,
  GET_ALL_CATEGORIES_WITH_PRODUCT,
  GET_ULTIMATE_CATEGORY_PRODUCTS
} from '../dashboard/queries'
import { Loading } from 'components/Loading'
import { useSetState } from 'hooks/useState'
import { REGISTER_CAT_OF_PRODUCTS } from '../dashboard/queriesStore'

export const Categories = () => {
  const {
    data: datCat
  } = useCategoryInStore({})
  const { setAlertBox } = useContext(Context)
  const [handleChange, handleSubmit, handleForcedData, { dataForm, errorForm }] = useFormTools()
  const SHOW_CATEGORIES = useSetState(false)
  // QUERIES
  const [updatedProducts, { loading }] = useMutation(REGISTER_CAT_OF_PRODUCTS, {
    onError: (e) => {
      setAlertBox({
        type: 'error',
        message: e.message.replace('GraphQL error: Ocurrió un error', '')
      })
    }
  })
  const [deleteCatFinalOfProducts] = useMutation(DELETE_ONE_CAT_PRODUCTS_FINAL, {
    onError: (e) => {
      setAlertBox({
        message: e.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          catProductsAll(dataOld = []) {
            return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
          }
        }
      })
    }
  })

  // HANDLES
  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        const { catName, catDescription } = dataForm
        return updatedProducts({
          variables: {
            input: {
              pName: catName,
              ProDescription: catDescription
            }
          },
          update(cache) {
            cache.modify({
              fields: {
                catProductsAll(dataOld = []) {
                  return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                }
              }
            })
            cache.modify({
              fields: {
                getCatProductsWithProduct(dataOld = []) {
                  return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
                }
              }
            })
          }
        })
      },
      actionAfterSuccess: () => {
        handleForcedData({})
        SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)
      }
    })
  }

  return (
    <>
      {loading && <Loading />}
      <RippleButton onClick={() => { return SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }}>
        Adicionar Categorías
      </RippleButton>
      <Table
        data={datCat}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
              <Item>
                <span># {x.pName}</span>
              </Item>
              <Item>
                <span> {x.ProDescription}</span>
              </Item>
              <Item>
                <button
                  onClick={() => {
                    return deleteCatFinalOfProducts({
                      variables: { idPc: x.carProId }, update(cache) {
                        cache.modify({
                          fields: {
                            catProductsAll(dataOld = []) {
                              return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                            }
                          }
                        })
                      }
                    })
                  }}
                >
                  <IconDelete color={PColor} size={20} />
                </button>
              </Item>
            </Section>
          })
        }
        }
        titles={[
          { name: 'Nombre', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Descripción', justify: 'flex-center', width: '1fr' },
          { name: 'Borrar', justify: 'flex-center', width: '1fr' }
        ]}
      />
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        customHeight='min-content'
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }}
        padding='25px'
        show={SHOW_CATEGORIES.state}
        size='medium'
        zIndex='90'
      >
        <form className='form-horizontal' onSubmit={(e) => { return handleForm(e) }}>
          <InputHooks
            error={errorForm?.catName}
            name='catName'
            onChange={handleChange}
            required
            title='Nombre de la categoría'
            value={dataForm?.catName}
            width='100%'
          />
          <InputHooks
            TypeTextarea
            error={errorForm?.catDescription}
            name='catDescription'
            onChange={handleChange}
            title='Description'
            value={dataForm?.catDescription}
            width='100%'
          />
          <RippleButton type='submit'>
            Submit
          </RippleButton>
        </form>
      </AwesomeModal>
    </>
  )
}

Categories.propTypes = {
  SHOW_MODAL_UPDATE_PRODUCTS: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  })
}
