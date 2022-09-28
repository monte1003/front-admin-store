import {
  DELETE_CAT_EXTRA_PRODUCTS,
  DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS,
  DELETE_EXTRA_PRODUCTS,
  GET_ALL_EXTRA_PRODUCT
} from 'container/dashboard/queries'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from 'container/update/Products/queries'
import { Context } from 'context/Context'
import { useSetState } from 'hooks/useState'
import { useMutation } from '@apollo/client'
import { IconMiniCheck } from 'public/icons'
import {
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { updateCache } from 'utils'
import Column from 'components/common/Atoms/Column'
import { useFormTools } from 'npm-pkg-hook'
import Items from './Items'
import { Optional } from './Optional'
import { CreateExtra } from './CreateExtra'
import { EditExtra } from './EditExtra'
import { GarnishChoicesHeader } from './styled'

export const ExtrasProductsItems = ({
  pId,
  dataOptional,
  editing = true,
  dataExtra,
  setModal,
  modal
}) => {
  // eslint-disable-next-line
  const [handleChange, _handleSubmit, handleForcedData, { dataForm }] = useFormTools()
  const { setAlertBox } = useContext(Context)
  const OPEN_MODAL_CAT_EXTRA = useSetState(false)
  const INFO_EXTRA = useSetState({})

  const initialLine = useMemo(() => {
    return {
      extraName: '',
      extraPrice: '',
      exState: false
    }
  }, [])

  const initialLineItems = useMemo(() => {
    return {
      Lines: [
        {
          extraName: '',
          extraPrice: '',
          exState: false
        },
        (initialLine)
      ]
    }
  }, [initialLine])
  const [LineItems, setLine] = useState(initialLineItems)

  // HANDLES
  const CleanLines = useCallback(() => {
    setLine(initialLineItems)
  }, [initialLineItems])

  //  QUERIES
  const [updateMultipleExtProductFoods] = useMutation(UPDATE_MULTI_EXTRAS_PRODUCT_FOOD, {
    onCompleted: () => {
      CleanLines()
    }
  })
  const [deleteextraproductfoods] = useMutation(DELETE_EXTRA_PRODUCTS, {
    onCompleted: () => { CleanLines() }
  })
  const [DeleteExtProductFoodsOptional] = useMutation(DELETE_CAT_EXTRA_PRODUCTS)
  const [DeleteExtFoodSubsOptional] = useMutation(DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS)

  const handleAdd = () => {
    const Lines = [...LineItems.Lines, { ...initialLine }, { ...initialLine }]
    setLine({ ...LineItems, Lines })
  }
  const handleLineChange = useCallback((index, name, value) => {
    const Lines = LineItems.Lines.map((salesLine, i) => {
      if (i === index) {
        const newLine = { ...salesLine }
        if (name === 'extraName' && 'extraPrice') {
          newLine[name] = value

        } else if (name === 'exState') {
          const { checked } = value.target
          newLine[name] = checked
        } else {
          newLine[name] = value
        }
        return newLine
      }
      return { ...salesLine }
    })

    setLine({ ...LineItems, Lines })
  }, [LineItems])
  const handleRemove = i => {
    const Lines = LineItems?.Lines?.filter((_, index) => { return index !== i })
    setLine({ ...LineItems, Lines })
  }
  const dataArr = LineItems?.Lines?.map(x => { return { extraPrice: parseFloat(x.extraPrice), exState: x.exState === true ? 1 : 0, extraName: x.extraName, pId: pId } })
  const onSubmitUpdate = async () => {
    // e.preventDefault()
    try {
      await updateMultipleExtProductFoods({
        variables: {
          inputLineItems: {
            setData: dataArr || []
          }
        },
        update: (cache, { data: { ExtProductFoodsAll } }) => {
          return updateCache({
            cache,
            query: GET_ALL_EXTRA_PRODUCT,
            nameFun: 'ExtProductFoodsAll',
            dataNew: ExtProductFoodsAll
          })
        }
      }).then(() => { return {} })
      // setModal(false)
    } catch (error) {
      setAlertBox({ message: `${error}`, duration: 7000 })
    }
  }
  // DELETE ADICIONAL
  const handleDeleteAdditional = async elem => {
    const { state, exPid } = elem || {}
    deleteextraproductfoods({
      variables: {
        state,
        id: exPid
      }, update: (cache, { data: { ExtProductFoodsAll } }) => {
        return updateCache({
          cache,
          query: GET_ALL_EXTRA_PRODUCT,
          nameFun: 'ExtProductFoodsAll',
          dataNew: ExtProductFoodsAll
        })
      }
    })
  }
  const handleDeleteCatOptional = async elem => {
    const { state, opExPid } = elem || {}
    DeleteExtProductFoodsOptional({
      variables: {
        state: state,
        opExPid: opExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    })
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
  }
  const handleDeleteItemSubOptional = async elem => {
    const { state, opSubExPid } = elem || {}
    DeleteExtFoodSubsOptional({
      variables: {
        state: state,
        opSubExPid: opSubExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    }).then(res => { return setAlertBox({ message: res?.message?.DeleteExtFoodSubsOptional?.message }) })
  }

  const handleOpenExtra = async elem => {
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
    INFO_EXTRA.setState(elem)
    handleForcedData({ ...elem })
  }
  return (
    <Column>
      {dataExtra?.length > 0 &&
      <form onSubmit={() => { return editing && onSubmitUpdate() }} >
        <GarnishChoicesHeader onClick={() => { return editing && setModal(!modal) }}>
          <div>
            <p className='garnish-choices__title'>Adicionales</p>
            <p className='garnish-choices__title-desc'>Escoge hasta 3 opciones.</p>
          </div>
          <IconMiniCheck color={'#009b3a'} size={'15px'} />
        </GarnishChoicesHeader>
        <Items
          dataExtra={dataExtra}
          editing={editing}
          handleDeleteAdditional={handleDeleteAdditional}
        />
      </form>
      }

      <Optional
        dataOptional={dataOptional}
        editing={editing}
        handleDeleteItemSubOptional={handleDeleteItemSubOptional}
        handleLineChange={handleLineChange}
        handleOpenExtra={handleOpenExtra}
      />
      {editing &&
      <>
        <CreateExtra
          CleanLines={CleanLines}
          LineItems={LineItems}
          handleAdd={handleAdd}
          handleLineChange={handleLineChange}
          handleRemove={handleRemove}
          modal={modal}
          onSubmitUpdate={onSubmitUpdate}
          setModal={setModal}
        />
        <EditExtra
          INFO_EXTRA={INFO_EXTRA}
          OPEN_MODAL_CAT_EXTRA={OPEN_MODAL_CAT_EXTRA}
          dataForm={dataForm}
          handleChange={handleChange}
          handleDeleteCatOptional={handleDeleteCatOptional}
        />
      </>}
    </Column >
  )
}
