const { Op } = require('sequelize');
const { Book, Category } = require('../../db/models');

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = '' } = req.query;
      console.log(keyword);

      let condition = {
        user: req.user.id,
      };

      if (keyword !== '') {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }
      const books = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ['id', 'name'],
        },
      });

      res.status(200).json({
        message: 'Success get all books',
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  createBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { title, price, category, author, published, stok, image } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: 'id category not found' });
      }

      const books = await Book.create({
        title,
        price,
        category,
        author,
        published,
        stok,
        image,
        user,
      });
      res.status(201).json({
        message: 'Success create books',
        books,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBooks: async (req, res, next) => {
    try {
      let user = req.user.id;
      const { id } = req.params;
      const { title, price, category, author, published, stok, image } =
        req.body;

      const checkCategory = await Category.findOne({
        where: {
          id: category,
          user,
        },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: 'id category not found' });
      }

      const checkBook = await Book.findOne({
        where: { id: id },
      });

      if (!checkBook) {
        return res.status(404).json({
          message: 'id category not found',
        });
      }

      const books = await checkBook.update({
        title,
        price,
        category,
        author,
        published,
        stok,
        image,
        user,
      });
      res.status(200).json({
        message: 'Success update books',
        books,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteBooks: async (req, res, next) => {
    try {
      const books = await Book.findOne({ where: { id: req.params.id } });

      if (!books) {
        return res.status(404).json({
          message: 'id book not found',
        });
      }
      books.destroy();

      res.status(200).json({
        message: 'Success delete books',
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
};
