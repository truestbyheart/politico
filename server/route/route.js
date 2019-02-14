import {
  ifExist, increment, partyEntityValidator, partyPropertySpecs, isMissingValue,
} from '../helper/helper';

export const Parties = [];


export const defaultRoute = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to politico API, please used the specified endpoints from the readme file',
  });
};

export const postParty = ({ body }, res) => {
  if (partyEntityValidator(body)) {
    if (ifExist(body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
    } else {
      const response = increment(body, Parties);
      if (response === undefined) {
        res.status(201).json({ status: 201, Data: Parties });
      } else {
        res.status(201).json({ status: 201, Data: response });
      }
    }
  } else {
    const missings = partyPropertySpecs(body);
    res.status(200).json({
      status: 200,
      message: missings,
    });
  }
};


export const getParties = (req, res) => {
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
export const getParty = (req, res) => {
  if (Parties.length === 0) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    res.json({
      status: 200,
      Data: Parties[req.params.id - 1],
    });
  }
};

export const editParty = (req, res) => {
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
    const response = isMissingValue(req.body);

    if (ifExist(req.body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
    } else if (!response) {
      res.json({
        status: 200,
        message: 'The data has been succefully edited',
        Data: editedParty,
      });
    } else {
      res.json({
        status: 200,
        Data: response,
      });
    }
  }
};
