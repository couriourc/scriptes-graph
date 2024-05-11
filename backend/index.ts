import fastify from 'fastify'
import { sensible, support } from "./plugins";
import readdir from "./routes/readdir";
const server = fastify()

server.register(sensible)
server.register(support)

server.register(function (app, _, done) {
    app.route(readdir)
    done()
})
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server listening at ${address}`)
})