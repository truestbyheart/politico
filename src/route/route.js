import {
  ifExist,
  increment,
  partyEntityValidator,
  partyPropertySpecs,
  isMissingValue,
  officeEntityValidator,
  officePropertySpecs,
  ifOfficeExist,
} from '../helper/helper';

// eslint-disable-next-line import/no-mutable-exports
export let Parties = [];
// eslint-disable-next-line import/no-mutable-exports
export let Offices = [];

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

export const postOffice = ({ body }, res) => {
  if (officeEntityValidator(body)) {
    if (ifOfficeExist(body, Offices)) {
      res
        .status(200)
        .json({
          status: 200,
          message: 'The office already exists',
        });
    } else {
      const response = increment(body, Offices);
      if (response === undefined) {
        res.status(201).json({ status: 201, data: Offices });
      } else {
        res.status(200).json({ status: 200, data: response });
      }
    }
  } else {
    const missings = officePropertySpecs(body);
    res.status(200).json({
      status: 200,
      message: missings,
    });
  }
};

export const getOffices = (req, res) => {
  if (Offices.length === 0) {
    res.json({
      status: 404,
      message: 'There is no data at the moment',
    });
  } else {
    res.json({
      status: 200,
      data: Offices,
    });
  }
};

export const getOffice = (req, res) => {
  const { id } = req.params;
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

export const editOffice = (req, res) => {
  const { id } = req.params;
  const rqOffice = Offices.find(o => o.id === Number(id));
  if (rqOffice === undefined) {
    res.json({
      status: 404,
      message: 'There is no office with the specified ID',
    });
  } else {
    const response = isMissingValue(req.body);
    if (ifOfficeExist(req.body, Offices)) {
      res.status(200).json({ status: 200, message: 'The office already exists' });
    } else if (!response) {
      if (req.body.name) { rqOffice.name = req.body.name; }
      if (req.body.type) { rqOffice.type = req.body.type; }

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
export const deleteOffice = (req, res) => {
  const { id } = req.params;
  if (Offices[id - 1] === undefined) {
    res.json({
      status: 404,
      message: 'There is no office with the specified ID',
    });
  } else {
    const newData = [];
    delete Offices[req.params.id - 1];
    for (let i = 0; i < Parties.length; i++) {
      if (Offices[i] !== undefined) {
        newData.push(Offices[i]);
      }
    }

    Offices.length = 0;
    Offices = newData;
    res.json({
      status: 200,
      message: 'The office has been deleted successfully',
    });
  }
};
