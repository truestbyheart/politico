const ifExist = (body, array) => {
  if (array.length >= 0) {
    for (let i = 0; i < array.length; i++) {
      if (body.name === array[i].name) {
        return true;
      }
    }
    return false;
  }
};

const increment = (body, array) => {
  const data = body;
  if (array.length === 0) {
    data.id = 1;
    array.push(body);
  } else {
    data.id = array.length + 1;
    array.push(body);
  }
};

const partyEntityValidator = (body) => {
  if (
    body.hasOwnProperty('name')
        && body.hasOwnProperty('hqAddress')
        && body.hasOwnProperty('logoUrl')
  ) {
    return true;
  }
};

const officeEntityValidator = (body) => {
  if (
    body.hasOwnProperty('name')
    && body.hasOwnProperty('type')
  ) {
    return true;
  }
};


module.exports = {
  ifExist, increment, partyEntityValidator, officeEntityValidator,
};
