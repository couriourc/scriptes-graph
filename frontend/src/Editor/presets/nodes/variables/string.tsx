import { ClassicPreset } from "rete";
import { VaraibaleNode } from "./variable";

export class StringNode extends VaraibaleNode {
    name = "String";
    description = "字符串";

    height = 120;
    width = 180;

    constructor(public value: string) {
        super("String");
        this.addOutput("value", new ClassicPreset.Output(this.socket, ""));

        this.addControl(
            "value",
            new ClassicPreset.InputControl("text", { initial: value, change: this.process })
        );
    }


    data(): { value: string } {
        return { value: this.controls.value.value || "" };
    }

}

