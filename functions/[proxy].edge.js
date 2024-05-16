export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/without-cacheTtl') {
    // const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
    const newUrl = new URL('/users', parsedUrl);

    const modifiedRequest = new Request(newUrl, req)
    const res = await fetch(modifiedRequest);
    let response = await res.json();
    response = {
      ...response,
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response))
  }

  if (route === '/with-cacheTtl') {
    const modifiedRequest = new Request(new URL('/users', parsedUrl), req)
    const res = await fetch(modifiedRequest, {
      cf:{
        cacheTtl: -1,
      }
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
