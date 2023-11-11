const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const app1 = express();
app1.use(bodyParser.json());
app1.use(cors());

const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
};

app1.post('/sendmail', (req, res) => {
  mailOptions.html = `<b>We have a new client!</b><br><b>Email: ${req.body.email},</b><br><b>${req.body.phone}</b>`;
  mailOptions.subject = `New client - ${req.body.email}`;
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.status(404);
    } else {
      console.log(`A message for ${req.body.email} has been sent`);
      res.json('Delivered');
    }
    smtpTransport.close();
  });
});

exports.app1 = https.onRequest(app1);
