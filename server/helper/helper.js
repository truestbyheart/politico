export const isMissingValue = (body) => {
  const arrayOfWords = Object.values(body);
  const property = Object.keys(body);
  const missings = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in arrayOfWords) {
    if (arrayOfWords[key] === '') {
      missings.push(property[key]);
    }
  }
  if (missings.length === 0) {
    return false;
  }
  if (missings.length === 1) {
    return `${missings} is empty`;
  }

  return `${missings} are empty`;
};

export const partyEntityValidator = (body) => {
  if (
    body.hasOwnProperty('name')
    && body.hasOwnProperty('hqAddress')
    && body.hasOwnProperty('logoUrl')
    && body.hasOwnProperty('abbreviation')
  ) {
    return true;
  }
  return false;
};

export const partyPropertySpecs = (body) => {
  const missing = [];
  if (!body.hasOwnProperty('name')) {
    missing.push('name');
  }
  if (!body.hasOwnProperty('hqAddress')) {
    missing.push('hqAddress');
  }
  if (!body.hasOwnProperty('logoUrl')) {
    missing.push('logoUrl');
  }
  if (!body.hasOwnProperty('abbreviation')) {
    missing.push('abbreviation');
  }
  if (!body.hasOwnProperty('address')) {
    missing.push('address');
  }

  return `Please make sure to include ${missing}`;
};
