module.exports = (sequelize, DataTypes) => {
    var UserPreference = sequelize.define("UserPreference", {
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
             }
        },
        ageRangeMin: {
           type: DataTypes.INTEGER,
           allowNull: false,
           validate: {
            isNumeric: true, 
           }
        },
        ageRangeMax: {
           type: DataTypes.INTEGER,
           allowNull: false,
           validate: {
            isNumeric: true, 
           }
        },
        gender: {
           type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$",'i'],
                isAlphanumeric: true
            }
        }
    })
    
    UserPreference.associate = models => {
        UserPreference.belongsTo(models.User, {foreignKey: 'userPreferenceId'})
    }

    return UserPreference 

}