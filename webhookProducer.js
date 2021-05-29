'use strict';
const AWS = require('aws-sdk')

module.exports.handle = async (event) => {
  try {
    const sqs = new AWS.SQS({
      apiVersion: '2012-11-05',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    })

    await sqs.sendMessage({
      MessageBody: JSON.stringify({
        event
      }),
      QueueUrl: process.env.QUEUE_URL,
      MessageGroupId: 'teste'
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'message received!' })
    };
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};
