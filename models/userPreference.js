module.exports = (sequelize, DataTypes) => {
    var UserPreference = sequelize.define("UserPreference", {
        locationLat : {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$",'i'],
                isAlphanumeric: true,
                len: [1, 144],
                //msg: "Name must not inclue numbers or special characters, and have a length between 1 - 144 characters"
            }
        },
        locationLng : {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$",'i'],
                isAlphanumeric: true,
                len: [1, 144],
                //msg: "Name must not inclue numbers or special characters, and have a length between 1 - 144 characters"
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
        UserPreference.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }

    return UserPreference 

}