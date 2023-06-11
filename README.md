# Metal price notifier app

## Introduction

This is simple application build using node.js (backend) and lit.js (frontend) which allows you to create notifications templates. Each time you send POST data to `/api/new-price` e.g.

```rest
POST /api/new_price HTTP/1.1
content-type: application/json

{
    "itemType": "platinium",
    "price": "150.25"
}
```

backend application should show which notifications should be send based on conditions.

## Setup

First of all you need to have installed [Docker and docker-compose](https://docs.docker.com/) as well as [NodeJS](https://nodejs.org/en/). To run this app locally follow these steps:

1. Look into [.env.example](https://github.com/M4rcinJ/metal-price-notifier/blob/main/.env.example) and based on that create your own .env file
2. run in treminal `docker-compose up -d` (project root directory)
3. run `npm install`
4. run`npx turbo dev` (project root directory)

That is all you need to run this project locally.

## API endpoints specification

| URL                                 |             Description              |
| ----------------------------------- | :----------------------------------: |
| [GET] /api/notifications            |    get all existing notifications    |
| [GET] /api/send-rules               |    get filters / send rules list     |
| [POST] /api/notifications/create    |       create new notification        |
| [PUT] /api/notifications/:id/update |         update notification          |
| [DELETE] /api/notifications/:id/delete |      delete notification          |
| [POST] /api/price/new               | send notification about price change |

### Sample payload

```rest
POST /api/notifications/create HTTP/1.1
content-type: application/json

{
   "title":"Some title",
   "content":"Some content",
   "stakeholdersEmails":[
      "test@test.pl"
   ],
   "sendRules":[
      {
         "key":"item_is",
         "value":"silver"
      },
      {
         "key":"is_less",
         "value":"10.20"
      }
   ]
}
```
