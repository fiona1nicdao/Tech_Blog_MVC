const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
                unique: false
              }
        },
        user_id:{
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id',
                unique: false
              }
        },
        contentComment:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)