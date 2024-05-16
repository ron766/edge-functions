export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    const modifiedRequest = new Request(new URL('/users', parsedUrl), req)
    // const res = await fetch(modifiedRequest, {
    //   cf:{
    //     cacheTtl: 0,
    //   }
    // });
    const res = await fetch(modifiedRequest);
    let response = await res.json();
    response = {
      ...response,
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response))
  }
  return fetch(req)
}
