import nodemailer from 'nodemailer';

interface Options {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: Options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Form Builder <support@formbuilder.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions).catch(() => {
    console.error('Sending email failed!');
  });
};

export default sendEmail;
