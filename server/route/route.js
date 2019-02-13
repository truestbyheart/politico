/* eslint-disable prefer-destructuring */
const {
  ifExist, increment, partyEntityValidator, officeEntityValidator,
} = require('./../helper/helper');

const Parties = [];
let Offices = [];


const defaultRoute = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to politico API, please used the specified endpoints from the readme file',
  });
};

const postParty = (req, res) => {
  if (partyEntityValidator(req.body)) {
    if (ifExist(req.body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists' });
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
const postOffice = (req, res) => {
  if (officeEntityValidator(req.body)) {
    if (ifExist(req.body, Offices)) {
      res
        .status(200)
        .json({
          status: 200,
          message: 'The office already exists',
        });
    } else {
      increment(req.body, Offices);
      res.status(201).json({ status: 201, Data: Offices });
    }
  } else {
    res.json({
      status: 200,
      message: 'Please make sure all properties are filled',
      note: 'The data should be case sensitive to the entity specs',
    });
  }
};

const getOffices = (req, res) => {
  if (Offices.length === 0) {
    res.json({
      status: 404,
      message: 'There is no data at the moment',
    });
  } else {
    res.json({
      status: 200,
      Data: Offices,
    });
  }
};

const getOffice = (req, res) => {
  const id = req.params.id;
  if (Offices[id - 1] === undefined) {
    res.json({
      status: 404,
      message: 'There is no office with the specified ID',
    });
  } else {
    res.json({
      status: 200,
      Data: Offices[id - 1],
    });
  }
};

const editOffice = (req, res) => {
  const id = req.params.id;
  const oldData = Offices;
  const newData = [];
  const office = req.body;
  office.id = Number(id);
  newData.push(office);
  const editedOffice = oldData.map(obj => newData.find(o => o.id === obj.id));
  if (editedOffice.length === 0) {
    res.json({
      status: 404,
      message: 'There is no office with the specified ID',
    });
  } else {
    Offices = editedOffice;
    res.json({
      status: 200,
      message: 'The data has been succefully edited',
      Data: editedOffice,
    });
  }
};

const deleteOffice = (req, res) => {
  const id = req.params.id;
  if (Offices[id - 1] === undefined) {
    res.json({
      status: 404,
      message: 'There is no office with the specified ID',
    });
  } else {
    delete Offices[id - 1];
    res.json({
      status: 200,
      message: 'The office has been deleted successfully',
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
  postOffice,
  getOffice,
  Offices,
  getOffices,
  editOffice,
  deleteOffice,
};
