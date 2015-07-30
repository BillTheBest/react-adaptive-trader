import _ from 'lodash';

var ensureArray = function(possibleArray) {
	if (!_.isArray(possibleArray)) { 
		possibleArray = [possibleArray]; 
	}
	return possibleArray;
};

export function findComponentOfType(renderedOutput, type) {
  if (!renderedOutput) { 
	return renderedOutput;
  }
  let children = ensureArray(renderedOutput);
  let match = _(children).filter(c => c.type === type).first();
  if (match) { 
	return match;
  }

  return _(children)
		.map(c => findComponentOfType(c.props.children, type))
        .filter(c => c).first();
}
