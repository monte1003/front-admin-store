import { DATE, INTEGER, literal, STRING, TINYINT } from 'sequelize'
import connect from '../../db'
import { enCode } from '../../utils/util'
import Users from '../Users'
import Store from './Store'
const sequelize = connect()
sequelize.sync()

const StatusPedidosModel = sequelize.define('statuspedidos', {
  stPId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: INTEGER,
    allowNull: true
  },
  idStore: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Store,
      key: 'idStore'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  pSState: {
    type: TINYINT,
    defaultValue: 0
  },
  valueDelivery: {
    type: INTEGER,
    defaultValue: 0
  },
  locationUser: {
    type: STRING,
    allowNull: true
  },
  pCodeRef: {
    type: STRING(100),
    unique: true,
    allowNull: false
  },
  change: {
    type: INTEGER,
    allowNull: true
  },
  totalProductsPrice: {
    type: INTEGER,
    allowNull: false
  },
  payMethodPState: {
    type: TINYINT,
    defaultValue: 1
  },
  pickUp: {
    type: TINYINT,
    defaultValue: 0
  },
  pPDate: {
    type: DATE
  },
  pDatCre: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  pDatMod: {
    type: 'TIMESTAMP',
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: true
})

export default StatusPedidosModel