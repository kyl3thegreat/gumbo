module.exports = (sequelize, DataTypes) => {
    var History = sequelize.define("History", {
        
    })
    
    History.associate = models => {
        History.belongsTo(models.User, {foreignKey: 'historyId'})
    }

    return History 

}