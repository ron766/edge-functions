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
      changes: 'add context.waitUntil promise'
    }
    return new Response(JSON.stringify(response), {
      headers: {
        'X-Message': 'Change response headers'
      }
    })
  }

    context.waitUntil(new Promise((resolve, reject) => {
    console.log('Task started...');
    // Simulate a delay of 2 seconds using setTimeout
    setTimeout(() => {
      const success = true; // You can toggle this to false to see the rejection case
      if (success) {
        resolve('Task completed successfully');
      } else {
        reject('Task failed');
      }
    }, 2000);
  }));

  return fetch(req)
}
