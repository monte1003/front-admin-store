import React from 'react'
import { Checkbox } from 'components/Checkbox'
import PropTypes from 'prop-types'
import {
  A11y,
  Navigation,
  Pagination,
  Parallax,
  Virtual
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CateItem, CtnSwiper } from '../styled'

export const MemoSwiperSliderCategory = ({
  datCat,
  checkedItems,
  disabledItems,
  handleChangeCheck
}) => {
  if (!datCat?.catProductsAll) return <div></div>

  return (
    <div>
      <CtnSwiper>
        <Swiper
          autoplay={true}
          modules={[Virtual, Navigation, Pagination, A11y, Parallax]}
          navigation
          slidesPerView={5}
          spaceBetween={10}
          virtual
        >
          {datCat && datCat?.catProductsAll?.map((slideContent, index) => {
            return (
              <SwiperSlide
                key={slideContent.carProId}
                virtualIndex={index}
              >
                <CateItem>
                  <Checkbox
                    checked={checkedItems.has(slideContent.carProId)}
                    disabled={disabledItems.has(slideContent.carProId)}
                    id={slideContent.carProId}
                    onChange={handleChangeCheck}
                  />
                  <div className='name-categorie' htmlFor={`checkbox-${slideContent.carProId}`}>
                    {slideContent?.pName?.slice(0, 15)}
                  </div>
                </CateItem>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </CtnSwiper>
    </div>
  )
}
export const SwiperSliderCategory = React.memo(MemoSwiperSliderCategory)
SwiperSliderCategory.propTypes = {
  checkedItems: PropTypes.shape({
    has: PropTypes.func
  }),
  datCat: PropTypes.shape({
    catProductsAll: PropTypes.shape({
      map: PropTypes.func
    })
  }),
  disabledItems: PropTypes.shape({
    has: PropTypes.func
  }),
  handleChangeCheck: PropTypes.func
}
