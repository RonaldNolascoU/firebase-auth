<template>
    <h1>Plaid Quick Start </h1>
    <button id="plaid-button" >Link Your account via Plaid</button>
</template>

<script>
import plaid from 'plaid';
const plaidClient = new plaid.Client({
    clientID: '60f32ab0219f3b0012a29fee',
    secret: 'f65b67aa0d3acddd65a4e0df9ff0b0',
    env: plaid.environments.sandbox,
});
export default {
  data() {
    return {

    }
  },

  methods: {
      link: async (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
        const { link_token: linkToken } = await plaidClient.createLinkToken({
            user: {
                client_user_id: 'unique-id',
            },
            client_name: 'App of Mohamed',
            products: ['auth', 'identity'],
            country_codes: ['US'],
            language: ['en']
        });


        console.log(res.json({ linkToken }));
    }
  },

  mounted () {
      /*
      const fire = async () => {
          const fetchLinkToken = async () => {
          const response = this.link();
          //const { linkToken } = await response.json();
          console.log(response);
        };

        const handler = plaid.create({
          token: await fetchLinkToken(),
          onSuccess: async (public_token, metadata) => {
            console.log(public_token);
            console.log(metadata);
            await fetch('/token-exchange', {
              method: 'POST',
              body: JSON.stringify({public_token}),
              headers: {
                'content-Type': 'application/json'
              },
            });
          },
        });
        
        console.log(handler);
      }

      fire();*/
     this.link();
      
  },
    
};
</script>