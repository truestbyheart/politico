/* eslint-disable prefer-destructuring */
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

const getParties = (req, res) => {
  if (Parties.length === 0) {
    res.json({
      status: 404,
      message: 'There is no data at the moment',
    });
  } else {
    res.json({
      status: 200,
      Data: Parties,
    });
  }
};

const getParty = (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (Parties.length === 0) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    res.json({
      status: 200,
      Data: Parties[id - 1],
    });
  }
};

const editParty = (req, res) => {
  const id = req.params.id;
  const oldData = Parties;
  const newData = [];
  const party = req.body;
  party.id = Number(id);
  newData.push(party);
  const editedParty = oldData.map(obj => newData.find(o => o.id === obj.id));
  if (editedParty[0] === undefined) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    res.json({
      status: 200,
      message: 'The data has been succefully edited',
      Data: editedParty,
    });
  }
};

const deleteParty = (req, res) => {
  const id = req.params.id;
  if (Parties[id - 1] === undefined) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    delete Parties[id - 1];
    res.json({
      status: 200,
      message: 'The party has been deleted successfully',
    });
  }
};

module.exports = {
  defaultRoute,
  postParty,
  getParties,
  Parties,
  getParty,
  editParty,
  deleteParty,
};
