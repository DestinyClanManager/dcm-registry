const databaseProvider = require('../providers/database-provider')

module.exports.save = async clanId => {
  const db = databaseProvider.getInstance()
  const query = {
    TableName: process.env.REGISTRY_TABLE,
    Item: { id: clanId }
  }

  return await db.put(query).promise()
}

module.exports.findAll = async () => {
  const db = databaseProvider.getInstance()
  const query = {
    TableName: process.env.REGISTRY_TABLE
  }

  const result = await db.scan(query).promise()
  return result.Items.map(item => item.id)
}
