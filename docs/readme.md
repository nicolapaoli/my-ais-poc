
### 1. Get the Authentication `code`
```
https://link.tink.com/1.0/authorize/
?client_id=CLIENT_ID
&redirect_uri=http://localhost:3000/callback
&scope=accounts:read,transactions:read
&market=IT
&locale=en_US
&test=true
```

All scopes:
```
https://link.tink.com/1.0/authorize/
?client_id=CLIENT_ID
&redirect_uri=http://localhost:3000/callback
&scope=accounts:read,categories:read,contacts:read,credentials:read,documents:read,follow:read,identity:read,investments:read,properties:read,providers:read,statistics:read,suggestions:read,transactions:read,user:read
&market=IT
&locale=en_US
&test=true
```


> I only used scope accounts and transactions as that is enough to satisfy the request of the case study.

Login with test (user `tink`, pwd `tink-1234`)

Callback received at: 
```
http://localhost:3000/callback?code=f03579f2847f4eb7b71ecc892fa1b971
```

We can then get the code from the URI parameter: `f03579f2847f4eb7b71ecc892fa1b971`.

### 2 Get the Access Token

Using the code received above, we can get the access token:

Using `curl`:
```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'code=f03579f2847f4eb7b71ecc892fa1b971' \
-d 'client_id=CLIENT_ID' \
-d 'client_secret=CLIENT_SECRET' \
-d 'grant_type=authorization_code'
```

Response:
```
{
     "token_type" : "bearer",
     "expires_in" : 7200,
     "access_token" : "eyJhbGciOiJFUzI1NiIsImtpZCI6IjY2NTQxMDEyLTIwZTMtNDUxNS05YWMzLTBiNDUzODM4N2U0YiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODEwMzc0NjIsImlhdCI6MTU4MTAzMDI2MiwiaXNzIjoidGluazovL2F1dGgiLCJqdGkiOiI0YzdkZDBmOC1mOTZmLTQwNWMtYmYwMi1iYmU5YzBiYjY0ZTEiLCJvcmlnaW4iOiJtYWluIiwic2NvcGVzIjpbImFjY291bnRzOnJlYWQiLCJ0cmFuc2FjdGlvbnM6cmVhZCJdLCJzdWIiOiJ0aW5rOi8vYXV0aC91c2VyL2E3MDYxNTA0NGM0MTQ1ODhhNzk4NDE0MTUxYjE5OTUwIiwidGluazovL2FwcC9pZCI6IjdhN2Q4YTJmMjFhMTQ5M2E4MDZjY2VjNzQyZmRjMDQ0In0.90TprVCObOw4v9MMKnp1ibdpBZa1G8tJkNEBx4wee-lwWHXQieVt3KAN3E5LUJoXk7RkpDvJVGivLLB1gJJkRw",
     "refresh_token" : "b0237f5bbea145819abe34bc3f5b16b8",
     "scope" : "accounts:read,transactions:read",
     "id_hint" : ""
}
```

### 3 Use the access token to retrieve account list

```
curl -v https://api.tink.com/api/v1/accounts/list \
-H 'Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjY2NTQxMDEyLTIwZTMtNDUxNS05YWMzLTBiNDUzODM4N2U0YiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODEwMzc0NjIsImlhdCI6MTU4MTAzMDI2MiwiaXNzIjoidGluazovL2F1dGgiLCJqdGkiOiI0YzdkZDBmOC1mOTZmLTQwNWMtYmYwMi1iYmU5YzBiYjY0ZTEiLCJvcmlnaW4iOiJtYWluIiwic2NvcGVzIjpbImFjY291bnRzOnJlYWQiLCJ0cmFuc2FjdGlvbnM6cmVhZCJdLCJzdWIiOiJ0aW5rOi8vYXV0aC91c2VyL2E3MDYxNTA0NGM0MTQ1ODhhNzk4NDE0MTUxYjE5OTUwIiwidGluazovL2FwcC9pZCI6IjdhN2Q4YTJmMjFhMTQ5M2E4MDZjY2VjNzQyZmRjMDQ0In0.90TprVCObOw4v9MMKnp1ibdpBZa1G8tJkNEBx4wee-lwWHXQieVt3KAN3E5LUJoXk7RkpDvJVGivLLB1gJJkRw'
```

Response:

