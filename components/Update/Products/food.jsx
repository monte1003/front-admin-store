/* eslint-disable @next/next/no-img-element */
import { CardProducts } from 'components/CartProduct'
import Cropper from 'react-cropper'

import {
  Button,
  Tag,
  Text
} from 'pkg-components'
import PropTypes from 'prop-types'
import {
  useState,
  useRef,
  useContext
} from 'react'

import { BColor } from '../../../public/colors'
import { AwesomeModal } from '../../AwesomeModal'
import { useSetState } from '../../hooks/useState'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import FormProduct from './Form'

import {
  ActionName,
  ButtonCard,
  Card,
  CardProduct,
  Container,
  ContainerEditImage,
  ContentImg,
  ContentInfo,
  Grid,
  Img,
  Title
} from './styled'
import { ActionStep, Steps, Tabs } from './styles'
import { Context } from '../../../context/Context'
import { ImageItem } from './ImageItem'
import Dessert from './Dessert'
import Row from '~/components/common/Atoms/Row'
import { getFileSizeByUnit } from '~/utils'

export const FoodComponent = ({
  // alt,
  check,
  data,
  dataCategoriesProducts,
  dataFree,
  dispatch,
  fetchMore,
  fileInputRef,
  handleChange,
  handleChangeFilter,
  handleCheckEnvioGratis,
  handleRegister,
  handleDelete,
  image,
  loading,
  names,
  onClickClear,
  onFileInputChange,
  onTargetClick,
  product_state,
  search,
  tagsProps,
  setName,
  setShowMore,
  showMore,
  // src,
  state: grid,
  values,
  ...props
}) => {
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const [active, setActive] = useState(0)
  const { sendNotification } = useContext(Context)
  const { dataTags, handleAddTag, tags: lol } = tagsProps
  const propsForm = {
    handleRegister,
    setName,
    names,
    check,
    handleChange,
    values,
    dataCategoriesProducts,
    handleCheckEnvioGratis,
    image,
    ...props
  }
  const propsListProducts = {
    onClickClear,
    data,
    OPEN_MODAL_ORGANICE,
    dataFree,
    filter: true,
    organice: true,
    handleChangeFilter,
    grid,
    search,
    showMore,
    fetchMore,
    loading,
    setShowMore,
    pState: 1,
    handleDelete,
    ...props
  }
  const [openEditImage, setopenEditImage] = useState(false)
  const handleOpenEditImage = () => {
    setopenEditImage(!openEditImage)
  }
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState({})
  // eslint-disable-next-line
  const changeHandler = (name, value) => {
    if (name === 'tags') {
      setTags(value)
      if (value.length > 0 && errors.tags) {
        setErrors(prev => {
          const prevErrors = { ...prev }
          delete prevErrors.tags
          return prevErrors
        })
      }
    }
  }
  const [existImage, setExistImage] = useState(false)
  const [isImgloading, setLoading] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(0)
  const imageRef = useRef(null)
  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom) => {
    setZoom(zoom)
  }

  const onCropComplete = (crop, pixelCrop) => {
    const canvas = document.createElement('canvas')
    const img = imageRef.current

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      img,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0, 0,
      pixelCrop.width,
      pixelCrop.height)
    // ctx.drawImage(
    //   img,
    //   pixelCrop.x,
    //   pixelCrop.y,
    //   pixelCrop.width,
    //   pixelCrop.height,
    //   0,
    //   0,
    //   canvas.width,
    //   canvas.height
    // )
    const croppedUrl = canvas.toDataURL()
    // console.log(croppedUrl)
    // You can use the croppedUrl for whatever you want
    // for example, you can set it as the src of an img element
    // or send it to a server
    //Convert the dataURL to a blob
    fetch(croppedUrl)
      .then(response => {return response.blob()})
      .then(blob => {
        setLoading(true)
        //Create a new File
        const file = new File([blob], 'cropped_image.jpg', { type: blob.type })
        setPreviewImg(
          file
            ? {
              src: URL.createObjectURL(file),
              alt: ''
            }
            : initialState
        )
        //You can use the file object to send it to a server or to download it
        sendNotification({ title: 'Exito', description: 'Imagen editada' })
        setLoading(false)
        setExistImage(true)
        handleOpenEditImage()
      })
      .catch(() => {
        sendNotification({ title: 'Error', description: 'Ha ocurrido un error!' })
      })
    //You can use the file object to send it to a server or to download it
  }
  function getPixelCrop(image, crop, zoom) {
    const imgWidth = image.naturalWidth
    const imgHeight = image.naturalHeight

    const scaledWidth = imgWidth * zoom
    const scaledHeight = imgHeight * zoom

    const x = (imgWidth * crop.x) / 100
    const y = (imgHeight * crop.y) / 100

    return {
      x: x,
      y: y,
      width: scaledWidth,
      height: scaledHeight
    }
  }
  const handleEditImage = () => {
    handleOpenEditImage()
  }
  const initialState = { alt: '/images/DEFAULTBANNER.png', src: '/images/DEFAULTBANNER.png' }
  const [{ alt, src }, setPreviewImg] = useState(initialState)

  const handleUpdateBanner = async event => {
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
  const [Dimage, setImage] = useState('')
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState()
  const onChange = (e) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      fetch(cropper)
        .then(response => {return response.blob()})
        .then(blob => {
          console.log(blob)
          setLoading(true)
          //Create a new File
          const file = new File([blob], 'cropped_image.jpg', { type: blob.type })
          setPreviewImg(
            file
              ? {
                src: URL.createObjectURL(file),
                alt: ''
              }
              : initialState
          )
          //You can use the file object to send it to a server or to download it
          sendNotification({ title: 'Exito', description: 'Imagen editada' })
          setLoading(false)
          setExistImage(true)
          handleOpenEditImage()
        })
        .catch(() => {
          sendNotification({ title: 'Error', description: 'Ha ocurrido un error!' })
        })
    }
  }
  console.log(cropData)
  return (<>
    <AwesomeModal
      borderRadius='10px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='50vh'
      onCancel={() => { return handleOpenEditImage() }}
      onHide={() => { return handleOpenEditImage() }}
      padding='25px'
      show={openEditImage}
      size='medium'
      zIndex='90'
    >
      <div>
        <div style={{ width: '100%' }}>
          <input onChange={onChange} type='file' />
          <button>Use default img</button>
          <br />
          <br />
          <Cropper
            autoCropArea={1}
            background={false}
            checkOrientation={false}
            guides={true}
            initialAspectRatio={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            preview='.img-preview'
            responsive={true}
            src={Dimage}
            style={{ height: 400, width: '100%' }} // https://github.com/fengyuanchen/cropperjs/issues/671
            viewMode={1}
            zoomTo={0.5}
          />
        </div>
        <div>
          <div className='box' style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className='img-preview' style={{ width: '100%', float: 'left', height: '300px' }} />
          </div>
          <div
            className='box'
            style={{ width: '50%', float: 'right', height: '300px' }}
          >
            <h1>
              <span>Crop</span>
              <button onClick={getCropData} style={{ float: 'right' }}>
              Crop Image
              </button>
            </h1>
            <img
              alt='cropped'
              src={cropData}
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
      {/* <ContainerEditImage>
        <input
          accept='.jpg, .png'
          id='iFile'
          onChange={handleUpdateBanner}
          ref={fileInputRef}
          type='file'
        />
        <div className='crop-container'>
          <div className='guides'>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
          </div>
          <div
            className='crop-overlay'
            style={{
              top: crop.y + '%',
              left: crop.x + '%',
              width: (100 / zoom) + '%',
              height: (100 / zoom) + '%'
            }}
          >
            <img
              alt={alt}
              ref={imageRef}
              src={src}
            />
          </div>
        </div>
        <div className='controls'>
          <Button
            onClick={() => {
              handleOpenEditImage()
              onCropChange({ x: 0, y: 0 })
            } }
          >
            Cancelar
          </Button>
          <input
            max={3}
            min={1}
            onChange={e => {return onZoomChange(e.target.value)}}
            step={0.1}
            type='range'
            value={zoom}
          />
          <Button
            loading={loading || isImgloading}
            onClick={() => {return onCropComplete(crop, getPixelCrop(imageRef.current, crop, zoom))}}
            primary={true}
          >
            Guardar
          </Button>
        </div>
      </ContainerEditImage> */}
    </AwesomeModal>
    <Container>
      <Steps>
        <Tabs active={active === 0}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Detalles
          </Text>
        </Tabs>
        <Tabs active={active === 1}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Precio
          </Text>
        </Tabs>
        <Tabs active={active === 2}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Complementos
          </Text>
        </Tabs>
        <Tabs active={active === 3}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Clasificacion
          </Text>
        </Tabs>
        <Tabs active={active === 4}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Disponibilidad
          </Text>
        </Tabs>
      </Steps>
      <div className='container_step'>
        {active === 0 &&
          <>
            <Card state={'50%'}>
              <FormProduct {...propsForm} />
            </Card>
            <Card state={'50%'}>
              <Text
                color={BColor}
                fontSize={'16px'}
                margin='10px 0'
              >
                Selecciona una imagen para el producto
              </Text>
              <Text
                as='p'
                color={BColor}
                fontSize={'12px'}
                margin='10px 0'
              >
                Es recomendado que subas una imagen  para tu producto
              </Text>
              <ImageItem
                alt={alt}
                onClick={()=> { return handleEditImage() }}
                showImge={existImage}
                src={src}
              />
              <Row>
                <Text fontSize='12px'>
                  Formatos: &nbsp;
                </Text>
                <Text fontSize='16px'>
                  JPGE, JPG, PNG
                </Text>
              </Row>
              <Row>
                <Text fontSize='12px'>
                  Peso máximo: &nbsp;
                </Text>
                <Text fontSize='16px'>
                  200 MB
                </Text>
              </Row>
              {/* <TagsInput
                defaultTags={tags}
                error={errors.tags}
                id='tags'
                label='Tags'
                // emailValidation={true}
                name='tags'
                onChange={changeHandler}
                placeholder='Add tag'
              /> */}
              <CardProducts
                ProDescription={values?.ProDescription}
                ProDescuento={values?.ProDescuento}
                ProPrice={values?.ProPrice}
                ValueDelivery={values.ValueDelivery}
                alt={alt}
                fileInputRef={fileInputRef}
                height={'500px'}
                onFileInputChange={onFileInputChange}
                onTargetClick={onTargetClick}
                pName={names}
                src={src}
                tag={tags}
              />
            </Card>
          </>
        }
        <Card>
          {dataTags.map((tag) => {
            return(
              <Button
                border='none'
                borderRadius='0'
                key={tag.id}
                onClick={() => { return handleAddTag(tag.id, tag.tag) }}
                padding='0'
                style={{ display: 'flex', flexWrap: 'wrap' }}
              >
                <Tag label={tag.tag} />
              </Button>
            )
          })}
        </Card>
      </div>
      <ActionStep>
        <Button >
          Cancelar
        </Button>
        <Button primary>
          Continuar
        </Button>
      </ActionStep>
    </Container>

    {/* <Dessert /> */}
    {/* <ListProducts {...propsListProducts} /> */}
  </>
  )
}

FoodComponent.propTypes = {
  alt: PropTypes.any,
  check: PropTypes.any,
  data: PropTypes.any,
  dataCategoriesProducts: PropTypes.any,
  dataFree: PropTypes.any,
  dispatch: PropTypes.any,
  fetchMore: PropTypes.any,
  fileInputRef: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleCheckEnvioGratis: PropTypes.any,
  handleRegister: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onClickClear: PropTypes.any,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.any,
  product_state: PropTypes.shape({
    PRODUCT_EFFECTIVE: PropTypes.any,
    PRODUCT_RECOGER: PropTypes.any
  }),
  search: PropTypes.any,
  setName: PropTypes.any,
  setShowMore: PropTypes.any,
  showMore: PropTypes.any,
  src: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any
  })
}

export const SkeletonP = () => {
  return <>
    <>
      {[1, 2, 3, 4].map((x) => {
        return (
          <CardProduct key={x + 1}>
            <Skeleton />
          </CardProduct>
        )
      })}
    </>
  </>
}
