module.exports = {
   host: process.env.MAIL_HOST,
   port: process.env.REDIS_PORT,
   secure: false,
   auth: {
      user: process.env.REDIS_USER,
      pass: process.env.REDIS_PASS,
   },
   default: {
      from: 'Equipe GoBarber <noreply@gobarber.com>',
   },
};
