//require('dotenv').config();
require('dotenv/config');
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const history = require('connect-history-api-fallback');

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(history());*/

const util = require('util');

const plaid = require('plaid');
const plaidClient = new plaid.Client({
    clientID: '60f32ab0219f3b0012a29fee',
    secret: 'f65b67aa0d3acddd65a4e0df9ff0b0',
    env: plaid.environments.sandbox,
    options: {
      version: "2020-09-14",
    },
});

app.post('/link/token/create', async (req,res) => {
    const response = await plaidClient.createLinkToken({
      user: {
        client_user_id: '123-test-user-id',
      },
      client_name: 'Plaid Test App',
      products: ['auth', 'transactions'],
      country_codes: ['GB'],
      language: 'en',
      webhook: 'https://sample-web-hook.com',
      
    })
    .catch((err) => {
      console.log(err);
    });
  const linkToken = response.link_token;
  console.log(linkToken);
  res.json({linkToken});
     
});

app.post('/item/public_token/exchange', async (req,res) => {
    const { publicToken } = req.body;
    const { access_token: accessToken } = await plaidClient.exchangePublicToken(publicToken);

    const authResponse = await plaidClient.getAuth(accessToken);
    console.log('-----------');
    console.log('Auth response');
    console.log();
    console.log(util.inspect(authResponse, false, null, true));
    
    const identityResponse = await plaidClient.getIdentity(accessToken);
    console.log('-----------');
    console.log('Identity response');
    console.log();
    console.log(util.inspect(identityResponse, false, null, true));

    const balanceResponse = await plaidClient.getBalance(accessToken);
    console.log('-----------');
    console.log('Balance response');
    console.log();
    console.log(util.inspect(balanceResponse, false, null, true));

    res.sendStatus(200);
});

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

//require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


