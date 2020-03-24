const Notification = require('../schema/Notification');
const User = require('../models/User');

class NotificationController {
   async index(req, res) {
      const isProvider = await User.findOne({
         where: { id: req.userId, provider: true },
      });


      if (!isProvider) {
         return res.status(400).json({ error: 'Only Providers can load notifications' });
      }


      const notifications = await Notification.find({
         user: req.userId,
      }).sort({ createdAt: 'desc' }).limit(20);

      return res.json({ notifications });
   }

   async update(req, res) {
      const notification = await Notification.findByIdAndUpdate(
         req.params.id,
         { read: true },
         { new: true },
      );

      return res.json(notification);
   }
}

module.exports = new NotificationController();
