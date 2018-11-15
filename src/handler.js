const registeryService = require('./services/registry-service')

function handleError(error, callback) {
  callback(error, {
    statusCode: 500,
    body: JSON.stringify(error)
  })
}

module.exports.getRegisteredClans = async (_event, _context, callback) => {
  let registeredClans
  try {
    registeredClans = await registeryService.getRegisteredClans()
  } catch (error) {
    handleError(error, callback)
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(registeredClans)
  }

  callback(null, response)
}

module.exports.registerClan = async (event, _context, callback) => {
  const { clanId } = JSON.parse(event.body)

  try {
    await registeryService.registerClan(clanId)
  } catch (error) {
    handleError(error, callback)
  }

  const response = {
    statusCode: 201,
    body: JSON.stringify({ id: clanId })
  }

  callback(null, response)
}
