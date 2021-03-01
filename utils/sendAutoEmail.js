import nodemailer from 'nodemailer'
import emailSettings from '../email.config'
// async..await is not allowed in global scope, must use a wrapper
(async function main() {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(emailSettings)
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'belan@esri.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })
  console.log('Message sent: %s', info.messageId)
}()).catch(console.error)
