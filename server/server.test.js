const { TestScheduler } = require('rxjs/testing')
const {
    selectRoom,
    fetchMessagesByRoom,
} = require('./messagesModel')

describe('fetchMessagesByRoom', () => {
    test('function returns a parsed message array of objects equal to current db values', () => {
        const testGet = fetchMessagesByRoom(test)
        expect(testGet).toBe(typeof 'object')
        expect(testGet).toEqual([{message: 'test'}])
    })
})