import { ClassicPreset } from "rete";
import { VaraibaleSocket } from "../../sockets/variable";
import { Presets } from "rete-react-plugin";

export class VaraibaleNode extends ClassicPreset.Node {
    socket: VaraibaleSocket = new VaraibaleSocket();
    value: any;

    Component(props) {
        return <Presets.classic.Node {...props}>{props.data.label}</Presets.classic.Node>
    }

    data(): { value: any } {
        return { value: this.value };
    }


    async execute(input: "exec", forward: (output: "exec") => void) {
        forward("exec");
    }
}