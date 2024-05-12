import { ClassicPreset } from "rete";
import { Editor } from "../..";
import { VaraibaleSocket } from "../sockets/variable";

export * from "./variables";

export type Nodes = BaseNode;

export class BaseNode extends ClassicPreset.Node {
    name: string;
    description: string;

    socket = new VaraibaleSocket();

    process() {
        console.log(this)
        const { editor, dataflow } = Editor.get();
        editor
            .getNodes()
            .filter((n) => true)
            .forEach((n) => {
                dataflow.reset();
            });
        console.log(dataflow)
    }
}
