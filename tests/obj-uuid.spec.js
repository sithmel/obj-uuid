/* eslint-env node, mocha */
const objUUID = require('..')
const assert = require('chai').assert

describe('deps to key', (done) => {
  it('getIdFromValue is a function', () => {
    assert.typeOf(objUUID.getIdFromValue, 'function')
  })

  it('getIdFromValues is a function', () => {
    assert.typeOf(objUUID.getIdFromValues, 'function')
  })

  it('getIdFromAttributes is a function', () => {
    assert.typeOf(objUUID.getIdFromValue, 'function')
  })

  describe('getIdFromValue', () => {
    it('returns consistent values: number', () => {
      assert.equal(objUUID.getIdFromValue(0), objUUID.getIdFromValue(0))
      assert.equal(objUUID.getIdFromValue(1), objUUID.getIdFromValue(1))
      assert.notEqual(objUUID.getIdFromValue(1), objUUID.getIdFromValue(0))
    })

    it('returns consistent values: null/undefined', () => {
      assert.equal(objUUID.getIdFromValue(null), objUUID.getIdFromValue(null))
      assert.equal(objUUID.getIdFromValue(), objUUID.getIdFromValue())
      assert.notEqual(objUUID.getIdFromValue(null), objUUID.getIdFromValue())
    })

    it('returns consistent values: strings', () => {
      assert.equal(objUUID.getIdFromValue('hello'), objUUID.getIdFromValue('hello'))
      assert.notEqual(objUUID.getIdFromValue('world'), objUUID.getIdFromValue('hello'))
    })

    it('returns consistent values: booleans', () => {
      assert.equal(objUUID.getIdFromValue(true), objUUID.getIdFromValue(true))
      assert.notEqual(objUUID.getIdFromValue(true), objUUID.getIdFromValue(false))
    })

    it('returns consistent values: symbol', () => {
      const symbol1 = Symbol('hello')
      const symbol2 = Symbol('world')
      assert.equal(objUUID.getIdFromValue(symbol1), objUUID.getIdFromValue(symbol1))
      assert.notEqual(objUUID.getIdFromValue(symbol1), objUUID.getIdFromValue(symbol2))
    })

    it('returns consistent values: objects', () => {
      const a = {}
      const b = {}
      assert.equal(objUUID.getIdFromValue(a), objUUID.getIdFromValue(a))
      assert.notEqual(objUUID.getIdFromValue(a), objUUID.getIdFromValue(b))
    })

    it('returns consistent values: functions', () => {
      const a = () => {}
      const b = () => {}
      assert.equal(objUUID.getIdFromValue(a), objUUID.getIdFromValue(a))
      assert.notEqual(objUUID.getIdFromValue(a), objUUID.getIdFromValue(b))
    })
  })

  describe('getIdFromValues', () => {
    it('returns consistent values', () => {
      assert.equal(objUUID.getIdFromValues([ 1, 2 ]), objUUID.getIdFromValues([ 1, 2 ]))
      assert.notEqual(objUUID.getIdFromValues([ 1, 2 ]), objUUID.getIdFromValues([ 1, 3 ]))
    })
    it('return nothing for empty object', () => {
      assert.equal(objUUID.getIdFromValues([]), '')
    })
  })

  describe('getIdFromAttributes', () => {
    it('returns consistent values', () => {
      assert.equal(objUUID.getIdFromAttributes({ a: 1, b: 2 }), objUUID.getIdFromAttributes({ a: 1, b: 2 }))
      assert.equal(objUUID.getIdFromAttributes({ a: 1, b: 2 }), objUUID.getIdFromAttributes({ b: 2, a: 1 }))
      assert.notEqual(objUUID.getIdFromAttributes({ a: 1, b: 2 }), objUUID.getIdFromAttributes({ a: 1, b: 3 }))
    })
    it('return nothing for empty object', () => {
      assert.equal(objUUID.getIdFromAttributes({}), '')
    })
  })
})
