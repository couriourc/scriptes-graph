import fastify from 'fastify'
import { sensible, support } from "./plugins";

const server = fastify()

server.register(sensible)
server.register(support)

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server listening at ${address}`)
})