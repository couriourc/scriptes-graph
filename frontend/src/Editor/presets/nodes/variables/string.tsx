import { ClassicPreset } from "rete";
import { VaraibaleNode } from "./variable";

export class StringNode extends VaraibaleNode {



    constructor(public value: string) {
        super("String");
        console.log(this.socket)
        this.addInput("exec", new ClassicPreset.Input(this.socket, "Exec", true));
        this.addOutput("exec", new ClassicPreset.Output(this.socket, "Exec", true));
        this.addOutput("value", new ClassicPreset.Output(this.socket, "Number"));
    }


    data(): { value: string } {
        return { value: this.value };
    }

}

