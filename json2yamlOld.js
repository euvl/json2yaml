/*
 *
 * JSON to YAML serializer
 *
 *   flags:
 *      "STRIP_STRINGS" - do not put strings in quotes
 */

var YAML = new function() {
  var TB = '  ', EL = '\n', AR = '- ',
    level = -1;

  var tabs = function(n) {
    return n > 0 ? (TB + tabs(n - 1)) : '';
  };

  var contains = function(array, string) {
    return typeof array === 'object' && array.indexOf(string) !== -1;
  };

  var parseYAML = function(json, flags) {
    var result = '';
    var type = Object.prototype.toString.call(json);

    json = json || null;

    switch (type) {
      case '[object Array]':
        level++;
        for (var i = 0; i < json.length; i++)
          result += EL + tabs(level) + AR + parseYAML(json[i], flags);
        level--;
        break;

      case '[object Object]':
        level++;
        for (var j in json)
          if (json.hasOwnProperty(j)) {
            result += EL + tabs(level) + j + ': ' + parseYAML(json[j], flags);
          }
        level--;
        break;

      case '[object String]':
        result += contains(flags, 'STRIP_STRINGS') ? json : ('"' + json + '"');
        break;

      default:
        result += json;
        break;
    }

    return result;
  };

  return this.prototype = {
    fromJSON: function(json, flags) {
      return parseYAML(json, flags);
    }
  };
};
