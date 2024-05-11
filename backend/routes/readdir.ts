var { exec } = require('child_process');

export default {
    method: "GET" as const,
    url: '/readdir',
    handler: (req, reply) => {

        exec('pnpm scripts-graph readdir', (_, std) => {
            reply.send(std)
        }, {
            cwd: "C"
        })



    },
    schema: {},
}
