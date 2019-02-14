import {
  ifExist, increment, partyEntityValidator, partyPropertySpecs,
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
