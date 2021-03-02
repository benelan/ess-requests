import nodemailer from 'nodemailer'
import { emailSettings, from } from '../email.config'

// eslint-disable-next-line import/prefer-default-export
export const sendAutoEmail = async ({ to, subject, text }) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(emailSettings)
    // send mail with defined transport object
    await transporter.sendMail({
      from, // sender address
      to, // comma separated string list of receivers
      subject, // Subject line
      text, // plain text body
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}