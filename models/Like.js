const connectionString = require('../utils/db')
const {Model, DataTypes} = require("sequelize");

class Like extends Model {}
Like.init({
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    sequelize:connectionString,
    modelName: 'like',
    timestamps: false,
    createdAt: 'created_at',
});

module.exports = Like

