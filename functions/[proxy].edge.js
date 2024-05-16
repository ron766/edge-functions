export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    // const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
    // const res = await fetch(`https://demo-site-edge.devcontentstackapps.com/users`);
    const newUrl = new URL('/users', parsedUrl);

    const modifiedRequest = new Request(newUrl, req)

    // const res = await fetch(modifiedRequest, {
    //   cf:{
    //     cacheTtl: -1,
    //   }
    // });
    // const res = await fetch(modifiedRequest);
    // let response = await res.json();
    // response = {
    //   ...response,
    //   time: new Date(),
    //   envVariableValue: envVariable,
    // }
    // return new Response(JSON.stringify(response), {
    //   headers: {
    //     'X-Message': 'Change response headers',
    //     // "Cache-Control": "no-cache=no-cache",
    //     // "Cache-Control": "max-age=0, must-revalidate"
    //   }
    // })
    return fetch(modifiedRequest, {
      cf:{
        cacheTtl: -1,
      }
    });
  }

  return fetch(req)
}
