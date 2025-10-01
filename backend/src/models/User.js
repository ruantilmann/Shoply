import Sequelize, { Model } from "sequelize";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },

                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },

                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                defaultScope: {
                    attributes: { exclude: ['password'] },
                },
                scopes: {
                    withPassword: {
                        attributes: {},
                    }
                }
            }
        )
    }

    static associate(models) {
        this.hasMany(models.ShoppingList, { foreignKey: 'user_id', as: 'shopping_lists' });
    }
}

export default User