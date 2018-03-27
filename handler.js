const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

function handleError(error, callback) {
  callback(error, {
    statusCode: 500
  })
}

module.exports.getRegisteredClans = (event, context, callback) => {
  const query = {
    TableName: process.env.REGISTRY_TABLE
  }

  dynamoDB.scan(query, (error, data) => {
    if (error) {
      handleError(error, callback)
    }

    const registeredClans = data.Items.map(item => item.id)

    const response = {
      statusCode: 200,
      body: JSON.stringify(registeredClans)
    }

    callback(null, response)
  })
}

module.exports.registerClan = (event, context, callback) => {
  const clanId = JSON.parse(event.body).clanId

  const query = {
    TableName: process.env.REGISTRY_TABLE,
    Item: { id: clanId }
  }

  dynamoDB.put(query, error => {
    if (error) {
      handleError(error, callback)
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify({ id: clanId })
    }

    callback(null, response)
  })
}
