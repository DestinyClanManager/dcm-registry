describe('handler', () => {
  let subject, registryService, callback

  beforeEach(() => {
    callback = td.function()
    registryService = td.replace('../../../src/services/registry-service')
    subject = require('../../../src/handler')
  })

  describe('getRegisteredClans', () => {
    describe('when everything goes well', () => {
      beforeEach(async () => {
        td.when(registryService.getRegisteredClans()).thenResolve(['the-registered-clans'])
        await subject.getRegisteredClans(null, null, callback)
      })

      it('responds with the registered clans', () => {
        const expectedResponse = {
          statusCode: 200,
          body: JSON.stringify(['the-registered-clans'])
        }
        td.verify(callback(null, expectedResponse))
      })
    })

    describe('when there is an error', () => {
      let error

      beforeEach(async () => {
        error = new Error('the error')
        td.when(registryService.getRegisteredClans()).thenReject(error)
        await subject.getRegisteredClans(null, null, callback)
      })

      it('sends an error response', () => {
        const expectedResponse = {
          statusCode: 500,
          body: JSON.stringify(error)
        }
        td.verify(callback(error, expectedResponse))
      })
    })
  })

  describe('registerClan', () => {
    describe('when everything goes well', () => {
      beforeEach(async () => {
        td.when(registryService.registerClan('clan-id')).thenResolve()
        const body = JSON.stringify({ clanId: 'clan-id' })
        await subject.registerClan({ body }, null, callback)
      })

      it('sends a created response', () => {
        const expectedResponse = {
          statusCode: 201,
          body: JSON.stringify({ id: 'clan-id' })
        }
        td.verify(callback(null, expectedResponse))
      })
    })

    describe('when there is an error', () => {
      let error

      beforeEach(async () => {
        error = new Error('the error')
        td.when(registryService.registerClan('clan-id')).thenReject(error)
        const body = JSON.stringify({ clanId: 'clan-id' })
        await subject.registerClan({ body }, null, callback)
      })

      it('sends an error response', () => {
        const expectedResponse = {
          statusCode: 500,
          body: JSON.stringify(error)
        }
        td.verify(callback(error, expectedResponse))
      })
    })
  })
})
