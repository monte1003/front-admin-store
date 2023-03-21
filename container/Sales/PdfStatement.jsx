import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import React from 'react'
import PropTypes from 'prop-types'
import { numberFormat } from 'utils'
import { PColor } from '@/public/colors'

// Create styles
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20
  },
  section: {
    paddingBottom: 20
  },
  sectionInfo: {
    paddingBottom: 20,
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row'
    // flexWrap: 'wrap'
  },
  sectionHeader: {
    flexDirection: 'column',
    lineHeight: 4,
    paddingVertical: 10
  },
  viewParagraph: {
    paddingTop: 15,
    paddingBottom: 10
  },
  tableSection: {
    flexDirection: 'column',
    paddingVertical: 20
  },
  tableRow: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: `${PColor}`,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableRowItems: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%'
  },
  tableCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    overflow: 'hidden',
    borderColor: `${PColor}`,
    paddingHorizontal: 1,
    paddingVertical: 10,
    fontSize: 7
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
    paddingVertical: 1,
    fontSize: 7
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    alignSelf: 'flex-end'
  },
  subtitle: {
    fontSize: 7,
    color: '#000',
    textDecoration: 'underline',
    textAlign: 'right'
  },
  row: {
    padding: 5,
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    padding: 1,
    justifyContent: 'center',
    backgroundColor: `${PColor}`
  },
  textHeader: {
    color: `${PColor}`,
    fontSize: 10

  },
  image: {
    objectFit: 'contain'
  }
})

const InvoicePdfGenerate = ({ data }) => {
  const {
    srcLogo,
    date,
    products,
    total,
    client,
    change,
    storePhone
  } = data || {}
  const { 
    ccClient,
    clientName,
    clientNumber
  } = client || {}
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.row}>
          <Text style={styles.subtitle}> Documento generado {date}</Text>
        </View>
        <View style={{ width: 250, height: 100, marginBottom: 8 }}>
          <Image src={srcLogo ?? '/images/DEFAULTBANNER.png'} style={[styles.image, { width: '100%', height: '100%' }]} />
        </View>
        <View style={styles.sectionHeader}>
          {clientName && <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Nombre del cliente: {clientName} </Text>}
          {ccClient && <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Cc del cliente: {ccClient} </Text>}
          {clientNumber && <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Numero de télefono del cliente: {clientNumber}</Text>}
          <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}> Numero del restaurante {storePhone}</Text>
          <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>{date}</Text>
          <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}> 234324 </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>234324</Text>
        </View>
        <View style={styles.tableSection}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { fontSize: 15, width: '25%', textAlign: 'start', color: '#fff', borderBottom: 'none', fontWeight: 500 }]}>Nombre</Text>
            <Text style={[styles.tableCell, { fontSize: 15, width: '25%', textAlign: 'start', color: '#fff', borderBottom: 'none', fontWeight: 500 }]}>Cantidad</Text>
            <Text style={[styles.tableCell, { fontSize: 15, width: '25%', textAlign: 'start', color: '#fff', borderBottom: 'none', fontWeight: 500 }]}>Precio</Text>
            <Text style={[styles.tableCell, { fontSize: 15, width: '25%', textAlign: 'start', color: '#fff', borderBottom: 'none', fontWeight: 500 }]}>Total</Text>
          </View>
          {products?.length > 0 ? products?.map((product) => {
            const ProPrice = `${numberFormat(product?.ProPrice)}`
            const unitPrice = `${numberFormat(product?.unitPrice)}`
            return (
              <View key={product.pId} style={styles.tableRowItems}>
                <Text style={[styles.tableCell, { fontSize: 14, width: '25%', textAlign: 'start' }]}>{product.pName}</Text>
                <Text style={[styles.tableCell, { fontSize: 14, width: '25%', textAlign: 'start' }]}>{product.ProQuantity}</Text>
                <Text style={[styles.tableCell, { fontSize: 14, width: '25%', textAlign: 'start' }]}>{unitPrice}</Text>
                <Text style={[styles.tableCell, { fontSize: 14, width: '25%', textAlign: 'start' }]}>{ProPrice}</Text>
              </View>
            )}) : <View></View>}
        </View>
        <View style={[styles.sectionInfo]}>
          <View>
            <View style={{ width: 300, marginBottom: 8 }}>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}>Total</Text>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}> {total}</Text>
            </View>
          </View>
          <View>
            {change && <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}>Total cambio</Text>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}> $ {change} </Text>
            </View>}
            <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}>Total de la venta </Text>
              <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}> {total} </Text>

            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={{ paddingBottom: 10 }}>{total} </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export const generatePdfDocumentInvoice = async ({ data, titleFile }) => {
  const blob = await pdf((
    <InvoicePdfGenerate data={data} title={titleFile} />
  )).toBlob()
  saveAs(blob, `${titleFile}` || 'Doc')
}

generatePdfDocumentInvoice.propTypes = {
  pdfDocumentData: PropTypes.object
}