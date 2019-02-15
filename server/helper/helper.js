export const ifExist = ({ name, logoUrl }, array) => {
  if (array.length >= 0) {
    for (let i = 0; i < array.length; i++) {

      if (name === array[i].name || logoUrl === array[i].logoUrl) {
        return true;
      }
    }
    return false;
  }
};

const isMissingValue = (body) => {
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
    return `${missings} is empty, created but not stored`;
  }

  return `${missings} are empty, created but not stored`;
};


export const increment = (body, array) => {
  const data = body;
  if (!isMissingValue(body)) {
    if (array.length === 0) {
      data.id = 1;
      array.push(body);
    } else {
      data.id = array.length + 1;
      array.push(body);
    }
  } else {
    return isMissingValue(body);
  }
};


export const partyEntityValidator = (body) => {
  if (
    body.hasOwnProperty('name')
    && body.hasOwnProperty('hqAddress')
    && body.hasOwnProperty('logoUrl')
  ) {
    return true;
  }
};


export const partyPropertySpecs = (body) => {
  const arrayOfProperty = Object.keys(body);
  const property = ['name', 'hqAddress', 'logoUrl'];
  const contains = [];


  arrayOfProperty.forEach(p1 => property.forEach((p2) => {
    if (p1 === p2) {
      contains.push(p1);
    }
  }));

  return `The object  has the properties ${contains} instead of having ${property}`;

};
