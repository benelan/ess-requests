// you may have to tweak these nodemailer settings depending on your network and email provider
// https://nodemailer.com/smtp/
export const emailSettings = {
  host: 'smtp.PROVIDER',
  secure: true,
  auth: {
    user: 'EMAIL',
    pass: 'PASSWORD',
  },
}

export const from = '"ESS Apps" <essapps@PROVIDER>'
