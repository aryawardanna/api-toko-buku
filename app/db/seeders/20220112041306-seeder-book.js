'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'David Bach: Faktor Latte',
          author: 'David Bach',
          image: '/uploads/image 1.png',
          published: new Date(),
          price: 90,
          stok: 100,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '"Selena" dan "Nabula"',
          author: 'Tere Liye',
          image: '/uploads/image 2.png',
          published: new Date(),
          price: 90,
          stok: 100,
          user: 1,
          category: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pelukis Bisu (The Silent Patient)',
          author: 'Alex',
          image: '/uploads/image 2.png',
          published: new Date(),
          price: 90,
          stok: 100,
          user: 1,
          category: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
