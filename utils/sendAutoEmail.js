import axios from 'axios'
import { flowUrl } from '../email.config'

/* eslint-disable import/prefer-default-export */
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
