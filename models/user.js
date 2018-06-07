module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        fbId: {
            type: DataTypes.STRING
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
            // validate: {
            //     is: ["^[a-z]+$",'i'],
            //     isAlphanumeric: true,
            //     len: [1, 144],
            //     msg: "Name must not inclue numbers or special characters, and have a length between 1 - 144 characters"
            // }
        },
        company: {
            type: DataTypes.STRING
        },
        school: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.TEXT,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                // isUnique: true,
                isEmail: true
                //msg: "Email must follow format (foo@bar.com)"
            }
        },
        gender: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING,
            validate: {
                //isIn: [['.jpg', '.png', '.jpeg']]
                //msg: "Photo must have one of the following ext (.jpg , .png', .jpeg)" 
            }
        }
    })
    
    User.associate = models => {
        User.hasOne( models.UserPreference)
        User.hasOne( models.DinnerPreference)
        User.hasMany( models.History)
        User.hasMany( models.Request)
    }

    return User 

}