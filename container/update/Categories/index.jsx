/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Categories } from '../../../components/Update/Categories'
import { GET_ALL_CATEGORIES, UPDATE_CATEGORIES } from './queries'
import { useCategories } from '../../../components/hooks/useCategories'

export const CategoriesC = () => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({})
  const [finalData] = useCategories()
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  // Estado para las estrellas del Categoría
  const [rating, setRating] = useState(0)
  const [updateCategoryProducts] = useMutation(UPDATE_CATEGORIES)

  // Contexto de las notificaciones
  const handleRegister = async e => {
    e.preventDefault()
    const cpImage = 'https://http2.mlstatic.com/D_NQ_NP_806765-MLC46669921180_072021-O.webp'
    const { cpName } = values
    try {
      updateCategoryProducts({
        variables: {
          input: { cpName, cpImage }
        }, update(cache) {
          cache.modify({
            fields: {
              CategoryProductsAll(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
              }
            }
          })
        }
      }).catch(() => { return })
    }
    catch (error) {
      return
    }
  }
  const handleDelete = caId => {
    const value = finalData?.CategoryProductsAll?.filter(x => {return (x.caId === caId)})
    const cpState = value[0]?.cpState
    updateCategoryProducts({
      variables: {
        input: {
          caId,
          cpState

        }
      }, update(cache) {
        cache.modify({
          fields: {
            CategoryProductsAll(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CATEGORIES, data: dataOld })
            }
          }
        })
      }
    }).catch(() => { return })
  }
  // Filtrar product
  const [search, setSearch] = useState('')
  const handleChangeFilter = e => {
    setSearch(e.target.value)
  }
  const [CategoryProductsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_CATEGORIES, { fetchPolicy: 'network-only', variables: { search } })
  const [dataCategories, setData] = useState([])
  const [showMore, setShowMore] = useState(100)
  useEffect(() => {
    dataProduct && setData([...dataProduct.CategoryProductsAll])
  }
  , [dataProduct])
  useEffect(() => {
    CategoryProductsAll({ variables: { max: showMore } })
  }, [showMore])
  return (
    <Categories
      data={dataCategories}
      errors={errors}
      handleChange={handleChange}
      handleChangeFilter={handleChangeFilter}
      handleDelete={handleDelete}
      handleRegister={handleRegister}
      rating={rating}
      search={search}
      setRating={setRating}
      setShowMore={setShowMore}
      // Datos de filtro
      values={values}
      valuesForm={values}
      // Slider
      // Datos del areas

    />
  )
}