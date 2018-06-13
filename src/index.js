export default class Translator {
  constructor(dictionnary, aliases) {
    this.dictionnary = dictionnary || {}
    this.aliases = aliases || {}
  }

  run(type, arg) {
    return this._translate(type, arg)
  }

  _translate(type, arg, value, tracked = true) {
    if (value) value = this._translate(this._computeType(type, arg), value, undefined, false)

    if (Array.isArray(arg)) {
      return arg.map(x => this._translate(type, x))
    } else if (typeof arg === 'object') {
      return Object.keys(arg).reduce((acc, key) => {
        return { ...acc, ...this._translate(type, key, arg[key]) }
      }, {});
    } else {
      const translated = tracked ? this._findWordTranslation(type, arg) : arg
      if (value === undefined) return translated
      return { [translated]: value }
    }
  }

  _findWordTranslation(type, word) {
    if (!this.dictionnary[type]) return word
    const translated = this.dictionnary[type][word]
    return translated || word
  }

  _computeType(type, field) {
    Object.keys(this.aliases).some(key => {
      if (this.aliases[key].includes(field)) {
        type = key
        return true
      } return false
    })
    return type
  }
}
