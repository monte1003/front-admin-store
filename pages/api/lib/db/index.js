'use strict'
import Sequelize from 'sequelize'

let sequelize = null

function connect () {
  try {
    if (!sequelize) {
      sequelize = new Sequelize(
        process.env.NAMEDB, //nombre Base de datos process.env.NAMEDB
        process.env.USERDB, //nombre usuario base de datos process.env.USERDB
        process.env.PASSDB, // clave de base de datos, process.env.PASSDB
        {
          host: process.env.HOST_DB,
          logging: false,
          port: process.env.MYSQL_PORT,
          dialect: process.env.DIALECTDB
        }
      )
    }
  } catch (error) {
    throw new Error(error)
  }
  return sequelize
}

export default connect