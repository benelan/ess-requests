/* eslint-disable import/prefer-default-export */
/**
 * Logs form data to csv
 * @module sendAutoEmail
 * */
import axios from 'axios'
import { flowUrl } from '../email.config'

/**
 * Automatically sends an email request
 * @param {object} { subject, text, to } - the email information
 * @return {boolean} did the email send successfully
 */
export const sendAutoEmail = async ({ subject, text, to }) => new Promise((resolve, reject) => {
  axios.post(
    flowUrl,
    { to, subject, text: text.replaceAll(',', '<br>') },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
    .then((response) => resolve(response.data === 'sent'))
    .catch((error) => reject(error))
})
