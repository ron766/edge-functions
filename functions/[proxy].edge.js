export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    const modifiedRequest = new Request(new URL('/users', parsedUrl), req)
    const res = await fetch(modifiedRequest, {
      cache: 'no-store',
      // cf:{
      //   cacheTtl: 30,
      // }
    });
    let response = await res.json();
    response = {
      ...response,
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response))
  }
  return fetch(req)
}
