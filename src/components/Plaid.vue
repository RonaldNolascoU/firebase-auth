<template>
    <p>Hello Plaid</p>
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

    };
  },

  mounted () {
      const plaidfn = async (req, res) => {
        const { link_token: linkToken } = await plaidClient.createLinkToken({
            user: {
                client_user_id: 'unique-id',
            },
            client_name: 'App of Mohamed',
            products: ['auth', 'identity'],
            country_codes: ['US'],
            language: ['en']
        });

        res.json({ linkToken });
    }

    plaidfn()
      
  }

};
</script>