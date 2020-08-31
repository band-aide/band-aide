const fastify = require('fastify')({
  logger: true
})

fastify.register(require('point-of-view'), {
  engine: {
    nunjucks: require('nunjucks')
  }
})

var artist1 = {
    'id': '101010101',
    'name': 'The Big Tones',
    'genre': 'Soul',
    'active': false,
    'hometown': 'Penn Station, NY',
}
var artist2 = {
    'id': '1838481194',
    'name': 'Flipper',
    'genre': 'Rock',
    'active': true,
    'hometown': 'Eugene, OR',
}


// var db = connect(db://something)
var artists = [];
artists.push(artist1)
artists.push(artist2)

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// With async handler be sure to return the result of reply.view
fastify.get('/test', async (req, reply) => {
//  const t = await something()
    return reply.view('/templates/test.njk', { title: 'hello world', text: 'text', items: {"sally": "dog", "mike": "cat", "peanut": "ferret" }})
})

// With async handler be sure to return the result of reply.view
fastify.get('/artists', async (req, reply) => {
//  const t = await something()
    return reply.view('/templates/artists.njk', { title: 'Featured Artists', artists })
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
