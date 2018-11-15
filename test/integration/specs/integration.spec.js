const supertest = require('supertest')

describe('Registry API', () => {
  let request

  beforeEach(() => {
    request = supertest(process.env.REGISTRY_BASE_URL)
  })

  describe('registerClan', () => {
    let actual

    beforeEach(async () => {
      const response = await request
        .post('/')
        .send({ clanId: 'clan-id' })
        .expect(201)

      actual = response.body
    })

    it('returns the registered clan id', () => {
      expect(actual).toEqual({ id: 'clan-id' })
    })
  })

  describe('getRegisteredClans', () => {
    let actual

    beforeEach(async () => {
      const response = await request.get('/').expect(200)
      actual = response.body
    })

    it('returns the registered clans', () => {
      expect(actual).toEqual(['clan-id'])
    })
  })
})
