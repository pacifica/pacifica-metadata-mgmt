import { getData, getObjectList } from './PacificaAPI'

describe('basic PacificaAPI Tests', () => {
  it('gets an object list', async () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(1)
    await getObjectList('http://localhost:8121').then((res) => {
      expect(res.data.available_objects.relationships).toStrictEqual('Relationships')
    })
  })

  it('gets an objects data', async () => {
    // eslint-disable-next-line no-magic-numbers
    expect.assertions(2)
    // eslint-disable-next-line no-magic-numbers
    await getData('http://localhost:8121', 'users', [], 1, 0).then((res) => {
      // eslint-disable-next-line no-magic-numbers
      expect(res.numPages).toStrictEqual(2)
      // eslint-disable-next-line no-magic-numbers
      expect(res.objList[0].network_id).toStrictEqual('dmlb2001')
    })
  })
})
