<template>
    <p>Exchange Token</p>
</template>

<script>
import util from 'util';
import plaid from 'plaid';
const plaidClient = new plaid.Client({
    clientID: '60f32ab0219f3b0012a29fee',
    secret: 'f65b67aa0d3acddd65a4e0df9ff0b0',
    env: plaid.environments.sandbox,
});

export default {
  data() {
    return {

    };
  },

  mounted () {
      const getToken = async (req, res) => {
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
    }

    getToken()
      
  }

};
</script>