module.exports = function(sequelize, DataTypes) {
  var Records = sequelize.define('Records', {
  
    direction: {
      type: DataTypes.STRING,
      validate: {
      },
      
    },
  
    filename: {
      type: DataTypes.STRING,
      validate: {
      },
      
    },
  
    filesize: {
      type: DataTypes.INTEGER,
      validate: {
      },
      
    },
  
    filecreationdate: {
      type: DataTypes.DATE,
      validate: {
      },
      get: function() {
        var value = this.getDataValue('filecreationdate')
        return value ? value.toISOString().substring(0, 10) : value
      }
    },
  
  })

  return Records
}
