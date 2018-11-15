const registryRepository = require('../repositories/registry-repository')

module.exports.registerClan = async clanId => {
  return await registryRepository.save(clanId)
}

module.exports.getRegisteredClans = async () => {
  return await registryRepository.findAll()
}
