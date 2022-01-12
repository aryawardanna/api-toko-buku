const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            'secret'
          );
          res.status(200).json({ message: 'Success Signin', data: token });
        } else {
          res.status(403).json({ message: 'Invalid password' });
        }
      } else {
        res.status(403).json({ message: 'Invalid email' });
      }
    } catch (error) {
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res
          .status(403)
          .json({ message: "Password and confirm passoword don't match" });
      }

      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: 'Email registered' });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'admin',
      });
      console.log(user);
      delete user.dataValues.password;

      res.status(201).json({
        message: 'Success SignUp',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
