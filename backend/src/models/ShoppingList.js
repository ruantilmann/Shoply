import Sequelize, { Model } from "sequelize";

class ShoppingList extends Model {
    static init(sequelize) {
        super.init(
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            { sequelize }
        )
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsToMany(models.Product, {
            through: models.ShoppingListItem,
            foreignKey: 'shopping_list_id',
            as: 'products'
        });
    }
}

export default ShoppingList;
