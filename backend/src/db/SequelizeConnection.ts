import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'
const ENV_VARS = dotenv.config().parsed as any

const SequelizeConnection = new Sequelize(
  ENV_VARS.PG_DATABASE,
  ENV_VARS.PG_USER,
  ENV_VARS.PG_PASSWORD,
  {
    host: ENV_VARS.PG_HOST,
    dialect: ENV_VARS.PG_DIALECT
  })

export default SequelizeConnection