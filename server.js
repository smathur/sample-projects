require('isomorphic-fetch'); 
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config(); //Load environment variables from .env file to process.env object
const port = parseInt(process.env.PORT, 10) || 3000; //Read the PORT environment variable, radix set to decimal numeral system
const dev = process.env.NODE_ENV !== 'production'; //Read the NODE_ENV environment variable to check if environment is set to Production
const app = next({ dev }); //Instantiate next app in DEV or Production mode based on value of dev.
const handle = app.getRequestHandler(); //Get the request handler for NEXT App

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env; //Read Shopify API Keys environment variables
console.log(app)
app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        ctx.redirect('/');
      },
    }),
  );

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;

  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});