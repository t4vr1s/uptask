const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const { htmlToText } = require('html-to-text');
const { user, pass, host, port } = require('../config/email');

const generarHTML = (archivo, opciones = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${archivo}.pug`,
    opciones
  );
  return juice(html);
};

exports.enviar = async (opciones) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });

  const { usuario, subject, archivo } = opciones;
  const html = generarHTML(archivo, opciones);
  const text = htmlToText(html);

  const info = await transporter.sendMail({
    from: 'UpTask <no-reply@uptask.com>',
    to: usuario.email,
    subject,
    text,
    html,
  });
};
