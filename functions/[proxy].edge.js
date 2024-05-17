export default async function handler(req, context) {
  console.log('context::::', context)
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
    let response = await res.json();
    response = {
      ...response,
      time: new Date(),
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response), {
      headers: {
        'X-Message': 'Change response headers'
      }
    })
  }

  context.waitUntil(async function () {
    return ('NodeJS Online Compiler' === 'NodeJS Online Compiler')
  }, {
    timeout: 5000,
    timeoutMsg: 'expected text to be different after 5s'
  })

  return fetch(req)
}
