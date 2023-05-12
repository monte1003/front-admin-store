import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { OptionalExtraProducts } from 'container/producto/extras'
import styled, { css } from 'styled-components'
import {
  MemoCardProductSimple,
  Text,
  Button,
  AwesomeModal
} from 'pkg-components'
import {
  useFormTools,
  useGetOneProductsFood,
  useEditProduct
} from 'npm-pkg-hook'
import { GET_ONE_PRODUCTS_FOOD } from '../queries'
import { UPDATE_PRODUCT_FOOD } from 'container/update/Products/queries'
import { GET_ALL_CATEGORIES_WITH_PRODUCT } from 'container/dashboard/queries'
import { useMutation } from '@apollo/client'
import { updateCache } from 'utils'
import {
  BColor,
  BGColor
} from 'public/colors'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { Context } from 'context/Context'
import { useRouter } from 'next/router'
import { ExtrasProductsItems } from '../extras/ExtrasProductsItems'
import { Form } from './Form'
import { Loading } from 'components/Loading'

export const ProductEdit = ({ id }) => {
  // STATES
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const initialState = { alt: '/images/DEFAULTBANNER.png', src: '/images/DEFAULTBANNER.png' }
  const [modal, openModal] = useState(false)
  const [showDessert, setShowDessert] = useState(false)
  const { setAlertBox } = useContext(Context)
  const [{ alt, src }, setPreviewImg] = useState(initialState)
  const router = useRouter()
  // QUERIES
  const [handleGetOneProduct,
    {
      loading,
      error,
      data: dataProduct,
      dataExtra,
      dataOptional
    }
  ] = useGetOneProductsFood()
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)
  const [editProductFoods] = useEditProduct()
  const { getStore, pState } = dataProduct || {}
  useEffect(() => {
    handleGetOneProduct({ pId: id })
    if (dataProduct) {
      setDataValue({
        ...dataProduct || {}
      })
    }
    // eslint-disable-next-line
  }, [id, loading, error])
  // HANDLESS
  const onFileInputChange = event => {
    const { files } = event.target
    setPreviewImg(
      files.length
        ? {
          src: URL.createObjectURL(files[0]),
          alt: files[0].name
        }
        : initialState
    )

  }
  const onHideDessert = () => {
    setShowDessert(false)
  }
  const handleForm = (e) => {
    e.preventDefault()
    return handleSubmit({
      event: e,
      action: () => {
        const { pName, ProPrice, ProDescuento, ValueDelivery, ProUniDisponibles, ProDescription, ProProtegido, ProAssurance, ProWidth, ProHeight, ProLength, ProWeight, ProQuantity, ProOutstanding, ProDelivery, ProVoltaje, pState, sTateLogistic } = dataForm || {}
        return editProductFoods({
          variables: {
            input: {
              pId: id,
              pName,
              ProPrice: parseFloat(ProPrice),
              ProDescuento: parseFloat(ProDescuento),
              ValueDelivery: parseFloat(ValueDelivery),
              ProUniDisponibles,
              ProDescription,
              ProProtegido,
              ProAssurance,
              ProWidth,
              ProHeight,
              ProLength,
              ProWeight,
              ProQuantity,
              ProOutstanding,
              ProDelivery,
              ProVoltaje,
              pState,
              sTateLogistic
            }
          }, update: (cache, { data: { productFoodsOne } }) => {
            return updateCache({
              cache,
              query: GET_ONE_PRODUCTS_FOOD,
              nameFun: 'productFoodsOne',
              dataNew: productFoodsOne
            })
          }
        })
      }
    })

  }
  const fileInputRef = useRef(null)
  const onTargetClick = e => {
    e.preventDefault()

    fileInputRef.current.click()
  }
  const handleDelete = () => {
    updateProductFoods({
      variables: {
        input: {
          pId: id,
          pState
        }
      }, update(cache) {
        cache.modify({
          fields: {
            productFoodsAll(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_PRODUCT_STORE, data: dataOld })
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
        setAlertBox({ message: 'El producto ha sido eliminado', color: 'error', duration: 7000 })
      }
    }).then(() => {
      router.back()
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  return (
    <Container>
      {loading && <Loading />}
      <>
        <Form
          alt={alt}
          dataForm={dataForm}
          errorForm={errorForm}
          fileInputRef={fileInputRef}
          getStore={getStore || {}}
          handleChange={handleChange}
          handleForm={handleForm}
          onFileInputChange={onFileInputChange}
          onTargetClick={onTargetClick}
          src={src}
        />
        <>
          <div>
            <Text
              fontSize='16px'
              fontWeight='bold'
              margin='10px 0'
            >
              Vista previa
            </Text>
            <MemoCardProductSimple
              del={true}
              edit={false}
              handleDelete={() => { return handleDelete() }}
              {...dataForm}
            />
          </div>
          <div>
            <Button
              backgroundColor='transparent'
              color={BColor}
              fontFamily='PFont-Light'
              fontWeight='300'
              label='Añadir Adicionales'
              onClick={() => { return openModal(!modal) }}
              ripple
            />
            <Button
              fontFamily='PFont-Light'
              fontWeight='300'
              label='Añadir Sobremesa'
              onClick={() => { return setShowDessert(!showDessert) }}
            />
            <ExtrasProductsItems
              dataExtra={dataExtra || []}
              dataOptional={dataOptional || []}
              modal={modal}
              pId={id}
              setModal={() => { return openModal(!modal) }}
            />
            <AwesomeModal
              customHeight='calc(100vh - 100px)'
              footer={false}
              header={true}
              onHide={() => { return onHideDessert()}}
              show={showDessert}
              size='100vw'
              zIndex='999999999'
            >
              <OptionalExtraProducts
                dataOptional={dataOptional || []}
                pId={id}
              />
            </AwesomeModal>
          </div>

        </>
      </>

    </Container>
  )
}

ProductEdit.propTypes = {
  id: PropTypes.string
}

export const InputFile = styled.input`
    /* display: none;    */
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    color: ${BColor};
    opacity: 0;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    z-index: 999; 
    top: ${({ top }) => { return top ? top : '20px' }};
    transition-delay: ${({ delay }) => { return delay ? delay : 'auto' }};
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => {
    return props.grid && css`
        top: ${({ top }) => { return top ? top : '80px' }};
        `}
}
`

const Container = styled.div`
    padding: 30px;
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    width: 90%;
    grid-gap: 19px 12px;  
`