```
{
  "accounts" : [ {
    "accountNumber" : "IT60X0542811101705604939200",
    "availableCredit" : 0.0,
    "balance" : 705.6,
    "bankId" : "IT60X0542811101705604939200",
    "certainDate" : 1578740400000,
    "credentialsId" : "ed32bcb3615d445eae62712c368e15b3",
    "excluded" : false,
    "favored" : true,
    "id" : "a2e3d9220f8641bfaf7ca1d96430c1b5",
    "name" : "Checking Account tink",
    "ownership" : 1.0,
    "payload" : null,
    "type" : "CHECKING",
    "userId" : "a70615044c414588a798414151b19950",
    "userModifiedExcluded" : false,
    "userModifiedName" : false,
    "userModifiedType" : false,
    "identifiers" : "[]",
    "transferDestinations" : null,
    "details" : null,
    "images" : {
      "icon" : "https://cdn.tink.se/provider-images/placeholder.png",
      "banner" : null
    },
    "holderName" : null,
    "closed" : false,
    "flags" : "[]",
    "accountExclusion" : "NONE",
    "currencyCode" : "EUR",
    "currencyDenominatedBalance" : {
      "unscaledValue" : 7056,
      "scale" : 1,
      "currencyCode" : "EUR"
    },
    "refreshed" : 1581030235000,
    "financialInstitutionId" : "7c1b185fd52f576b9259e972f6dd9285"
  } ]
}
```

### 4 Fetch the most recent 20 transactions

```
POST https://api.tink.com/api/v1/search

{
  "limit": 20,
  "order": "DESC",
  "sort": "DATE"
}
```

