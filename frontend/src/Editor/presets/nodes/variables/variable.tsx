import { ClassicPreset } from "rete";
import { VaraibaleSocket } from "../../sockets/variable";

export class VaraibaleNode extends ClassicPreset.Node {
    socket: VaraibaleSocket = new VaraibaleSocket();
}