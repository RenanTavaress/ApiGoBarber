const jwt = require('jsonwebtoken');
const yup = require('yup');

const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
   async store(req, res) {
      const schema = yup.object().shape({
         email: yup.string().email().required(),
         password: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(401).json({ error: 'Validation fails2' });
      }

      const { password, email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(401).json({ erro: 'User not faund' });
      }

      if (!(await user.checkPassword(password))) {
         return res.status(401).json({ erro: 'Passwors found not match' });
      }

      const { id, name } = user;

      return res.json({
         user: {
            id,
            name,
            email,
         },

         token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expireIn,
         }),

      });
   }
}

module.exports = new SessionController();
