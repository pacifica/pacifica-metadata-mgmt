import { getObjectList, getData } from './PacificaAPI'

describe("Basic PacificaAPI Tests", function() {
  it('gets an object list', function() {
    expect.assertions(1)
    return getObjectList('http://localhost:8121').then(res => {
      expect(res.data.available_objects.relationships).toEqual('Relationships')
    }).catch(res => {
      return
    })
  })

  it('gets an objects data', function() {
    expect.assertions(2)
    return getData('http://localhost:8121', 'users', [], 1, 0).then(res => {
      expect(res.numPages).toEqual(2)
      expect(res.objList[0].network_id).toEqual('dmlb2001')
    }).catch(res => {
      return
    })
  })
})