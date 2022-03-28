const connectionString = require('../utils/db')
const {Model, DataTypes} = require("sequelize");

class Star extends Model {}
Star.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize:connectionString,
    modelName: 'stars',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Star
