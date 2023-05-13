import PropTypes from 'prop-types'
import React from 'react'
import { Skeleton } from 'components/Skeleton'
import {
  Sticky,
  StickyBoundary,
  StickyViewport
} from '../stickyheader'
import { CardProducts } from 'pkg-components'
import {
  ContainerCarrusel,
  ContentSearch,
  Title
} from '../styledStore'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BGColor } from '@/public/colors'
import { useDeleteProductsFood } from 'npm-pkg-hook'
import { Loading } from 'components/Loading';

export const ProductCategories = ({
  data = [],
  reference = null,
  sendNotification = () => { return },
  setValueProductName = () => { return },
  handleGetOneProduct = () => { return },
  setAlertBox = () => { return }
}) => {
  const containerStyle = {
    height: '100vh'
  }
  const router = useRouter()
  const { handleDelete, loading } = useDeleteProductsFood({ sendNotification })

  const handleClickDelete = async ({ pId, pState }) => {
    await handleDelete({
      pId,
      pState
    })
  }
  return (
    <>
      {loading &&<Loading />}
      <StickyViewport as='main' style={containerStyle}>
        {data?.map((x, key) => {
          return (
            <div key={x.carProId}>
              <StickyBoundary key={key}>
                <Sticky
                  as='h3'
                  id={key}
                  name={x.pName}
                >
                  <ContentSearch>
                    <Title color={BGColor} size='.9em' >{x.pName} ({x.productFoodsAll?.length || 0})</Title>
                    {/* <input onChange={(e) => {return setValueProductName(e.target.value)}} /> */}
                  </ContentSearch>
                </Sticky>
                <ContainerCarrusel>
                  {x.productFoodsAll?.length > 0 ? x.productFoodsAll?.map(food => {
                    return (
                      <CardProducts
                        food={food}
                        handleDelete={() => { return handleClickDelete(food) }}
                        image={
                          <Image
                            // alt={food.ProDescription || 'img'}
                            alt={'/images/DEFAULTBANNER.png'}
                            blurDataURL='/images/DEFAULTBANNER.png'
                            layout='fill'
                            objectFit='cover'
                            src={'/images/DEFAULTBANNER.png' ?? food.ProImage}
                          />
                        }
                        isVisible={true}
                        key={food.pId}
                        onClick={() => { return handleGetOneProduct(food) }}
                        redirect={() => { return router.push(`/update/products/editar/${food.pId}`) }}
                        setAlertBox={setAlertBox}
                      />
                    )
                  }) : <Skeleton height={200} numberObject={2} />}
                </ContainerCarrusel>
              </StickyBoundary>
              {(key === data.length - 1) &&
                <div ref={reference} style={{ height: '100px', marginTop: '100px' }} />
              }
            </div>
          )
        })}
      </StickyViewport>
    </>
  )}

ProductCategories.propTypes = {
  data: PropTypes.array,
  handleGetOneProduct: PropTypes.func,
  reference: PropTypes.any,
  sendNotification: PropTypes.func,
  setAlertBox: PropTypes.func,
  setValueProductName: PropTypes.func
}
export const StickyBoundaryCategories = React.memo(ProductCategories)
