import {
  increment,
  isMissingValue,
  officeEntityValidator,
  officePropertySpecs,
  ifOfficeExist,
} from '../helper/helper';

// eslint-disable-next-line import/no-mutable-exports
export let Offices = [];

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
    for (let i = 0; i < Offices.length; i++) {
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
