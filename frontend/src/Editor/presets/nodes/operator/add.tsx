import { ClassicPreset } from "rete";
import { OperatorNode } from ".";

export class AddNode extends OperatorNode {

    constructor(name: string) {
        super(name);

        this.addInput("a", new ClassicPreset.Input(this.socket, "a"));
        this.addInput("b", new ClassicPreset.Input(this.socket, "b"));


    }



}