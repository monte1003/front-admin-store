import React from 'react'
import { Skeleton } from '~/components/Skeleton'
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

export const ProductCategories = ({
  data = [],
  reference = null,
  handleGetOneProduct = () => { return },
  setAlertBox = () => { return }
}) => {
  const containerStyle = {
    height: '100vh'
  }
  const router = useRouter()
  return (
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
                  <Title size='.9em'>{x.pName} ({x.productFoodsAll?.length || 0})</Title>
                </ContentSearch>
              </Sticky>
              <ContainerCarrusel>
                {x.productFoodsAll?.length > 0 ? x.productFoodsAll?.map(food => {
                  return (
                    <CardProducts
                      food={food}
                      image={
                        <Image
                          alt={food.ProDescription || 'img'}
                          blurDataURL='/images/DEFAULTBANNER.png'
                          layout='fill'
                          objectFit='cover'
                          src={food.ProImage}
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
            {/* get last children */}
            {(key === data.length - 1) &&
              <div ref={reference} style={{ height: '100px', marginTop: '100px' }} />
            }
          </div>
        )
      })}
    </StickyViewport>
  )}
export const StickyBoundaryCategories = React.memo(ProductCategories)
