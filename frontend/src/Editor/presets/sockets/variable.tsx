import { ClassicPreset } from "rete";

export class VaraibaleSocket extends ClassicPreset.Socket {
    constructor() {
        super("Action");
    }

    isCompatibleWith(socket: ClassicPreset.Socket) {
        console.log(socket)
        return true
    }
}