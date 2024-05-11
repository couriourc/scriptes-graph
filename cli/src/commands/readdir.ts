import { Command } from "@oclif/core"
import path from "path"
import fs from "fs"

export class ReadDir extends Command {
    static description = 'Read Dir '

    async run(): Promise<void> {
        console.log(fs.readdirSync(process.cwd()))
    }
}