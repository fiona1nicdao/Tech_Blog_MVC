const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id',
                unique:false
            }
        },
        title: {
            type: DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE
        },
        content:{
            type:DataTypes.STRING
        }, 
        // comment_id: {
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model:'comm',
        //         key:'id',
        //         unique:false
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
module.exports=Post;
