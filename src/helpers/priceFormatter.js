/**
 * Returns a formatted rate
 * @return { bigFigures, pips, tenthOfPips}
 */
function getFormattedPrice(rate, precision, pipsPosition) {
  var rateAsString = rate.toFixed(precision)

  var dotIndex = rateAsString.indexOf('.')

  var bigFigures = rateAsString.substring(0, dotIndex + pipsPosition - 1)
  var pips = rateAsString.substring(dotIndex + pipsPosition - 1, dotIndex + pipsPosition + 1)

  var tenthOfPips = ''

  if (precision > pipsPosition)
  {
      tenthOfPips = rateAsString.substring(dotIndex + pipsPosition + 1, rateAsString.length)
  }

  return { bigFigures: bigFigures, pips: pips, tenthOfPips };
}

export default { getFormattedPrice }
