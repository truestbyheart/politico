
[![Build Status](https://travis-ci.com/truestbyheart/politico.svg?branch=develop)](https://travis-ci.com/truestbyheart/politico)
[![Licence](https://img.shields.io/github/license/shemaeric/politico.svg?style=plastic)](https://img.shields.io/github/license/shemaeric/politico.svg?style=plastic)
[![Coverage Status](https://coveralls.io/repos/github/truestbyheart/politico_api/badge.svg?branch=develop)](https://coveralls.io/github/truestbyheart/politico_api?branch=develop)

# Getting started 
first of all the API is hosted on heroku at the link bellow
(https://politicoapiv1.herokuapp.com/)

for running the API offline your required to clone it to your machine and make sure you do the following

1. Make sure you have installed node
2. Install the packages using npm `node package manager` using the following command.
       `npm install`
3. When the process completes you can launch your terminal and find the folder you cloned the project too and run
    `npm run start`

## API endpoints
> NB: make post request to store data then  you can continue to use other routes

1. POST `/v1/parties`
sample response

        `{
            "status": 201,
            "Data": [
                {
                    "name": "chama cha mapindzz",
                    "hqAddress": "p.o box 12",
                    "logoUrl": "/img/cm.png",
                    "id": 1
                }
            ]
        }`

2. GET `/v1/parties` 
sample response

        `{
            "status": 201,
            "Data": [
                {
                    "name": "chama cha mapindzz",
                    "hqAddress": "p.o box 12",
                    "logoUrl": "/img/cm.png",
                    "id": 1
                },
                {
                    "name": "chama cha mpindzz",
                    "hqAddress": "p.o box 12",
                    "logoUrl": "/img/c.png",
                    "id": 2
                }
            ]
        }`

3. GET `/v1/parties/:id`
 sample url (https://politicoapiv1.herokuapp.com/v1/parties/1)

        `{
            "status": 200,
            "Data": {
                "name": "chama cha mapindzz",
                "hqAddress": "p.o box 12",
                "logoUrl": "/img/cm.png",
                "id": 1
            }
        }`

3. PATCH  `/v1/parties/:id`
sample url (https://politicoapiv1.herokuapp.com/v1/parties/1)

        `{
            "status": 200,
            "message": "The data has been succefully edited",
            "Data": [
                {
                    "name": "chama",
                    "hqAddress": "p.o box 12",
                    "logoUrl": "/img/c.png",
                    "id": 1
                },
                null
            ]
        }`
4. DELETE `/v1/parties/:id`
sample url (https://politicoapiv1.herokuapp.com/v1/parties/1)

        `
        {
            "status": 200,
            "message": "The party has been deleted successfully"
        }`

5. all error may look like

        `
        {
            "status": 404,
            "message": "There is no party with the specified ID"
        }`

6. Offices url look the same just opt the `parties` with `offices`