import Sequelize from 'sequelize'
import SequelizeConnection from '../SequelizeConnection';

const StockData = SequelizeConnection.define('stockdata', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	stocktickers: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: false,
		unique: true
	},
	dataselection: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: false,
		unique: true
	},
});

export default StockData