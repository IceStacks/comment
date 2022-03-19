const connectionString = require('../utils/db')
const {Model, DataTypes} = require("sequelize");

class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    star_value: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    star_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislike_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM(
            "WAITING",
            "APPROVED",
            "DECLINED",
        ),
        defaultValue: 'WAITING'
    },
    image_count:  {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    sequelize:connectionString,
    modelName: 'comment',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

module.exports = Comment
