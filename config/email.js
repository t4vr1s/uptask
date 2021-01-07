require('dotenv').config({ path: 'variables.env' });

const user = process.env.MAIL_USER || '038b2ebf8f68ef';
const pass = process.env.MAIL_PASS || '84fbe326e4a6f1';
const host = process.env.MAIL_HOST || 'smtp.mailtrap.io';
const port = process.env.MAIL_PORT || '2525';

module.exports = {
  user,
  pass,
  host,
  port,
};
