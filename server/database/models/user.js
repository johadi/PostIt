import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Fullname can\'t be empty'
                    }
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'This username has been used'
                },
                validate: {
                    notEmpty: {
                        msg: 'Username can\'t be empty'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'A user with this email already exists'
                },
                validate: {
                    notEmpty: {
                        msg: 'Email can\'t be empty'
                    },
                    isEmail: {
                        msg: 'This email is invalid'
                    }
                }
            },
            mobile: {
                type: DataTypes.STRING
            },
            avatarPath: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: {
                        args: 6,
                        msg: 'Password must be at least 6 characters long'
                    }
                }
            }
        },
        {
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(user.password, salt);

                    user.password = hash;
                }
            }
        });

    User.associate = (models) => {
        User.belongsToMany(models.Group,
            {through: 'UserGroup', foreignKey: 'userId'});
        User.hasMany(models.Message, {foreignKey: 'userId'});
    };

    User.signupRules = () => ({
        password: 'required|min:6',
        confirmPassword: 'required|min:6',
        username: 'required',
        email: 'required|email',
        fullname: 'required',
        mobile: ['regex:/\\+[0-9]{13}$/']
    });

    User.loginRules = () => ({
        password: 'required|min:6',
        username: 'required',
    });

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    return User;
};
