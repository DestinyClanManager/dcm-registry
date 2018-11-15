describe('registry repository', () => {
  let subject, dbProvider

  beforeEach(() => {
    dbProvider = td.replace('../../../../src/providers/database-provider')
    subject = require('../../../../src/repositories/registry-repository')
  })

  describe('save', () => {
    let db

    beforeEach(async () => {
      const promise = td.function()
      db = { put: td.function() }
      td.when(db.put(td.matchers.anything())).thenReturn({ promise })
      td.when(promise()).thenResolve()
      td.when(dbProvider.getInstance()).thenReturn(db)

      await subject.save('clan-id')
    })

    it('saves the clan id', () => {
      const expectedQuery = {
        TableName: 'dcm-registry',
        Item: { id: 'clan-id' }
      }
      td.verify(db.put(expectedQuery))
    })
  })

  describe('findAll', () => {
    let actual

    beforeEach(async () => {
      const promise = td.function()
      const expectedQuery = { TableName: 'dcm-registry' }

      const db = { scan: td.function() }
      td.when(db.scan(expectedQuery)).thenReturn({ promise })
      td.when(promise()).thenResolve({ Items: [{ id: 'clan-1' }, { id: 'clan-2' }, { id: 'clan-3' }] })
      td.when(dbProvider.getInstance()).thenReturn(db)

      actual = await subject.findAll()
    })

    it('returns the registered clan ids', () => {
      expect(actual).toEqual(['clan-1', 'clan-2', 'clan-3'])
    })
  })
})
