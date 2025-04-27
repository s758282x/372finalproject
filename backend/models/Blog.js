const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Blog = sequelize.define("Blog", {
  blog_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'blogs', //
  timestamps: false,  // 
});

module.exports = Blog;
