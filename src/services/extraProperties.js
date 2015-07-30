import isProduction from './isProduction.js';

export default function() {
  let extraProperties = 'reject';
  if (isProduction()) {
    extraProperties = 'ignore';
  }

  return extraProperties;
}
