const { ifExist, increment, partyEntityValidator } = require('./../helper/helper');

const Parties = [];


const defaultRoute = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to politico API, please used the specified endpoints from the readme file',
  });
};

const postParty = (req, res) => {
  if (partyEntityValidator(req.body)) {
    if (ifExist(req.body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
    } else {
      increment(req.body, Parties);
      res.status(201).json({ status: 201, Data: Parties });
    }
  } else {
    res.status(200).json({
      status: 200,
      message: 'Please make sure all properties are filled',
      note: 'The data should be case sensitive to the entity specs',
    });
  }
};

module.exports = { defaultRoute, postParty };
