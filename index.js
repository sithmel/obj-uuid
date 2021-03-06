const uuidv1 = require('uuid/v1')
const uuidv5 = require('uuid/v5')

function ObjUUID () {
  this.keys = new WeakMap()
  this.namespace = uuidv1()
}

ObjUUID.prototype.getIdFromValue = function (value) {
  if (value === null) {
    return uuidv5('null', this.namespace)
  }
  if (typeof value === 'undefined') {
    return uuidv5('undefined', this.namespace)
  }
  if (typeof value === 'string') {
    return uuidv5(`string:${value}`, this.namespace)
  }
  if (typeof value === 'number') {
    return uuidv5(`number:${value}`, this.namespace)
  }
  if (typeof value === 'boolean') {
    return uuidv5(`bool:${value}`, this.namespace)
  }
  if (typeof value === 'symbol') {
    return uuidv5(`symbol:${value.toString()}`, this.namespace)
  }
  if (typeof value === 'object' || typeof value === 'function') {
    if (!this.keys.has(value)) {
      this.keys.set(value, uuidv1())
    }
    return this.keys.get(value)
  }
}

ObjUUID.prototype.getIdFromValues = function (deps) {
  return deps
    .map((dep) => this.getIdFromValue(dep))
    .join('.')
}

ObjUUID.prototype.getIdFromAttributes = function (deps) {
  const depsNames = Object.keys(deps)
  depsNames.sort()
  return depsNames
    .map((depName) => `${depName}:${this.getIdFromValue(deps[depName])}`)
    .join('.')
}

module.exports = new ObjUUID()
