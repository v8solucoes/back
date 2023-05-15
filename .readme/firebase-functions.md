# Install Functions/Servless Firebase

`cd back` (open local past)

Delete Past: `rm -rf node_modules lib`

`npm outdated`

`npm instal firebase` (requeried install firebase Global)

`npm install --save firebase-functions@latest` (acess past back and execute)

Include in file back/pacakege.json  

```json
"engines": {
    "node": "18"
  }
```

Example Index.ts:

```ts
const {onRequest} = require("firebase-functions/v2/https");
import * as express from 'express'

var api = express()

api.get('/', (req, res) => res.status(200).send('Hey there!'))

exports.api = onRequest(api)
```

## Execute

`npm run serve` (Teste Local)
`npm run deploy` (Produção Firebase)

## Update DOMAIN past

`cd domain` (open local past)

Delete Past: `rm -rf node_modules`

`npm install --save firebase-admin@latest` (acesse a pasta back e execute)

`npm install`
