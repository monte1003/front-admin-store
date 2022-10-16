import React from 'react'
import { Skeleton } from '~/components/Skeleton'
import {
  Sticky,
  StickyBoundary,
  StickyViewport
} from '../stickyheader'
import { CardProducts } from 'pkg-components'
import { useOnScreen } from 'npm-pkg-hook'
import {
  ContainerCarrusel,
  ContentSearch,
  Title
} from '../styledStore'
import { useRouter } from 'next/router'

export const ProductCategories = ({
  data = [],
  handleGetOneProduct = () => { return },
  setAlertBox = () => { return }
}) => {
  const containerStyle = {
    height: '100vh'
  }
  const [setRef, isVisible] = useOnScreen()
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
                      isVisible={isVisible}
                      key={food.pId}
                      onClick={() => { return handleGetOneProduct(food) }}
                      redirect={() => { return router.push(`/update/products/editar/${food.pId}`) }}
                      setAlertBox={setAlertBox}
                      setRef={setRef}
                    />
                  )
                }) : <Skeleton height={200} numberObject={2} />}
              </ContainerCarrusel>
            </StickyBoundary>
          </div>
        )
      })}
    </StickyViewport>
  )}
export const StickyBoundaryCategories = React.memo(ProductCategories)
