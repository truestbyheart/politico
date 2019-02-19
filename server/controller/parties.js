import {
  ifExist,
  increment,
  partyEntityValidator,
  partyPropertySpecs,
  isMissingValue,
} from '../helper/helper';

// eslint-disable-next-line import/no-mutable-exports
export let Parties = [];

export const postParty = ({ body }, res) => {
  if (partyEntityValidator(body)) {
    if (ifExist(body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
    } else {
      const response = increment(body, Parties);
      if (response === undefined) {
        res.status(201).json({ status: 201, data: Parties });
      } else {
        res.status(200).json({ status: 200, data: response });
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
      data: Parties,
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
      data: Parties[req.params.id - 1],
    });
  }
};

export const editParty = (req, res) => {
  const { id } = req.params;
  const rqParty = Parties.find(o => o.id === Number(id));
  if (rqParty === undefined) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    const response = isMissingValue(req.body);
    if (ifExist(req.body, Parties)) {
      res.status(200).json({ status: 200, message: 'The party already exists or your logo Url exists :-)' });
    } else if (!response) {
      if (req.body.name) { rqParty.name = req.body.name; }
      if (req.body.hqAddress) { rqParty.hqAddress = req.body.hqAddress; }
      if (req.body.logoUrl) { rqParty.logoUrl = req.body.logoUrl; }
      res.json({
        status: 200,
        message: 'The data has been succefully edited',
        data: req.body,
      });
    } else {
      res.json({
        status: 200,
        data: response,
      });
    }
  }
};


export const deleteParty = (req, res) => {
  const newData = [];
  if (Parties[req.params.id - 1] === undefined) {
    res.json({
      status: 404,
      message: 'There is no party with the specified ID',
    });
  } else {
    delete Parties[req.params.id - 1];
    for (let i = 0; i < Parties.length; i++) {
      if (Parties[i] !== undefined) {
        newData.push(Parties[i]);
      }
    }

    Parties.length = 0;
    Parties = newData;
    res.json({
      status: 200,
      message: 'The party has been deleted successfully',
    });
  }
};
