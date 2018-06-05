module.exports = (sequelize, DataTypes) => {
    var DinnerPreference = sequelize.define("DinnerPreference", {
        distance : {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        pricePoint: {
            type: DataTypes.INTEGER,
            allowNull: false           
        },
        cuisineType: {
           type: DataTypes.STRING,
           allowNull: false
        }
    })
    
    DinnerPreference.associate = models => {
        DinnerPreference.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }

    return DinnerPreference 

}