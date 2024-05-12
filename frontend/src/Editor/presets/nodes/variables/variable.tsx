import { ClassicPreset } from "rete";
import { VaraibaleSocket } from "../../sockets/variable";
import { Presets } from "rete-react-plugin";
import { BaseNode } from "..";

export class VaraibaleNode extends BaseNode {
    name = "variable";
    description = "variable";

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