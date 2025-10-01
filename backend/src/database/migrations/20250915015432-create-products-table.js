'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('products', {

        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },

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
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }

      });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('products');
  }
};
