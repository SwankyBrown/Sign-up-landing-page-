const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING({length: 60}),
        hashedPass: DataTypes.STRING({length: 500})
    })
}
