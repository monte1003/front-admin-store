import { INTEGER, STRING, literal, TEXT } from 'sequelize'
import connect from '../../db'
const sequelize = connect()
import { enCode } from '../../utils/util'
import Users from '../Users'
import Store from '../Store/Store'

sequelize.sync()
const Contract = sequelize.define('contract', {
  ctrId: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get(x) { return enCode(this.getDataValue(x)) }
  },
  id: {
    type: INTEGER,
    unique: true,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: Users,
      key: 'id'
    },
    get(x) { return enCode(this.getDataValue(x)) }
  },
  idStore: {
    unique: true,
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
  ctCode: {
    type: TEXT,
    allowNull: false
  },
  catDescription: {
    type: STRING,
    allowNull: true
  },
  createAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updateAt: {
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false
})

export default Contract