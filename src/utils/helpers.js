/**
 * Comparing two object values by given
 * field,
 * sortType (string or number)
 * order (asc 1, desc -1)
 * @param {string} sortBy
 * @param {string} sortType
 * @param {number} sortCoef
 * @returns {function(*, *): number}
 */
export const sortByValue = (sortBy, sortType, sortCoef) => {
  return (a, b) => {
    const valueA = (sortType === 'string')
      ? a[sortBy].toUpperCase()
      : +a[sortBy];
    const valueB = (sortType === 'string')
      ? b[sortBy].toUpperCase() : +b[sortBy];

    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    }
    if (valueA < valueB) {
      comparison = -1;
    }

    return comparison * sortCoef;
  };
};

/**
 * Creates deep copy of an object
 * @param {Object} inputObject
 * @returns {Object}
 */
export const deepCopy = inputObject => {
  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject;
  }

  const outputObject = Array.isArray(inputObject) ? [] : {};
  let value;

  Object.keys(inputObject).forEach(key => {
    value = inputObject[key];

    outputObject[key] = (typeof value === 'object' && value !== null) ? deepCopy(value) : value;
  });

  return outputObject;
};

/**
 * Checks if input is valid based on value, type and required fields
 * @param value
 * @param type
 * @param required
 * @returns {boolean}
 */
export const isInputValid = (value, type, required) => {
  if (!required) {
    return true;
  }

  switch (type) {
    case 'text':
      return value && (value.length);
    case 'number':
      value = +value;
      return value && (value > 0);
    default:
      return true;
  }
};

