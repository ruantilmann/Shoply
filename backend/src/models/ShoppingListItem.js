import Sequelize, { Model } from "sequelize";

class ShoppingListItem extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                quantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 1
                }
            },
            { sequelize }
        )
    }
}

export default ShoppingListItem;
