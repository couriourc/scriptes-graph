import { ClassicPreset } from "rete";

export class VaraibaleSocket extends ClassicPreset.Socket {
    constructor() {
        super("Action");
    }

    isCompatibleWith(socket: ClassicPreset.Socket) {
        return true
    }
}