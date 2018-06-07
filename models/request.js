module.exports = (sequelize, DataTypes) => {
    var Request = sequelize.define("Request", {
        makingRequest: {
            type: DataTypes.STRING
        },
        recievingRequest: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN 
        }    
    })

    Request.associate = models => {
        Request.belongsTo(models.User, {foreignKey: 'requestId'})
    }
    

    return Request 

}