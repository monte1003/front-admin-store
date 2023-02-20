import { gql } from '@apollo/client'

export const CHANGE_STATE_STORE_PEDIDO = gql`
mutation changePPStatePPedido($pPStateP: Int, $pCodeRef: String, $pDatMod: String) {
  changePPStatePPedido(pPStateP: $pPStateP, pCodeRef: $pCodeRef,  pDatMod: $pDatMod){
    success
    message
  }
}

`
export const GET_ALL_PEDIDOS = gql`
query getAllPedidoStoreFinal($idStore: ID, $search: String, $min: Int, $max: Int, $statusOrder: Int) {
  getAllPedidoStoreFinal(idStore: $idStore, search: $search, min: $min, max: $max, statusOrder: $statusOrder) {
    pdpId
    idStore
    pCodeRef
    payMethodPState
    pPRecoger
    totalProductsPrice
    pSState
    pDatCre
    locationUser
    pDatMod
    getAllPedidoStore{
        pdpId
        pId
        idStore
        ShoppingCard
        pCodeRef
        pPStateP
        payMethodPState
        pPRecoger
        pDatCre
        pDatMod
        getAllShoppingCard {
          ShoppingCard
          comments
          cantProducts
          pId
        productFood{
          pId
          carProId
          colorId
          idStore
          pName
          ProPrice
          ProDescuento
          ProDescription
          ValueDelivery
          ProImage
          ProStar
          pState
          pDatCre
          pDatMod
        }
      }
    }
  }
}
`