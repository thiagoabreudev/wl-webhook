'use strict';
const qs = require('querystring')
const axios = require('axios')


module.exports.handle = async ({ Records: records }) => {
  try {
    await Promise.all(records.map(async record => {
      const messageBody = JSON.parse(record.body)
      const event = messageBody.event
      const method = event.httpMethod
      const path = event.path
      const query = event.queryStringParameters
      const data = JSON.parse(event.body)
      let url = process.env.URL + path

      if (query) {
        url += `?${qs.stringify(query)}`
      }

      await axios({
        url,
        method,
        data
      })

    }))
    return { statusCode: 200, body: JSON.stringify({ message: 'message consumed!' }) }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: JSON.stringify({ error })}
  }
};