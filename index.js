const fastify = require('fastify')({
  logger: true
})

fastify.register(require('point-of-view'), {
  engine: {
    nunjucks: require('nunjucks')
  }
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// With async handler be sure to return the result of reply.view
fastify.get('/test', async (req, reply) => {
//  const t = await something()
    return reply.view('/templates/test.njk', { title: 'hello world', text: 'text', items: {"sally": "dog", "mike": "cat", "peanut": "ferret" }})
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
