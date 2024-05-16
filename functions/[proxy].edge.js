export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    // const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
    // const res = await fetch(`https://demo-site-edge.devcontentstackapps.com/users`);
    const newUrl = new URL('/users', parsedUrl);

    const modifiedRequest = new Request(newUrl, req)

    const res = await fetch(modifiedRequest, {
      cf:{
        cacheTtl: -1,
      }
    });
    let response = await res.json();
    response = {
      ...response,
      time: new Date(),
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response), {
      headers: {
        'X-Message': 'Change response headers',
        "Cache-Control": "no-cache=no-cache"
      }
    })
  }

  return fetch(req)
}
