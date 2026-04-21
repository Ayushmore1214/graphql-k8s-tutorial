import { createYoga, createSchema } from 'graphql-yoga'
import { createServer } from 'node:http'

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String
    }
  `,
  resolvers: {
    Query: {
      greetings: () => 'Hello from GraphQL on K8s!'
    }
  }
})

const yoga = createYoga({ schema })

const server = createServer((req, res) => {
  if (req.url === '/health/ready') {
    res.writeHead(200)
    return res.end('OK')
  }
  return yoga(req, res)
})

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})