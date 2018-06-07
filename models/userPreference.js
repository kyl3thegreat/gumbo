module.exports = (sequelize, DataTypes) => {
    var UserPreference = sequelize.define("UserPreference", {
        locationLat: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        locationLng: {
            type: DataTypes.INTEGER,
            validate : {
                isNumeric: true
            }
        },
        distance: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        ageRangeMin: {
           type: DataTypes.INTEGER,
           validate: {
            isNumeric: true, 
           }
        },
        ageRangeMax: {
           type: DataTypes.INTEGER,
           validate: {
            isNumeric: true, 
           }
        },
        gender: {
           type: DataTypes.STRING,
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