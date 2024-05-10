import { ClassicPreset } from "rete";
import { VaraibaleNode } from "./variable";

export class StringNode extends VaraibaleNode {



    constructor(public value: string) {
        super("String");

        this.addOutput("value", new ClassicPreset.Output(this.socket, "Number"));
    }


    data(): { value: string } {
        return { value: this.value };
    }

}

