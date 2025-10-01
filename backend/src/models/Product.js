import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },

                price: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false
                },

                description: {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            },
            { sequelize }
        )
    }

    static associate(models) {
        this.belongsToMany(models.ShoppingList, {
            through: models.ShoppingListItem,
            foreignKey: 'product_id',
            as: 'shopping_lists'
        });
    }
}

export default Product