Response:
```
{
  "count": 2156,
  "metrics": {
    "SUM": 1.109374684E7,
    "COUNT": 2156,
    "CATEGORIES": {
      "ed909bd383f245aabab53d3e3ee8e4bf": 0.6909004784897363,
      "b3963cfe6bf54c06b22eaa44e0a6cf3f": 0.14711224472109913,
      "075fab3ec31f43aa9d39675475c1fb1a": 0.08269926321844899,
      "9faddd4c806b48a29301891f6a310c78": 0.04401132521246537,
      "63a7e66150d44c67a3380265c86e1c26": 0.014380173110205929,
      "e6ada2dc635c48e586a3de69591995d7": 0.011042256666459138,
      "c59a38ff206c4fe29a9e7b2bb1fcb3de": 0.009709163328987594,
      "c22e51b7abfa48088fb500005e21df76": 1.450952525972731E-4
    },
    "AVG": 5145.522653061224,
    "NET": -1.084874684E7
  },
  "periodAmounts": [],
  "query": {
    "accounts": [],
    "categories": [],
    "externalIds": [],
    "endDate": null,
    "limit": 20,
    "offset": 0,
    "order": "DESC",
    "queryString": null,
    "sort": "DATE",
    "startDate": null,
    "transactionId": null,
    "includeUpcoming": false,
    "lastTransactionId": null
  },
  "results": [
    {
      "score": 0.0,
      "timestamp": 1580986800000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -410.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580986800000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "f29ab1c333464889949f347f4962c158",
        "inserted": 1581062953000,
        "lastModified": 1581062959743,
        "merchantId": "",
        "notes": null,
        "originalAmount": -410.0,
        "originalDate": 1580986800000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -4100,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -4100,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580986800000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -2320.0,
        "categoryId": "9faddd4c806b48a29301891f6a310c78",
        "categoryType": "EXPENSES",
        "date": 1580986800000,
        "description": "H&m",
        "formattedDescription": "H&m",
        "id": "a4ec1b09361e4121aa0f09b0bc430ae0",
        "inserted": 1581062953000,
        "lastModified": 1581062959746,
        "merchantId": "",
        "notes": null,
        "originalAmount": -2320.0,
        "originalDate": 1580986800000,
        "originalDescription": "H&M",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -23200,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -23200,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580986800000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -2828.5,
        "categoryId": "9faddd4c806b48a29301891f6a310c78",
        "categoryType": "EXPENSES",
        "date": 1580986800000,
        "description": "H&m",
        "formattedDescription": "H&m",
        "id": "4e383d2c0d794034bc94a66dc666af5b",
        "inserted": 1581062953000,
        "lastModified": 1581062959741,
        "merchantId": "",
        "notes": null,
        "originalAmount": -2828.5,
        "originalDate": 1580986800000,
        "originalDescription": "H&M",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -28285,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -28285,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580900400000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -571.0,
        "categoryId": "c59a38ff206c4fe29a9e7b2bb1fcb3de",
        "categoryType": "EXPENSES",
        "date": 1580900400000,
        "description": "McDonalds",
        "formattedDescription": "McDonalds",
        "id": "7231eccc65a548f5aab228a6880d7acb",
        "inserted": 1581062953000,
        "lastModified": 1581062959734,
        "merchantId": "",
        "notes": null,
        "originalAmount": -571.0,
        "originalDate": 1580900400000,
        "originalDescription": "McDonalds",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580900400000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -718.0,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580900400000,
        "description": "T.G.I. Friday's",
        "formattedDescription": "T.G.I. Friday's",
        "id": "64e6705c44e2444c93b68782d1c4bcc7",
        "inserted": 1581062953000,
        "lastModified": 1581062959733,
        "merchantId": "",
        "notes": null,
        "originalAmount": -718.0,
        "originalDate": 1580900400000,
        "originalDescription": "T.G.I. Friday's",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -7180,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -7180,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580900400000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -699.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580900400000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "34962ba138bc4548aaeb57d1745ea65f",
        "inserted": 1581062953000,
        "lastModified": 1581062959743,
        "merchantId": "",
        "notes": null,
        "originalAmount": -699.0,
        "originalDate": 1580900400000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -6990,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -6990,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580814000000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -168.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580814000000,
        "description": "Subway",
        "formattedDescription": "Subway",
        "id": "9e9925ae517a4836a0f292161115489d",
        "inserted": 1581062953000,
        "lastModified": 1581062959733,
        "merchantId": "",
        "notes": null,
        "originalAmount": -168.0,
        "originalDate": 1580814000000,
        "originalDescription": "Subway",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953959,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -1680,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -1680,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580727600000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -976.0,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580727600000,
        "description": "T.G.I. Friday's",
        "formattedDescription": "T.G.I. Friday's",
        "id": "9988ee63dd1d4fa485d0c1934a811097",
        "inserted": 1581062953000,
        "lastModified": 1581062959735,
        "merchantId": "",
        "notes": null,
        "originalAmount": -976.0,
        "originalDate": 1580727600000,
        "originalDescription": "T.G.I. Friday's",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -9760,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -9760,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580727600000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -571.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580727600000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "09543383c4be49869a4e1e0825aebabf",
        "inserted": 1581062953000,
        "lastModified": 1581062959744,
        "merchantId": "",
        "notes": null,
        "originalAmount": -571.0,
        "originalDate": 1580727600000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580641200000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -699.0,
        "categoryId": "c59a38ff206c4fe29a9e7b2bb1fcb3de",
        "categoryType": "EXPENSES",
        "date": 1580641200000,
        "description": "McDonalds",
        "formattedDescription": "McDonalds",
        "id": "12f1dbe4759d49c79d89f6232e2332ff",
        "inserted": 1581062953000,
        "lastModified": 1581062959735,
        "merchantId": "",
        "notes": null,
        "originalAmount": -699.0,
        "originalDate": 1580641200000,
        "originalDescription": "McDonalds",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -6990,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -6990,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580554800000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -496.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580554800000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "7b994abed4fb4c47954ed34ec391c35b",
        "inserted": 1581062953000,
        "lastModified": 1581062959737,
        "merchantId": "",
        "notes": null,
        "originalAmount": -496.0,
        "originalDate": 1580554800000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -4960,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -4960,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580468400000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -5181.5,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580468400000,
        "description": "Ikea",
        "formattedDescription": "Ikea",
        "id": "9ab2c2d5b7d8421ab279227c432a244e",
        "inserted": 1581062953000,
        "lastModified": 1581062959740,
        "merchantId": "",
        "notes": null,
        "originalAmount": -5181.5,
        "originalDate": 1580468400000,
        "originalDescription": "IKEA",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -51815,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -51815,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580382000000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -2791.97,
        "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
        "categoryType": "EXPENSES",
        "date": 1580382000000,
        "description": "Amazon",
        "formattedDescription": "Amazon",
        "id": "163b90988ab142fb8cea102a3096b6a8",
        "inserted": 1581062953000,
        "lastModified": 1581062959745,
        "merchantId": "",
        "notes": null,
        "originalAmount": -2791.97,
        "originalDate": 1580382000000,
        "originalDescription": "Amazon",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -279197,
          "scale": 2,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -279197,
          "scale": 2,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580295600000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -1722.0,
        "categoryId": "9faddd4c806b48a29301891f6a310c78",
        "categoryType": "EXPENSES",
        "date": 1580295600000,
        "description": "H&m",
        "formattedDescription": "H&m",
        "id": "9581aca4829740499e52c1f1c6761fd3",
        "inserted": 1581062953000,
        "lastModified": 1581062959745,
        "merchantId": "",
        "notes": null,
        "originalAmount": -1722.0,
        "originalDate": 1580295600000,
        "originalDescription": "H&M",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -17220,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -17220,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580295600000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -1563.5,
        "categoryId": "9faddd4c806b48a29301891f6a310c78",
        "categoryType": "EXPENSES",
        "date": 1580295600000,
        "description": "H&m",
        "formattedDescription": "H&m",
        "id": "489587c877244152af931cccce45f76a",
        "inserted": 1581062953000,
        "lastModified": 1581062959740,
        "merchantId": "",
        "notes": null,
        "originalAmount": -1563.5,
        "originalDate": 1580295600000,
        "originalDescription": "H&M",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -15635,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -15635,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580209200000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -1016.0,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580209200000,
        "description": "T.G.I. Friday's",
        "formattedDescription": "T.G.I. Friday's",
        "id": "b3f03747bd7145bba1b4eef65a89b99e",
        "inserted": 1581062953000,
        "lastModified": 1581062959736,
        "merchantId": "",
        "notes": null,
        "originalAmount": -1016.0,
        "originalDate": 1580209200000,
        "originalDescription": "T.G.I. Friday's",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -10160,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -10160,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580209200000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -717.0,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580209200000,
        "description": "Toys'R Us",
        "formattedDescription": "Toys'R Us",
        "id": "5fdf351798d64f6ca0697333d66e3e45",
        "inserted": 1581062953000,
        "lastModified": 1581062959744,
        "merchantId": "",
        "notes": null,
        "originalAmount": -717.0,
        "originalDate": 1580209200000,
        "originalDescription": "Toys'R Us",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -7170,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -7170,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580209200000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -1087.0,
        "categoryId": "b3963cfe6bf54c06b22eaa44e0a6cf3f",
        "categoryType": "EXPENSES",
        "date": 1580209200000,
        "description": "T.G.I. Friday's",
        "formattedDescription": "T.G.I. Friday's",
        "id": "4c359c0d929e43fcb33127c341b4d5ed",
        "inserted": 1581062953000,
        "lastModified": 1581062959739,
        "merchantId": "",
        "notes": null,
        "originalAmount": -1087.0,
        "originalDate": 1580209200000,
        "originalDescription": "T.G.I. Friday's",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -10870,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -10870,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580122800000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -571.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580122800000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "9f0fc27de5f34536bb2713f59a880397",
        "inserted": 1581062953000,
        "lastModified": 1581062959736,
        "merchantId": "",
        "notes": null,
        "originalAmount": -571.0,
        "originalDate": 1580122800000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -5710,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    },
    {
      "score": 0.0,
      "timestamp": 1580036400000,
      "transaction": {
        "accountId": "4c110ca37bcd4a9da841444c89a479ec",
        "amount": -466.0,
        "categoryId": "63a7e66150d44c67a3380265c86e1c26",
        "categoryType": "EXPENSES",
        "date": 1580036400000,
        "description": "Starbucks",
        "formattedDescription": "Starbucks",
        "id": "bc68cfedb7124a9d8fa685664cce1578",
        "inserted": 1581062953000,
        "lastModified": 1581062959738,
        "merchantId": "",
        "notes": null,
        "originalAmount": -466.0,
        "originalDate": 1580036400000,
        "originalDescription": "Starbucks",
        "payload": {},
        "pending": false,
        "timestamp": 1581062953957,
        "type": "DEFAULT",
        "userId": "4442fb6ee6f5434da7732937efa56f68",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -4660,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -4660,
          "scale": 1,
          "currencyCode": "EUR"
        },
        "parts": [],
        "internalPayload": {},
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    }
  ],
  "net": -1.084874684E7
}
```
