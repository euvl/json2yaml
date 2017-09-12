var TB = '  ', EL = '\n', AR = '- ', level = -1;

var tabsCache = {}

var tabs = (n) => {
  if (tabsCache[n]) {
    return tabsCache[n]
  }

  var chars = ''
  for (var i = 0; i < n; i++) {
    chars += TB
  }

  tabsCache[n] = chars
  return chars
}

var contains = (array, string) => {
  return Array.isArray(array) && array.indexOf(string) !== -1
}

var parseYAML = (json, flags = {}) => {
    var result = ''
    var instance = Object.prototype.toString.call(json)

    json = json || null;

    switch (instance) {
      case '[object Array]':
        level++
        for (var i = 0; i < json.length; i++) {
          result += EL + tabs(level) + AR + parseYAML(json[i], flags)
        }
        level--
        break

      case '[object Object]':
        level++
        for (var j in json) {
          if (json.hasOwnProperty(j)) {
            result += EL + tabs(level) + j + ': ' + parseYAML(json[j], flags)
          }
        }
        level--
        break

      case '[object String]':
        result += flags.strip_strings
          ? json
          : ('"' + json + '"')
        break

      default:
        result += json
        break
    }

    return result
}

export default { fromJSON: parseYAML }
