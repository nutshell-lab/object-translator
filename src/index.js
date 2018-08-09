export default class Translator {
  /*
    options {
      delete: Boolean
    }
  */
  constructor(dictionnary, aliases, options = {}) {
    this.dictionnary = dictionnary || {}
    this.aliases = {
      ...this._computeAliases(dictionnary),
      ...aliases
    }
    this.options = options
  }

  run(type, arg, options) {
    this.setOptions(options)
    return this._translate(type, arg)
  }

  setOptions(options) {
    if (!options) return
    this.options = {
      ...this.options,
      ...options
    }
  }

  _translate(type, arg, value, tracked = true) {
    if (value)
      value = this._translate(
        this._computeType(type, arg),
        value,
        undefined,
        false
      )

    if (Array.isArray(arg)) {
      return arg.map(x => this._translate(type, x))
    } else if (typeof arg === 'object') {
      return Object.keys(arg).reduce((acc, key) => {
        return { ...acc, ...this._translate(type, key, arg[key]) }
      }, {})
    } else {
      const translated = tracked ? this._findWordTranslation(type, arg) : arg
      if (value === undefined || !translated) return translated
      return { [translated]: value }
    }
  }

  _findWordTranslation(type, word) {
    if (!this.dictionnary[type]) return word
    const translated = this.dictionnary[type][word]
    return this.options.delete ? translated : translated || word
  }

  _computeType(type, field) {
    Object.keys(this.aliases).some(key => {
      if (this.aliases[key].includes(field)) {
        type = key
        return true
      }
      return false
    })
    return type
  }

  _computeAliases(dictionnary) {
    return Object.keys(dictionnary).reduce((acc, alias) => {
      acc[alias] = [alias]
      return acc
    }, {})
  }
}
