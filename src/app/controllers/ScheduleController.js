const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

class ScheduleController {
   async index(req, res) {
      const checkUserProvider = await User.findOne({
         where: { id: req.userId, provider: true },
      });

      if (!checkUserProvider) {
         return res.status(401).json({ error: 'User is not a provider' });
      }

      const { date } = req.query;

      const appoitments = await Appointment.findAll({
         where: {
            provider_id: req.userId,
            canceled_at: null,
            date: {
               [Op.between]: [
                  startOfDay(parseISO(date)),
                  endOfDay(parseISO(date)),
               ],
            },
         },
         order: ['date'],
      });

      return res.json(appoitments);
   }
}

module.exports = new ScheduleController();
