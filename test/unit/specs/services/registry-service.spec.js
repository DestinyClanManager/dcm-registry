describe('registry service', () => {
  let subject, registryRepository

  beforeEach(() => {
    registryRepository = td.replace('../../../../src/repositories/registry-repository')
    subject = require('../../../../src/services/registry-service')
  })

  describe('registerClan', () => {
    beforeEach(async () => {
      td.when(registryRepository.save('clan-id')).thenResolve()
      await subject.registerClan('clan-id')
    })

    it('registers the clan', () => {
      td.verify(registryRepository.save('clan-id'))
    })
  })

  describe('getRegisteredClan', () => {
    let actual

    beforeEach(async () => {
      td.when(registryRepository.findAll()).thenResolve('the-registered-clans')
      actual = await subject.getRegisteredClans()
    })

    it('returns the registered clans', () => {
      expect(actual).toEqual('the-registered-clans')
    })
  })
})
