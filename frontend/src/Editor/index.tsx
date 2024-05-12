import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaExtensions, AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin } from "rete-connection-plugin";
import { ReactPlugin } from "rete-react-plugin";
import {
    AutoArrangePlugin,
} from "rete-auto-arrange-plugin";
import { Singleton } from "@couriourc/design-patterns";
import { AreaExtra, Schemes } from "./presets/types";
import {
    setupContextMenu,
    setupCustomBackground,
    setupArea,
    setupConnection,
    setupArranges,
    setupCustomNodes,
    setupReroute,
    setupEngine,
} from "./setup";
import { StringNode } from "./presets/nodes";
import { ControlFlowEngine, DataflowEngine } from "rete-engine";


export const Editor = new Singleton<{
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>,
    connection: ConnectionPlugin<Schemes, AreaExtra>,
    render: ReactPlugin<Schemes, AreaExtra>,
    arrange: AutoArrangePlugin<Schemes, AreaExtra>,

    dataflow: DataflowEngine<Schemes>,
    controlflow: ControlFlowEngine<Schemes>,
}>();

export async function createEditor(container: HTMLElement) {
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();
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

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(arrange);

    editor.use(dataflow);
    editor.use(controlflow);

    Editor.set({
        editor,
        area,
        render,
        arrange,
        connection,
        dataflow,
        controlflow
    });

    editor.addNode(new StringNode("asd"));

    setupEngine();
    setupArea();
    setupArranges();
    setupConnection();
    setupCustomBackground();
    setupContextMenu();
    setupReroute();
    setupCustomNodes();

    return {
        destroy: () => area.destroy(),
    };
}
