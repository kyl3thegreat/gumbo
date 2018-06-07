module.exports = (sequelize, DataTypes) => {
    var DinnerPreference = sequelize.define("DinnerPreference", {
        distance : {
            type: DataTypes.INTEGER,
        },
        pricePoint: {
            type: DataTypes.INTEGER,   
        },
        cuisineType: {
           type: DataTypes.STRING,
        }
    })

    return DinnerPreference 

}