/**
 * @jest-environment node
 */
import { getObjectList, getData } from './PacificaAPI'

it('gets an object list', () => {
  expect.assertions(1)
  return getObjectList('http://localhost:8121').then(res => {
    expect(res.data.available_objects.relationships).toEqual('Relationships')
  }).catch(res => {
    console.log(res)
  })
})

it('gets an objects data', () => {
  expect.assertions(2)
  return getData('http://localhost:8121', 'users', [], 1, 0).then(res => {
    expect(res.numPages).toEqual(2)
    expect(res.obj_list[0].network_id).toEqual('dmlb2001')
  }).catch(res => {
    console.log(res)
  })
})
