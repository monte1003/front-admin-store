'use strict'

import Sequelize from 'sequelize'
let sequelize = null

// eslint-disable-next-line consistent-return
export default function connect () {
  try {
    if (!sequelize) {
      sequelize = new Sequelize(
        'bsm58gjtynob5wvyvpo3', //nombre Base de datos process.env.NAMEDB
        'um6z9noxxvjg5b1v', //nombre usuario base de datos process.env.USERDB
        'qcV3ROSpVDim28bmmutN', // clave de base de datos, process.env.PASSDB
        // `mysql://2fwzwic1j607u5cun570:pscale_pw_7hsC2FRUbdlsR3G2TkScCbH1CyNQ3iPxaUFmAONaKuS@us-east.connect.psdb.cloud/admin-store?ssl={'rejectUnauthorized':true}`,
        // `mysql://2fwzwic1j607u5cun570:pscale_pw_7hsC2FRUbdlsR3G2TkScCbH1CyNQ3iPxaUFmAONaKuS@us-east.connect.psdb.cloud/admin-store?ssl={'rejectUnauthorized':false}`,

        {
          host: 'bsm58gjtynob5wvyvpo3-mysql.services.clever-cloud.com', //process.env.HOSTDB
          dialectOptions: {
            ssl: {
              rejectUnauthorized: true
            }
          },
          // logging: false,
          port: 3306,
          dialect: 'mysql' //process.env.DIALECTDB
        }
      )
    }

    //
    return sequelize
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('/**** Error de conexión con base de datos, algunos datos erroneos o el .env no existe.')
  }
}
// Host: sql9.freesqldatabase.com
// Database name: sql9592652
// Database user: sql9592652
// Database password: 3DyXaRGik6
// Port number: 3306