function format(value) {
  return this.formatFixed(value, 2)
}

function formatFixed(value, decimalPlaces) {
  var roundedValue = this.round(value, decimalPlaces).toFixed(0)
  var formatted = roundedValue.toString()

  return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function round(value, decimalPlaces) {
  var pow = Math.pow(10, decimalPlaces)
  return Math.round(value * pow) / pow
}

function parse(value) {
  var multiplier = 1;
  value = value.replace(/,/g, '')

  var lastChar = value.charAt(value.length - 1).toLowerCase();
  while (lastChar === 'k' || lastChar === 'm' || lastChar === 'b') {
    switch (lastChar) {
        case 'k':
            multiplier *= 1000;
            break;
        case 'm':
            multiplier *= 1000000;
            break;
        case 'b':
            multiplier *= 1000000000;
            break;
    }
    value = value.substr(0, value.length - 1)
    lastChar = value.charAt(value.length - 1).toLowerCase()
  }

  return parseInt(value) * multiplier
}

// TODO Fixture out es6 exports properly...
export default { round, parse, format, formatFixed }
