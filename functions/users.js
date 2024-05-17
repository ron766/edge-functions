export default function handler(request, response) {
  console.log("🚀 ~ handler ~ request:", request.body)
  const users = [
    { name: 'sanika' },
    { name: 'siddhi' },
    { name: 'shravani' }
  ];

  console.log("query params", request.query)
  console.log("headers", request.headers)

  // response.setHeader('Cache-Control', 'max-age=120');

  response.status(200).send({
    body: request.body,
    users,
    query: request.query,
    time: new Date(),
  });
}