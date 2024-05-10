
import { DataflowEngine, ControlFlowEngine } from "rete-engine";
import { Editor } from "..";

export function setupEngine() {
    const { editor } = Editor.get();
    const dataflow = new DataflowEngine<Schemes>(({ inputs, outputs }) => {
        return {
            inputs: () => Object.keys(inputs).filter((name) => name !== "exec"),
            outputs: () => Object.keys(outputs).filter((name) => name !== "exec")
        };
    });

    const controlflow = new ControlFlowEngine<Schemes>(() => {
        return {
            inputs: () => ["exec"],
            outputs: () => ["exec"]
        };
    });

    editor.use(dataflow);
    editor.use(controlflow);
} 